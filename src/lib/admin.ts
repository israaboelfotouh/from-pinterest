import { timingSafeEqual } from 'node:crypto';
export function isAdmin(request: Request) {
    const password = process.env.ADMIN_PASSWORD;
    const actual = Buffer.from(request.headers.get('x-admin-password') || '');
    const expected = Buffer.from(password || '');
    return Boolean(password && actual.length === expected.length && timingSafeEqual(actual, expected));
}
