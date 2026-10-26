# From Pinterest — React + Vite

فرونت إند ستاتيك بنفس الألوان والصور واللوجو، English افتراضي مع عربي وRTL، والسلة محفوظة في المتصفح. لا يوجد Next.js أو API أو SQLite.

## التشغيل

Node.js 22.12+ أو Node 24.

```bash
npm install
npm run dev
```

افتح الرابط الظاهر في Terminal، عادة http://localhost:5173

```bash
npm run build
npm run preview
```

## تنظيم المشروع

- `src/pages`: صفحات مستقلة ومسارات واضحة.
- `src/components`: كمبوننتس مشتركة مثل Header وFooter وLogo وProductCard وSectionHeading، وواجهات الصفحات.
- `src/components/StoreProvider.tsx`: اللغة والسلة والإجمالي والعداد، باستخدام localStorage.
- `src/services/catalogService.ts`: نقطة توفير الداتا، لربط API المنتجات لاحقًا.
- `src/lib/seed.ts`: بيانات المنتجات التجريبية؛ عدّل الاسم والوصف والسعر والصور هنا.
- `src/lib/catalog.ts`: أنواع الداتا والأقسام والأجواء.
- `src/styles.css`: الاستايلات بنفس الهوية.
- `public/products`: صور المنتجات؛ استخدم مسارًا مثل `/products/my-photo.jpg`.

## ربط الباك المنفصل لاحقًا

بدّل الداتا المحلية في `catalogService.ts` بطلب fetch، وعدّل `App.tsx` لتحميلها async مع loading/error ثم تمريرها إلى StoreProvider. ضع عنوان API في `VITE_API_URL`، ولا تضع أسرارًا في متغيرات VITE لأنها مكشوفة للمتصفح.

أضف خدمة للطلبات واستدعها من CheckoutPage بعد إنشاء نموذج الطلب وربطه. اسمح لنطاق الفرونت في CORS على الباك. الأسعار والمخزون يجب التحقق منهم على الباك.

حاليًا إتمام الطلب يعرض الإجمالي فقط والإرسال متوقف. نموذج التواصل معاينة فقط، ولا توجد صفحة إدارة.

## GitHub وVercel

احتفظ بنسخة من مشروع Next.js الأصلي. عند استخدام نفس الريبو، استبدل ملفات المشروع كلها بهذه النسخة؛ لا تكتفي باستبدال src لأن package.json وباقي إعدادات البناء تغيرت. لا ترفع node_modules أو dist.

إعدادات Vercel:

- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- لا تحتاج متغيرات بيئة الآن.

ملف vercel.json يدعم فتح مسارات React مباشرة وعمل Refresh بدون 404. ويوجد public/_redirects لنفس الغرض على Netlify.
