import Hero from "@/components/hero/Hero";
import ProductsGrid from "@/components/products/ProductsGrid";
import MarqueeBand from "@/components/marquee/MarqueeBand";
import BrandIntroduction from "@/components/brand/BrandIntroduction";
import LatestNews from "@/components/news/LatestNews";
import BrandBanner from "@/components/brand/BrandBanner";
import ContactCTA from "@/components/contact/ContactCTA";
import { getSiteSettings, getDbHeroSlides } from "@/lib/settings";
import { getDbProducts } from "@/lib/products";

// Fallback revalidation cache of 5 minutes (300 seconds) for homepage queries
export const revalidate = 300;

/**
 * Home landing page container.
 * Integrates all homepage blocks in their correct chronological stack order.
 */
export default async function Home() {
  const settings = await getSiteSettings();
  const products = await getDbProducts();
  const slides = await getDbHeroSlides();

  return (
    <div className="relative bg-white text-black overflow-x-hidden">
      
      {/* 2. Hero banner segment (with slideshow rotating background) */}
      <Hero initialSlides={slides} />
      
      {/* 3. Dynamic product item cards grid */}
      <ProductsGrid products={products} />
      
      {/* 4. specialties marquee with looping video overlay background */}
      <MarqueeBand scrollingTexts={settings.scrollingTexts} />
      
      {/* 5. Brand text copy segment (High Quality Distribution & Power) */}
      <BrandIntroduction />
      
      {/* 6. Latest news grid (with three blog articles cards) */}
      <LatestNews />
      
      {/* 7. Brand statement columns (Positive Power banner) */}
      <BrandBanner />
      
      {/* 8. Call to action contact block (with team circular image) */}
      <ContactCTA />

    </div>
  );
}
