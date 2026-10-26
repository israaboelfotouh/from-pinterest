import { Link } from "@/components/Link";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="From Pinterest">
      <img src="/logo-transparent.png" alt="From Pinterest" />
    </Link>
  );
}
