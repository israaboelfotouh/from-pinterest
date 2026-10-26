import { Link } from "@/components/Link";
import { Trash2 } from "lucide-react";
import { useStore } from "./StoreProvider";
export function CartPage() {
  const { cart, t, total, setQuantity, ready, findProduct } = useStore();
  if (!ready)
    return (
      <div className="container page" aria-busy="true">
        …
      </div>
    );
  return (
    <div className="container page">
      <h1>{t({ ar: "سلة التفاصيل الحلوة", en: "Your bag of little joys" })}</h1>
      {!cart.length ? (
        <div className="empty">
          <p>
            {t({
              ar: "لسه السلة فاضية. نختار حاجة حلوة؟",
              en: "Your bag is empty. Find something lovely?",
            })}
          </p>
          <Link className="button" href="/shop">
            {t({ ar: "اكتشفي المتجر", en: "Explore the shop" })}
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.map((i) => {
              const p = findProduct(i.id)!;
              return (
                <article className="cart-row" key={i.id}>
                  <img src={p.image} alt={t(p.name)} />
                  <div>
                    <Link href={`/products/${p.id}`}>
                      <h3>{t(p.name)}</h3>
                    </Link>
                    <p>
                      {p.price} {t({ ar: "ج.م", en: "EGP" })}
                    </p>
                    <div className="quantity">
                      <button
                        aria-label={t({
                          ar: "تقليل الكمية",
                          en: "Decrease quantity",
                        })}
                        onClick={() => setQuantity(i.id, i.quantity - 1)}
                      >
                        −
                      </button>
                      <span>{i.quantity}</span>
                      <button
                        disabled={i.quantity >= 20}
                        aria-label={t({
                          ar: "زيادة الكمية",
                          en: "Increase quantity",
                        })}
                        onClick={() => setQuantity(i.id, i.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="icon-button"
                    aria-label={t({ ar: "حذف المنتج", en: "Remove item" })}
                    onClick={() => setQuantity(i.id, 0)}
                  >
                    <Trash2 size={19} />
                  </button>
                </article>
              );
            })}
          </div>
          <aside className="summary">
            <h2>{t({ ar: "ملخص السلة", en: "Bag summary" })}</h2>
            <p>
              {t({ ar: "إجمالي المنتجات", en: "Product subtotal" })}
              <strong>
                {total} {t({ ar: "ج.م", en: "EGP" })}
              </strong>
            </p>
            <small>
              {t({
                ar: "تكلفة الشحن غير مفعّلة في النسخة التجريبية.",
                en: "Shipping is not configured in this demo.",
              })}
            </small>
            <Link className="button" href="/checkout">
              {t({ ar: "كمّلي الطلب", en: "Continue to checkout" })}
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
