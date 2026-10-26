import { seedProducts } from "@/lib/seed";
import type { Product } from "@/lib/catalog";

// Replace this implementation with your backend API later.
// Keep API URLs and fetch calls in this service, outside UI components.
export function getCatalog(): Product[] {
  return seedProducts.map((product) => ({ ...product, stock: 20 }));
}
