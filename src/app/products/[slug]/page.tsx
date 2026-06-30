import ProductDetailClient from "./ProductDetailClient";
import { getDbProducts } from "@/lib/products";

// Fallback revalidation cache of 5 minutes (300 seconds) for product detail page
export const revalidate = 300;

/**
 * Pre-compiles product paths during static site builds.
 */
export async function generateStaticParams() {
  const products = await getDbProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const products = await getDbProducts();
  const product = products.find((p) => p.slug === slug) || null;

  return <ProductDetailClient product={product} slug={slug} />;
}
