import { Link } from "@/components/Link";
import { Localized } from "@/lib/catalog";
import { useStore } from "./StoreProvider";
export function SectionHeading({
  title,
  subtitle,
  href,
}: {
  title: Localized;
  subtitle?: Localized;
  href?: string;
}) {
  const { t } = useStore();
  return (
    <div className="section-heading">
      <div>
        <h2>{t(title)}</h2>
        {subtitle && <p>{t(subtitle)}</p>}
      </div>
      {href && (
        <Link className="underlined" href={href}>
          {t({ ar: "← عرض الكل", en: "View all →" })}
        </Link>
      )}
    </div>
  );
}
