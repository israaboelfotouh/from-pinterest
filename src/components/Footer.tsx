"use client";
import Link from 'next/link';
import { Logo } from './Logo';
import { useStore } from './StoreProvider';
export function Footer() { const { t, toggleLocale } = useStore(); return <footer className="container reference-footer">
        <Logo />
        <nav>
        <Link href="/">{t({ ar: 'الرئيسية', en: 'Home' })}</Link>
        <Link href="/shop">{t({ ar: 'المتجر', en: 'Shop' })}</Link>
        <Link href="/about">{t({ ar: 'حكايتنا', en: 'Our story' })}</Link>
        <Link href="/contact">{t({ ar: 'تواصل معنا', en: 'Contact' })}</Link>
        <Link href="/faq">{t({ ar: 'الأسئلة الشائعة', en: 'FAQs' })}</Link>
        </nav>
        <button className="text-button" onClick={toggleLocale}>AR | EN</button>
        </footer>; }
