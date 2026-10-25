"use client";
import Link from 'next/link';
import { Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/lib/catalog';
import { useStore } from './StoreProvider';
export function ProductCard({ product }: {
    product: Product;
}) { const { t, add, ready } = useStore(); const [added, setAdded] = useState(false); return <article className="product-card">
        <Link href={`/products/${product.id}`} className="product-image">
        <img src={product.image} alt={t(product.name)} loading="lazy"/>
        </Link>
        <div className="product-info">
        <Link href={`/products/${product.id}`}>
        <h3>{t(product.name)}</h3>
        <p>{product.price} {t({ ar: 'ج.م', en: 'EGP' })}</p>
        </Link>
        <button disabled={!ready || product.stock===0} className="add-button" aria-label={t({ ar: `أضيفي ${product.name.ar} للسلة`, en: `Add ${product.name.en} to cart` })} onClick={() => { add(product.id); setAdded(true); setTimeout(() => setAdded(false), 1500); }}>{added ? <Check size={18}/> : <span>{t({ ar: product.stock===0 ? "نفدت الكمية" : "أضيفي للسلة", en: product.stock===0 ? "Sold out" : "Add to bag" })}</span>}</button>
        </div>
        <span className="sr-only" role="status">{added ? t({ ar: 'تمت الإضافة للسلة', en: 'Added to cart' }) : ''}</span>
        </article>; }
