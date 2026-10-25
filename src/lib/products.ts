import { database } from './database';
import type { Product } from './catalog';
export function getProducts(): Product[] {
    return database().prepare('SELECT data FROM products ORDER BY rowid').all().map(row => JSON.parse(String(row.data)));
}
export function getProduct(id: string): Product | undefined {
    const row = database().prepare('SELECT data FROM products WHERE id=?').get(id);
    return row ? JSON.parse(String(row.data)) : undefined;
}
export function saveProduct(product: Product) {
    database().prepare('INSERT INTO products VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data=excluded.data').run(product.id, JSON.stringify(product));
}
