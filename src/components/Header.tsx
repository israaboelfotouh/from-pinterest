import { Link } from "@/components/Link";
import { useLocation } from "react-router-dom";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "./StoreProvider";
import { Logo } from "./Logo";
export function Header() {
  const { t, locale, toggleLocale, count } = useStore();
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;
  const links = [
    ["/", "الرئيسية", "Home"],
    ["/shop", "المتجر", "Shop"],
    ["/about", "حكايتنا", "Our story"],
    ["/contact", "تواصل معنا", "Contact"],
  ];
  return (
    <>
      <header className="header container">
        <Logo />
        <nav
          className={open ? "navigation open" : "navigation"}
          aria-label={t({ ar: "القائمة الرئيسية", en: "Main navigation" })}
        >
          {links.map(([url, ar, en]) => (
            <Link
              key={url}
              href={url}
              aria-current={
                (
                  url === "/shop"
                    ? path.startsWith("/shop") ||
                      path.startsWith("/products") ||
                      path.startsWith("/moods")
                    : path === url
                )
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {t({ ar, en })}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="text-button language-switch"
            onClick={toggleLocale}
            aria-label={
              locale === "ar" ? "Switch to English" : "التبديل للعربية"
            }
          >
            <span className={locale === "ar" ? "language-active" : ""}>AR</span>{" "}
            |{" "}
            <span className={locale === "en" ? "language-active" : ""}>EN</span>
          </button>
          <Link
            href="/cart"
            className="bag"
            aria-label={t({
              ar: `السلة: ${count} منتجات`,
              en: `Cart: ${count} items`,
            })}
          >
            <ShoppingBag size={21} />
            {count > 0 && <span aria-live="polite">{count}</span>}
          </Link>
          <Link
            href="/shop"
            className="icon-button"
            aria-label={t({ ar: "المتجر", en: "Shop" })}
          >
            <Search size={20} />
          </Link>
          <button
            className="mobile-toggle icon-button"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
