import ProductsClient from "./ProductsClient";
import { getDbProducts } from "@/lib/products";

// Fallback revalidation cache of 5 minutes (300 seconds) for products catalogue
export const revalidate = 300;

export default async function ProductsPage() {
  const products = await getDbProducts();
  return <ProductsClient initialProducts={products} />;
}
