"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { useStore } from './StoreProvider';
export function OrderConfirmation() { const { t } = useStore(); const [order, setOrder] = useState<{
    reference: string;
    total: number;
} | null>(null); useEffect(() => { try {
    setOrder(JSON.parse(sessionStorage.getItem('fp-order') || 'null'));
}
catch { } }, []); return <div className="container page confirmation">
        <Check size={44}/>
        <h1>{t({ ar: 'تم استلام طلبك', en: 'Order received' })}</h1>
        <p>{t({ ar: 'تم حفظ طلبك، وهنتواصل معاك لتأكيد الطلب والتوصيل.', en: 'Your order has been saved. We will contact you to confirm availability and delivery.' })}</p>{order && <p>
        <b dir="ltr">{order.reference}</b>
        <br />{order.total} EGP</p>}<Link href="/shop" className="button">{t({ ar: 'ارجعي للمتجر', en: 'Back to the shop' })}</Link>
        </div>; }
