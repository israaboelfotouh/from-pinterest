import { getProducts } from '@/lib/products';
export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/StoreProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export const metadata: Metadata = { title: { default: 'From Pinterest | تفاصيل تشبهك', template: '%s | From Pinterest' }, description: 'Thoughtful pieces for picnics, photo styling, your room and your everyday moments.' };
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" dir="ltr" suppressHydrationWarning>
        <body>
        <StoreProvider products={getProducts()}>
        <a href="#main" className="skip-link">Skip to content / انتقلي للمحتوى</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        </StoreProvider>
        </body>
        </html>; }
