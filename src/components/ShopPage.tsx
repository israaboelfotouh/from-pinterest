"use client";
import Link from 'next/link';
import { useState } from 'react';
import { categories, moods } from '@/lib/catalog';
import { useStore } from './StoreProvider';
import { ProductCard } from './ProductCard';
export function ShopPage({ category, mood }: {
    category?: string;
    mood?: string;
}) { const { t, products } = useStore(); const [query, setQuery] = useState(''); const selected = categories.find(c => c.id === category); const selectedMood = moods.find(m => m.id === mood); const list = products.filter(p => (!category || p.category === category) && (!mood || p.mood === mood) && (!query || `${p.name.ar} ${p.name.en}`.toLowerCase().includes(query.toLowerCase()))); return <div className="container page">
        <div className="page-title">
        <span className="eyebrow">THE LITTLE DETAILS SHOP</span>
        <h1>{selected ? t(selected.name) : selectedMood ? t(selectedMood) : t({ ar: 'تفاصيل تستاهل تتشاف', en: 'Details worth discovering' })}</h1>
        <p>{t({ ar: 'اختاري القطع اللي تحكي حكايتك.', en: 'Find the pieces that tell your story.' })}</p>
        </div>
        <div className="shop-tools">
        <div className="category-links">
        <Link href="/shop">{t({ ar: 'الكل', en: 'All' })}</Link>{categories.map(c => <Link key={c.id} aria-current={category === c.id ? 'page' : undefined} href={`/shop/${c.id}`}>{t(c.name)}</Link>)}</div>
        <label className="search">
        <span className="sr-only">{t({ ar: 'ابحثي عن منتج', en: 'Search products' })}</span>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t({ ar: 'بتدوري على إيه؟', en: 'Looking for something?' })}/>
        </label>
        </div>{list.length ? <div className="product-grid">{list.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <p className="empty">{t({ ar: 'مفيش منتجات بالاسم ده. جرّبي كلمة تانية.', en: 'No products found. Try another word.' })}</p>}<p className="demo-note">{t({ ar: 'المنتجات والصور والأسعار أمثلة للمعاينة.', en: 'Products, photos and prices are demonstration content.' })}</p>
        </div>; }
