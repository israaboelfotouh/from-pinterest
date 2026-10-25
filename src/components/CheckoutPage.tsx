"use client";
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from './StoreProvider';
export function CheckoutPage() { const { t, cart, total, clear, ready } = useStore(); const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false); async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setBusy(true); setError(''); const data = new FormData(e.currentTarget); try {
    const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer: Object.fromEntries(data), items: cart }) });
    const result = await response.json();
    if (!response.ok)
        throw new Error(result.error);
    sessionStorage.setItem('fp-order', JSON.stringify(result));
    clear();
    router.push('/order-confirmation');
}
catch {
    setError(t({ ar: 'تعذر حفظ الطلب. راجعي البيانات وتوفر المنتجات وحاولي تاني.', en: 'Could not place the order. Check your details and stock, then try again.' }));
    setBusy(false);
} } if (!ready)
    return <div className="container page">…</div>; if (!cart.length)
    return <div className="container page empty">
        <h1>{t({ ar: 'السلة فاضية', en: 'Your bag is empty' })}</h1>
        <Link href="/shop" className="button">{t({ ar: 'ارجعي للمتجر', en: 'Visit the shop' })}</Link>
        </div>; return <div className="container page">
        <h1>{t({ ar: 'خطوة أخيرة للقطتك', en: 'One step closer to your moment' })}</h1>
        <p className="demo-note">{t({ ar: 'سيتم حفظ الطلب للمراجعة والتواصل معك. الدفع الإلكتروني غير مفعّل.', en: 'Your order will be saved for review. Online payment is not enabled.' })}</p>
        <div className="cart-layout">
        <form className="form" onSubmit={submit}>{[['name', 'الاسم بالكامل', 'Full name', 'text'], ['phone', 'رقم الموبايل', 'Phone number', 'tel'], ['email', 'البريد الإلكتروني', 'Email', 'email'], ['city', 'المدينة / المحافظة', 'City / governorate', 'text'], ['address', 'العنوان بالتفصيل', 'Full address', 'text']].map(([name, ar, en, type]) => <label key={name}>{t({ ar, en })}<input required name={name} type={type} maxLength={name === 'address' ? 300 : 100} autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : name === 'email' ? 'email' : name === 'address' ? 'street-address' : 'address-level2'}/>
        </label>)}<label>{t({ ar: 'ملاحظات (اختياري)', en: 'Notes (optional)' })}<textarea name="notes" maxLength={500}/>
        </label>
        <p role="alert">{error}</p>
        <button className="button" disabled={busy}>{busy ? '…' : t({ ar: 'تأكيد الطلب', en: 'Place order' })}</button>
        </form>
        <aside className="summary">
        <h2>{t({ ar: 'ملخص الطلب', en: 'Order summary' })}</h2>
        <p>{t({ ar: 'المنتجات', en: 'Products' })}<strong>{total} {t({ ar: 'ج.م', en: 'EGP' })}</strong>
        </p>
        <small>{t({ ar: 'الإجمالي للمنتجات فقط، وتكلفة التوصيل يتم تأكيدها لاحقًا.', en: 'Product subtotal only. Delivery cost will be confirmed separately.' })}</small>
        </aside>
        </div>
        </div>; }
