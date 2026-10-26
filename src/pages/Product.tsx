import { useParams } from "react-router-dom";
import { ProductDetail } from "@/components/ProductDetail";
import { useStore } from "@/components/StoreProvider";
import { NotFound } from "./NotFound";

export function Product() {
  const { id } = useParams();
  const { findProduct } = useStore();
  const product = id ? findProduct(id) : undefined;
  return product ? (
    <ProductDetail key={product.id} product={product} />
  ) : (
    <NotFound />
  );
}
