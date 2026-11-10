import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Inner-page hero: a light beige field (with the site's dotted-map background) that pairs an
 * oversized title and intro on the left with a tall framed photo on the right. On small screens
 * the photo sits under the text. Pages without a photo get a full-width text hero.
 * The intro motion (title lines rising, photo opening out of a clipped frame) is wired up by
 * SmoothScroll via the data-hero-* attributes; the floating header sits over the top padding.
 *
 * Pass the intro copy as children (so localize() can rewrite its spelling for US visitors);
 * `aside` renders under the intro, e.g. jump links.
 */
export default function PageHero({
  title,
  children,
  aside,
  image,
  alt = "",
  imageClassName = "object-cover",
}: {
  title: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  image?: string;
  alt?: string;
  imageClassName?: string;
}) {
  return (
    <section data-hero aria-labelledby="page-title" className="relative isolate overflow-hidden bg-parchment text-forest-950">
      <div
        className={`mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-[calc(88px+3rem)] sm:px-8 sm:pt-[calc(6rem+3rem)] lg:px-12 lg:pb-24 lg:pt-[calc(106px+4.5rem)] ${
          image ? "lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16" : ""
        }`}
      >
        <div data-hero-copy className={image ? "" : "max-w-5xl"}>
          <h1 id="page-title" data-hero-title data-no-reveal className="h-display text-[clamp(2.75rem,6.4vw,6.5rem)]">
            {title}
          </h1>
          {children && (
            <div
              data-hero-foot
              className="mt-8 max-w-xl text-lg leading-relaxed text-forest-900/75 sm:text-xl [&_strong]:font-bold [&_strong]:text-forest-950"
            >
              {children}
            </div>
          )}
          {aside && (
            <div data-hero-foot className="mt-10">
              {aside}
            </div>
          )}
        </div>

        {image && (
          <div
            data-hero-media
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-[#ebdfc0] shadow-[0_30px_60px_-30px_rgba(25,29,31,0.45)] sm:aspect-[16/10] lg:aspect-[4/5] lg:max-h-[72svh] lg:justify-self-end"
          >
            <Image
              src={image}
              alt={alt}
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className={`scale-[1.08] ${imageClassName}`}
            />
          </div>
        )}
      </div>
    </section>
  );
}
