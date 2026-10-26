import { Link } from "@/components/Link";
import { useState } from "react";
import { Product } from "@/lib/catalog";
import { useStore } from "./StoreProvider";
import { ProductCard } from "./ProductCard";
export function ProductDetail({ product }: { product: Product }) {
  const { t, products, add, ready } = useStore();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="container page">
      <Link className="underlined" href={`/shop/${product.category}`}>
        {t({ ar: "رجوع للقسم", en: "Back to collection" })}
      </Link>
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={t(product.name)} />
        </div>
        <div className="detail-copy" dir={t({ ar: "rtl", en: "ltr" })}>
          <span className="eyebrow">MADE FOR YOUR LITTLE MOMENTS</span>
          <h1>{t(product.name)}</h1>
          <p className="price">
            {product.price} {t({ ar: "ج.م", en: "EGP" })}
          </p>
          <p>{t(product.description)}</p>
          <p>{t({ ar: "الكمية", en: "Quantity" })}</p>
          <div className="quantity">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(Math.min(20, quantity + 1))}>
              +
            </button>
          </div>
          <button
            disabled={!ready || product.stock < quantity}
            className="button"
            onClick={() => {
              for (let i = 0; i < quantity; i++) add(product.id);
              setAdded(true);
            }}
          >
            {t({ ar: "أضيفي للسلة", en: "Add to bag" })}
          </button>
          <p role="status">
            {added && (
              <Link href="/cart">
                {t({
                  ar: "اتضافت! افتحي السلة ←",
                  en: "Added! View your bag →",
                })}
              </Link>
            )}
          </p>
          <details>
            <summary>
              {t({ ar: "الوصف والمقاسات", en: "Description & dimensions" })}
            </summary>
            <div className="detail-note">
              {t({
                ar: "منتج تجريبي للتصميم. الصور توضيحية، والتفاصيل النهائية تتحدد عند تجهيز الكتالوج.",
                en: "Demo product. Images are illustrative; final specifications will be set with the real catalogue.",
              })}
            </div>
          </details>
        </div>
      </div>
      <h2>{t({ ar: "كمّلي الأجواء", en: "Complete the mood" })}</h2>
      <div className="product-grid">
        {products
          .filter((p) => p.id !== product.id && p.mood === product.mood)
          .map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
      </div>
    </div>
  );
}
