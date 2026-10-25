import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin';
import { getProducts, saveProduct } from '@/lib/products';
import { categories, moods } from '@/lib/catalog';
export const dynamic = 'force-dynamic';
export function GET(request: Request) { if (!isAdmin(request))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(getProducts()); }
export async function POST(request: Request) {
    if (!isAdmin(request))
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    try {
        const p = await request.json();
        const localized = (v: unknown) => typeof v === 'object' && v !== null && ['en', 'ar'].every(k => typeof (v as Record<string, unknown>)[k] === 'string' && String((v as Record<string, unknown>)[k]).trim().length > 0 && String((v as Record<string, unknown>)[k]).length <= 2000);
        if (!/^[a-z0-9-]{1,80}$/.test(p.id) || !localized(p.name) || !localized(p.description) || !Number.isFinite(p.price) || p.price < 0 || p.price > 10000000 || !Number.isInteger(p.stock) || p.stock < 0 || !categories.some(c => c.id === p.category) || !moods.some(m => m.id === p.mood) || typeof p.image !== 'string' || !/^\/(?!\/)[^\s]*$/.test(p.image))
            return NextResponse.json({ error: 'Check fields. Image must be a local /products/... path.' }, { status: 400 });
        saveProduct({ id: p.id, name: p.name, description: p.description, price: p.price, stock: p.stock, category: p.category, mood: p.mood, image: p.image });
        return NextResponse.json({ ok: true });
    }
    catch {
        return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }
}
