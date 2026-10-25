"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, Localized } from '@/lib/catalog';
type Item = {
    id: string;
    quantity: number;
};
type Store = {
    products: Product[];
    findProduct: (id: string) => Product | undefined;
    locale: 'ar' | 'en';
    toggleLocale: () => void;
    t: (value: Localized) => string;
    cart: Item[];
    ready: boolean;
    add: (id: string) => void;
    setQuantity: (id: string, n: number) => void;
    clear: () => void;
    total: number;
    count: number;
};
const Context = createContext<Store | null>(null);
export function StoreProvider({ children, products }: {
    children: ReactNode;
    products: Product[];
}) {
    const findProduct = (id: string) => products.find(p => p.id === id);
    const [locale, setLocale] = useState<'ar' | 'en'>('en');
    const [cart, setCart] = useState<Item[]>([]);
    const [ready, setReady] = useState(false);
    useEffect(() => { try {
        const saved = JSON.parse(localStorage.getItem('fp-cart') || '[]');
        if (Array.isArray(saved))
            setCart(saved.filter((i: Item) => findProduct(i.id) && Number.isInteger(i.quantity) && i.quantity > 0).map((i: Item) => ({ ...i, quantity: Math.min(20, i.quantity) })));
        const l = localStorage.getItem('fp-language');
        if (l === 'en' || l === 'ar')
            setLocale(l);
    }
    catch { } setReady(true); }, []);
    useEffect(() => { if (ready) {
        try {
            localStorage.setItem('fp-cart', JSON.stringify(cart));
        }
        catch { }
    } }, [cart, ready]);
    useEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'; if (ready) {
        try {
            localStorage.setItem('fp-language', locale);
        }
        catch { }
    } }, [locale, ready]);
    const setQuantity = (id: string, quantity: number) => {
        const product = findProduct(id);
        if (!product || !Number.isInteger(quantity)) return;
        const nextQuantity = Math.max(0, Math.min(20, product.stock, quantity));
        setCart(previous => {
            if (!nextQuantity) return previous.filter(item => item.id !== id);
            if (previous.some(item => item.id === id)) {
                return previous.map(item => item.id === id ? {id, quantity: nextQuantity} : item);
            }
            return [...previous, {id, quantity: nextQuantity}];
        });
    };
    const add = (id: string) => {
        const product = findProduct(id);
        if (!product || product.stock < 1) return;
        setCart(previous => {
            const existing = previous.find(item => item.id === id);
            if (!existing) return [...previous, {id, quantity: 1}];
            return previous.map(item => item.id === id
                ? {...item, quantity: Math.min(20, product.stock, item.quantity + 1)}
                : item);
        });
    };
    return <Context.Provider value={{ products, findProduct, locale, toggleLocale: () => setLocale(l => l === 'ar' ? 'en' : 'ar'), t: v => v[locale], cart, ready, add, setQuantity, clear: () => setCart([]), total: cart.reduce((sum, i) => sum + (findProduct(i.id)?.price || 0) * i.quantity, 0), count: cart.reduce((sum, i) => sum + i.quantity, 0) }}>{children}</Context.Provider>;
}
export function useStore() { const store = useContext(Context); if (!store)
    throw new Error('StoreProvider missing'); return store; }
