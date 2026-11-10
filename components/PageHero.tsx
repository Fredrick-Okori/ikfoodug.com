import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Inner-page hero in the ikfoodusa.com style: dark field with a lime glow, an oversized title
 * that rises line by line, and a wide photo that opens out of a clipped frame.
 * The motion is wired up by SmoothScroll via the data-hero-* attributes.
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
    <section data-hero aria-labelledby="page-title" className="relative isolate overflow-hidden bg-forest-950 text-cream">
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10">
        <div data-hero-glow className="absolute -right-[25%] -top-[40%] h-[80vmax] w-[80vmax]">
          <div data-hero-glow-main className="h-full w-full rounded-full bg-[radial-gradient(closest-side,rgba(156,232,0,0.24),rgba(156,232,0,0.08)_55%,transparent)]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-[calc(88px+3.5rem)] sm:px-8 sm:pt-[calc(6rem+3.5rem)] lg:px-12 lg:pb-16 lg:pt-[calc(106px+6rem)]">
        <div data-hero-copy className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-14">
          <h1 id="page-title" data-hero-title data-no-reveal className="h-display text-[clamp(3rem,8.4vw,8rem)]">
            {title}
          </h1>
          {(children || aside) && (
            <div className="lg:pb-3">
              {children && (
                <div data-hero-foot className="max-w-md text-lg leading-relaxed text-parchment/70 [&_strong]:font-bold [&_strong]:text-cream">
                  {children}
                </div>
              )}
              {aside && <div data-hero-foot className="mt-8">{aside}</div>}
            </div>
          )}
        </div>

        {image && (
          <div data-hero-media className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-forest-900 sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]">
            <Image src={image} alt={alt} fill priority sizes="(min-width: 1280px) 1200px, 100vw" className={`scale-[1.08] ${imageClassName}`} />
          </div>
        )}
      </div>
    </section>
  );
}
