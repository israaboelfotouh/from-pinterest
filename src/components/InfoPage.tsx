import { useState } from "react";
import { useStore } from "./StoreProvider";
export function InfoPage({ type }: { type: "about" | "contact" | "faq" }) {
  const { t } = useStore();
  const [sent, setSent] = useState(false);
  const [tab, setTab] = useState(0);
  return (
    <div className="container page reference-info">
      <div className="page-title">
        <h1>
          {t(
            type === "about"
              ? { ar: "حكايتنا", en: "Our story" }
              : type === "contact"
                ? { ar: "تواصلي معنا", en: "Contact us" }
                : { ar: "أسئلتك تهمنا", en: "Your questions matter" },
          )}
        </h1>
        <p>
          {t(
            type === "about"
              ? {
                  ar: "نقرب لك التفاصيل اللي بتحبيها في الصور",
                  en: "Bringing the details you love in pictures closer",
                }
              : type === "contact"
                ? {
                    ar: "يسعدنا نسمعك. إذا كان لديك أي سؤال أو استفسار نحن هنا لمساعدتك.",
                    en: "We would love to hear from you. We are here to help.",
                  }
                : {
                    ar: "هنا ستجدين إجابات لأكثر الأسئلة شيوعًا، مع معلومات حول الشحن والاستبدال.",
                    en: "Answers to common questions, shipping and exchanges.",
                  },
          )}
        </p>
      </div>
      {type === "about" ? (
        <>
          <img
            className="story-image"
            src="/products/story.png"
            alt="Flowers and decor on a wooden tray"
          />
          <div className="about-categories">
            {[
              ["basket", "البيكنيك", "Picnic"],
              ["vase", "ديكورات", "Decor"],
              ["backdrop", "التصوير", "Photography"],
              ["candle", "ديكور الغرف", "Room decor"],
              ["bow", "تفاصيل الإطلالة", "Accessories"],
            ].map(([img, ar, en]) => (
              <div key={img}>
                <img src={`/products/${img}.png`} alt={t({ ar, en })} />
                <p>{t({ ar, en })}</p>
              </div>
            ))}
          </div>
        </>
      ) : type === "contact" ? (
        <div className="contact-layout">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            {[
              ["الاسم", "Name", "text"],
              ["البريد الإلكتروني", "Email", "email"],
            ].map(([ar, en, type]) => (
              <label key={en}>
                {t({ ar, en })}
                <input
                  required
                  type={type}
                  placeholder={t({ ar: "اكتبي " + ar, en })}
                />
              </label>
            ))}
            <label>
              {t({ ar: "رسالتك", en: "Your message" })}
              <textarea
                required
                placeholder={t({
                  ar: "اكتبي رسالتك هنا...",
                  en: "Write your message...",
                })}
              />
            </label>
            <button className="button">{t({ ar: "إرسال", en: "Send" })}</button>
            {sent && (
              <p role="status">
                {t({
                  ar: "دي معاينة للفورم فقط، لم يتم إرسال الرسالة.",
                  en: "Form preview only. Your message has not been sent.",
                })}
              </p>
            )}
            <div className="contact-options">
              <button type="button" onClick={() => setSent(true)}>
                {t({ ar: "واتساب", en: "WhatsApp" })}
              </button>
              <button type="button" onClick={() => setSent(true)}>
                {t({ ar: "البريد الإلكتروني", en: "Email" })}
              </button>
            </div>
          </form>
          <img src="/products/contact.png" alt="Flowers in a ceramic vase" />
        </div>
      ) : (
        <>
          <div className="faq-tabs">
            {[
              { ar: "الأسئلة الشائعة", en: "FAQs" },
              { ar: "الشحن", en: "Shipping" },
              { ar: "الاستبدال", en: "Exchanges" },
            ].map((v, i) => (
              <button
                key={i}
                aria-pressed={tab === i}
                onClick={() => setTab(i)}
              >
                {t(v)}
              </button>
            ))}
          </div>
          {(tab === 0
            ? [
                { ar: "إزاي أطلب؟", en: "How do I order?" },
                { ar: "إزاي أتابع طلبي؟", en: "How do I track my order?" },
                { ar: "الشحن بيتحسب إزاي؟", en: "How is shipping calculated?" },
                {
                  ar: "إزاي أطلب استبدال؟",
                  en: "How do I request an exchange?",
                },
              ]
            : tab === 1
              ? [{ ar: "مواعيد ومناطق الشحن", en: "Delivery times and areas" }]
              : [{ ar: "سياسة الاستبدال", en: "Exchange policy" }]
          ).map((q, i) => (
            <details key={`${tab}-${i}`} open={i === 0}>
              <summary>{t(q)}</summary>
              <p>
                {t({
                  ar:
                    tab === 0 && i === 0
                      ? "يمكنك تصفح المنتجات وإضافتها إلى سلة التسوق، ثم إكمال بيانات الطلب. النسخة الحالية للمعاينة فقط."
                      : "سيتم إضافة التفاصيل المعتمدة قبل إطلاق المتجر.",
                  en:
                    tab === 0 && i === 0
                      ? "Browse products, add them to your bag, then complete checkout. This version is a preview only."
                      : "Confirmed details will be published before the store launches.",
                })}
              </p>
            </details>
          ))}
        </>
      )}
    </div>
  );
}
