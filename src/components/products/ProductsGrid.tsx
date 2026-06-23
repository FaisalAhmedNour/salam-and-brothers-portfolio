"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Type representing a single product card item.
 */
interface ProductCardItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  imagePath: string;
  linkHref: string;
}

// Product configuration matching the live site
const PRODUCTS_LIST_DATA: ProductCardItem[] = [
  {
    id: "products-distribution",
    titleKey: "productsGrid.distributionTitle",
    descriptionKey: "productsGrid.distributionDesc",
    imagePath: "/images/power-transformer.png",
    linkHref: "/products/distribution-transformers",
  },
  {
    id: "products-power",
    titleKey: "productsGrid.powerTitle",
    descriptionKey: "productsGrid.powerDesc",
    imagePath: "/images/Distribution-Transformers-1.png",
    linkHref: "/products/power-transformers",
  },
  {
    id: "products-special",
    titleKey: "productsGrid.specialTitle",
    descriptionKey: "productsGrid.specialDesc",
    imagePath: "/images/special-type.png",
    linkHref: "/products/special-type-transformers",
  },
  {
    id: "products-dry",
    titleKey: "productsGrid.dryTitle",
    descriptionKey: "productsGrid.dryDesc",
    imagePath: "/images/Transformer-4-768x768.jpg",
    linkHref: "/products/dry-type-transformers",
  },
];

/**
 * Arrow icon component pointing to the right.
 * Renders inline vector graphic.
 */
function ArrowRightSmallIcon() {
  return (
    <svg viewBox="0 0 448 512" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
      <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
    </svg>
  );
}

/**
 * ProductsGrid component.
 * Renders a responsive 4-column section of cards highlighting
 */
export default function ProductsGrid() {
  const { t } = useLanguage();

  return (
    <section id="products" className="bg-white py-16 px-6 md:py-24 font-arone">
      <div className="mx-auto max-w-310">

        {/* Responsive Grid layout for cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS_LIST_DATA.map((product) => (
            <article
              key={product.id}
              id={product.id}
              className="group flex flex-col justify-between border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg rounded-xl"
            >

              {/* Card Image element with scale hover */}
              <div>
                <a href={product.linkHref} className="relative block aspect-square w-full overflow-hidden bg-gray-50 rounded-lg">
                  <Image
                    src={product.imagePath}
                    alt={t(product.titleKey)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </a>

                {/* Title */}
                <h3 className="font-kanit mt-6 text-[21px] font-semibold text-black transition-colors duration-300 hover:text-brand-red">
                  <a href={product.linkHref}>{t(product.titleKey)}</a>
                </h3>

                {/* Body paragraph */}
                <p className="mt-4 text-[14.5px] leading-relaxed text-gray-600">
                  {t(product.descriptionKey)}
                </p>
              </div>

              {/* Call to action "Learn More" link */}
              <div className="mt-6 border-t border-gray-100 pt-4">
                <a
                  href={product.linkHref}
                  className="inline-flex items-center gap-2 text-[15px] font-bold text-gray-900 transition-colors duration-200 hover:text-brand-red"
                >
                  <span>{t("productsGrid.learnMore")}</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRightSmallIcon />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
