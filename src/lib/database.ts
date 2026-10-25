import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { seedProducts } from './seed';
let connection: DatabaseSync | undefined;
export function database() {
    if (connection)
        return connection;
    const filename = process.env.DATABASE_PATH || path.join(process.cwd(), 'data/store.sqlite');
    mkdirSync(path.dirname(filename), { recursive: true });
    const db = new DatabaseSync(filename);
    db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, data TEXT NOT NULL); CREATE TABLE IF NOT EXISTS orders (reference TEXT PRIMARY KEY, data TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY);`);
    if (!db.prepare("SELECT key FROM settings WHERE key='seeded'").get()) {
        db.exec('BEGIN IMMEDIATE');
        try {
            for (const product of seedProducts)
                db.prepare('INSERT INTO products VALUES (?, ?)').run(product.id, JSON.stringify({ ...product, stock: 20 }));
            db.prepare("INSERT INTO settings VALUES ('seeded')").run();
            db.exec('COMMIT');
        }
        catch (error) {
            db.exec('ROLLBACK');
            throw error;
        }
    }
    connection = db;
    return db;
}
