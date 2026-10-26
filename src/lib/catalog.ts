export type Localized = {
  ar: string;
  en: string;
};
export type Product = {
  id: string;
  name: Localized;
  description: Localized;
  price: number;
  category: string;
  mood: string;
  image: string;
  stock: number;
};
export const categories = [
  {
    id: "picnic",
    name: { ar: "البيكنيك", en: "Picnic essentials" },
    subtitle: {
      ar: "طلعة بسيطة، تفاصيل مختلفة",
      en: "A little escape, beautifully styled",
    },
  },
  {
    id: "props",
    name: { ar: "ديكورات التصوير", en: "Photo props" },
    subtitle: {
      ar: "خلي فكرتك تاخد شكل",
      en: "Bring your vision into the frame",
    },
  },
  {
    id: "room",
    name: { ar: "ديكور الغرف", en: "Room decor" },
    subtitle: { ar: "ركنك، على ذوقك", en: "Your space, your little world" },
  },
  {
    id: "accessories",
    name: { ar: "تفاصيل الإطلالة", en: "Finishing touches" },
    subtitle: {
      ar: "التفاصيل اللي تكمل اللقطة",
      en: "The details that make the picture",
    },
  },
];
export const moods = [
  { id: "natural", ar: "طبيعي", en: "Natural" },
  { id: "romantic", ar: "رومانسي", en: "Romantic" },
  { id: "minimal", ar: "فينتج", en: "Vintage" },
];
