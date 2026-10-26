import { Link } from "./Link";
import { useStore } from "./StoreProvider";

export function CheckoutPage() {
  const { t, total } = useStore();
  return (
    <div className="container page">
      <h1>{t({ en: "Checkout preview", ar: "معاينة إتمام الطلب" })}</h1>
      <p>
        {t({
          en: "This is a static preview. Orders are not submitted or saved yet.",
          ar: "دي معاينة ستاتيك. الطلبات مش بتتبعت أو تتحفظ دلوقتي.",
        })}
      </p>
      <div className="summary">
        <h2>{t({ en: "Order summary", ar: "ملخص الطلب" })}</h2>
        <p>{total} EGP</p>
        <button className="button" disabled>
          {t({
            en: "Ordering available after backend integration",
            ar: "الطلب هيتفعل بعد ربط الباك إند",
          })}
        </button>
        <Link href="/cart">{t({ en: "Back to bag", ar: "رجوع للسلة" })}</Link>
      </div>
    </div>
  );
}
