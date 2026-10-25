import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
export const dynamic = 'force-dynamic';
export function GET() { return NextResponse.json(getProducts(), { headers: { 'Cache-Control': 'no-store' } }); }
