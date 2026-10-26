import { Link } from "@/components/Link";
import { useStore } from "@/components/StoreProvider";

export function NotFound() {
  const { t } = useStore();
  return (
    <div className="container page">
      <h1>{t({ en: "Page not found", ar: "الصفحة غير موجودة" })}</h1>
      <Link href="/">{t({ en: "Back home", ar: "الرئيسية" })}</Link>
    </div>
  );
}
