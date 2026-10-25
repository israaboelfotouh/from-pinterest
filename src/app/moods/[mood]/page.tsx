import { notFound } from 'next/navigation';
import { moods } from '@/lib/catalog';
import { ShopPage } from '@/components/ShopPage';
export default async function Page({ params }: {
    params: Promise<{
        mood: string;
    }>;
}) { const { mood } = await params; if (!moods.some(m => m.id === mood))
    notFound(); return <ShopPage mood={mood}/>; }
