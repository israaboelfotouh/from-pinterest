"use client";
import { useState } from 'react';
import type { Product } from '@/lib/catalog';
import { categories, moods } from '@/lib/catalog';
const empty: Product = { id: '', name: { en: '', ar: '' }, description: { en: '', ar: '' }, price: 0, stock: 0, category: 'picnic', mood: 'natural', image: '/products/basket.png' };
export function ProductForm({ product, onSave }: {
    product?: Product;
    onSave: (product: Product) => Promise<void>;
}) {
    const [value, setValue] = useState<Product>(product || empty);
    const [busy, setBusy] = useState(false);
    return <form className="form" onSubmit={async (e) => { e.preventDefault(); setBusy(true); try {
        await onSave(value);
    }
    finally {
        setBusy(false);
    } }}>
    <label>Product ID<input required pattern="[a-z0-9-]+" value={value.id} disabled={!!product} onChange={e => setValue({ ...value, id: e.target.value })}/>
        </label>
    {(['en', 'ar'] as const).map(locale => <div key={locale}>
        <label>Name ({locale})<input required value={value.name[locale]} onChange={e => setValue({ ...value, name: { ...value.name, [locale]: e.target.value } })}/>
        </label>
        <label>Description ({locale})<textarea required value={value.description[locale]} onChange={e => setValue({ ...value, description: { ...value.description, [locale]: e.target.value } })}/>
        </label>
        </div>)}
    <label>Price (EGP)<input required type="number" min="0" step="0.01" value={value.price} onChange={e => setValue({ ...value, price: Number(e.target.value) })}/>
        </label>
    <label>Stock<input required type="number" min="0" step="1" value={value.stock} onChange={e => setValue({ ...value, stock: Number(e.target.value) })}/>
        </label>
    <label>Category<select value={value.category} onChange={e => setValue({ ...value, category: e.target.value })}>{categories.map(c => <option key={c.id} value={c.id}>{c.name.en}</option>)}</select>
        </label>
    <label>Mood<select value={value.mood} onChange={e => setValue({ ...value, mood: e.target.value })}>{moods.map(m => <option key={m.id} value={m.id}>{m.en}</option>)}</select>
        </label>
    <label>Image path<input required value={value.image} onChange={e => setValue({ ...value, image: e.target.value })}/>
        <small>Put your photo in public/products and enter /products/filename.jpg</small>
        </label>
    <button className="button" disabled={busy}>{busy ? 'Saving…' : 'Save product'}</button>
  </form>;
}
