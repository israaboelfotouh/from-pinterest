"use client";
import { useState } from 'react';
import type { Product } from '@/lib/catalog';
import { ProductForm } from './ProductForm';
type Order = {
    reference: string;
    total: number;
    createdAt: string;
    customer: {
        name: string;
        phone: string;
        email: string;
        address: string;
        city: string;
        notes: string;
    };
    items: {
        id: string;
        quantity: number;
    }[];
};
export function AdminPage() {
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<Product[] | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selected, setSelected] = useState<Product>();
    const [message, setMessage] = useState('');
    async function request(path: string, options: RequestInit = {}) {
        const response = await fetch('/api/admin/' + path, { ...options, headers: { 'Content-Type': 'application/json', 'x-admin-password': password }, cache: 'no-store' });
        const data = await response.json();
        if (!response.ok)
            throw new Error(data.error || 'Request failed');
        return data;
    }
    async function load() { try {
        setProducts(await request('products'));
        setOrders(await request('orders'));
        setMessage('');
    }
    catch (error) {
        setMessage(String(error));
    } }
    async function save(product: Product) { try {
        await request('products', { method: 'POST', body: JSON.stringify(product) });
        await load();
        setMessage('Saved. Refresh the storefront to see changes.');
    }
    catch (error) {
        setMessage(String(error));
    } }
    return <div className="container page" dir="ltr">
        <h1>Store management</h1>
        <p role="status">{message}</p>{!products ? <form className="form" onSubmit={e => { e.preventDefault(); void load(); }}>
        <label>Admin password<input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button className="button">Sign in</button>
        </form> : <>
        <button className="underlined" onClick={() => { setPassword(''); setProducts(null); setOrders([]); setSelected(undefined); }}>Sign out</button>
        <div className="cart-layout">
        <aside>
        <h2>Products</h2>
        <button className="button" onClick={() => setSelected(undefined)}>New product</button>{products.map(p => <p key={p.id}>
        <button className="underlined" onClick={() => setSelected(p)}>{p.name.en} · {p.price} EGP · Stock {p.stock}</button>
        </p>)}</aside>
        <ProductForm key={selected?.id || 'new'} product={selected} onSave={save}/>
        </div>
        <h2>Recent orders</h2>{orders.length ? orders.map(o => <article className="summary" key={o.reference}>
        <h3>{o.reference}</h3>
        <p>{o.createdAt} · {o.total} EGP</p>
        <p>{o.customer.name} · {o.customer.phone} · {o.customer.email}</p>
        <p>{o.customer.city} — {o.customer.address}</p>
        <p>{o.customer.notes}</p>{o.items.map(i => <p key={i.id}>{i.id} × {i.quantity}</p>)}</article>) : <p>No orders yet.</p>}</>}</div>;
}
