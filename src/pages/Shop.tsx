import { useParams } from "react-router-dom";
import { ShopPage } from "@/components/ShopPage";
import { categories, moods } from "@/lib/catalog";
import { NotFound } from "./NotFound";

export function Shop() {
  const { category, mood } = useParams();
  if (category && !categories.some((item) => item.id === category))
    return <NotFound />;
  if (mood && !moods.some((item) => item.id === mood)) return <NotFound />;
  return <ShopPage category={category} mood={mood} />;
}
