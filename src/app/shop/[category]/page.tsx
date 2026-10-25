import { notFound } from 'next/navigation';
import { categories } from '@/lib/catalog';
import { ShopPage } from '@/components/ShopPage';
export default async function Page({ params }: {
    params: Promise<{
        category: string;
    }>;
}) { const { category } = await params; if (!categories.some(c => c.id === category))
    notFound(); return <ShopPage category={category}/>; }
