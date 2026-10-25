import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/products';
import { ProductDetail } from '@/components/ProductDetail';
export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) { const { id } = await params; const product = getProduct(id); if (!product)
    notFound(); return <ProductDetail product={product}/>; }
