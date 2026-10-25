import { NextResponse } from 'next/server';
import { database } from '@/lib/database';
import { isAdmin } from '@/lib/admin';
export const dynamic = 'force-dynamic';
export function GET(request: Request) { if (!isAdmin(request))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json(database().prepare('SELECT data FROM orders ORDER BY rowid DESC LIMIT 200').all().map(r => JSON.parse(String(r.data)))); }
