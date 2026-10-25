import Link from 'next/link';
export default function NotFound() { return <div className="container page empty">
        <h1>404</h1>
        <p>الصفحة غير موجودة · Page not found</p>
        <Link className="button" href="/">الرئيسية / Home</Link>
        </div>; }
