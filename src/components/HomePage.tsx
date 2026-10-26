import { Link } from "@/components/Link";
import { categories, moods } from "@/lib/catalog";
import { useStore } from "./StoreProvider";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
const homeProducts: Record<string, string[]> = {
  picnic: ["wooden-tray", "picnic-basket", "gingham-cloth"],
  props: ["ceramic-vase", "plinth", "backdrop"],
  room: ["frame", "linen-cushion", "mirror"],
  accessories: ["ribbon", "rings", "gloves"],
};
export function HomePage() {
  const { t, products } = useStore();
  return (
    <div className="container reference-home">
      <section className="reference-hero">
        <div>
          <h1>
            {t({ ar: "تفاصيل صغيرة،", en: "Little details," })}
            <br />
            {t({ ar: "صور أجمل", en: "lovelier pictures" })}
          </h1>
          <Link href="/shop" className="button">
            {t({ ar: "تسوقي الآن", en: "Shop now" })}
          </Link>
        </div>
        <img
          src="/products/hero.png"
          alt={t({ ar: "بيكنيك وسط الزهور", en: "Picnic among flowers" })}
        />
      </section>
      {categories.map((c) => (
        <section className="reference-collection" key={c.id}>
          <SectionHeading title={c.name} href={`/shop/${c.id}`} />
          <div className="product-grid">
            {products
              .filter((p) => p.category === c.id)
              .slice(0, 3)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </section>
      ))}
      <section className="reference-collection">
        <SectionHeading
          title={{ ar: "اختاري الأجواء", en: "Choose your mood" }}
        />
        <div className="mood-grid">
          {[...moods].reverse().map((m, i) => (
            <Link href={`/moods/${m.id}`} key={m.id}>
              <img
                src={
                  "/products/" + ["vintage", "romantic", "natural"][i] + ".png"
                }
                alt={t(m)}
              />
              <p>{t(m)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
