import { NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { getProduct, saveProduct } from '@/lib/products';
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const customer = body.customer;
        if (!customer || !['name', 'phone', 'email', 'city', 'address'].every(k => typeof customer[k] === 'string' && customer[k].trim().length > 0 && customer[k].length <= (k === 'address' ? 300 : 100)) || !/^\S+@\S+\.\S+$/.test(customer.email) || !/^\+?[\d\s()-]{7,25}$/.test(customer.phone) || (customer.notes && (typeof customer.notes !== 'string' || customer.notes.length > 500)))
            return NextResponse.json({ error: 'Invalid customer details' }, { status: 400 });
        if (!Array.isArray(body.items) || !body.items.length || body.items.length > 50)
            return NextResponse.json({ error: 'Invalid cart' }, { status: 400 });
        const db = database();
        db.exec('BEGIN IMMEDIATE');
        try {
            const seen = new Set<string>();
            const items = body.items.map((item: {
                id: string;
                quantity: number;
            }) => {
                const product = getProduct(item.id);
                if (!product || seen.has(item.id) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20 || product.stock < item.quantity)
                    throw new Error('A product is unavailable or quantity exceeds stock');
                seen.add(item.id);
                saveProduct({ ...product, stock: product.stock - item.quantity });
                return { id: product.id, name: product.name, price: product.price, quantity: item.quantity };
            });
            const reference = 'FP-' + crypto.randomUUID();
            const total = items.reduce((sum: number, item: {
                price: number;
                quantity: number;
            }) => sum + item.price * item.quantity, 0);
            const order = { reference, total, currency: 'EGP', status: 'pending', createdAt: new Date().toISOString(), customer: { name: customer.name, phone: customer.phone, email: customer.email, city: customer.city, address: customer.address, notes: customer.notes || '' }, items };
            db.prepare('INSERT INTO orders (reference,data) VALUES (?,?)').run(reference, JSON.stringify(order));
            db.exec('COMMIT');
            return NextResponse.json({ reference, total, currency: 'EGP' }, { status: 201 });
        }
        catch (error) {
            db.exec('ROLLBACK');
            return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to save order' }, { status: 400 });
        }
    }
    catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
