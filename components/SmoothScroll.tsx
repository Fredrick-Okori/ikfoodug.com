"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Site-wide smooth scrolling (Lenis) driven by GSAP's ticker, so every ScrollTrigger stays in
 * sync with the smoothed scroll position — the same setup as ikfoodusa.com.
 *
 * Pages stay server components: they only mark elements with data attributes and this
 * component wires up the motion after each navigation.
 *
 *   data-hero ............ intro timeline (title lines, clipped photo, ruled facts)
 *   data-split ........... heading rises line by line out of a mask
 *   data-reveal / h2 ..... fade up as it scrolls in (add data-no-reveal to opt out)
 *   data-card ............ batched card entrance
 *   data-clip ............ image opens from the bottom
 *   data-parallax ........ image drifts inside its frame
 *   data-rule ............ drawn rule ([data-rule-line]) with its text ([data-rule-text]) following
 *   data-scrub-words ..... paragraph lights up word by word ([data-ember] words stay orange)
 *   data-marquee ......... looping track ([data-marquee-track]) that reacts to scroll velocity
 *   data-slide-x ......... oversized line slides across as its section passes
 *   data-process ......... steps ([data-process-step]) light up along a line ([data-process-line])
 *   data-count ........... number counts up
 *   data-cat-list ........ photo ([data-cat-preview]) follows the cursor over rows ([data-cat-row])
 *   data-footer-mark ..... giant wordmark rises with the footer
 *
 * Everything is skipped for visitors who prefer reduced motion.
 */
let lenis: Lenis | null = null;

/** Pause/resume smooth scrolling, e.g. while a menu or dialog is open. */
export function setSmoothScrollPaused(paused: boolean) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

/** Burnt orange, matching ember-500. */
const EMBER = "#cc5500";

function splitLines(el: Element) {
  const split = SplitText.create(el, { type: "lines", mask: "lines" });
  gsap.set(split.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
  return split;
}

function heroIntro(hero: HTMLElement, wide: boolean) {
  const title = hero.querySelector("[data-hero-title]");
  const q = gsap.utils.selector(hero);
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  if (title) {
    gsap.set(title, { autoAlpha: 1 });
    tl.fromTo(splitLines(title).lines, { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.11 }, 0.1);
  }
  tl.fromTo(
    q("[data-hero-media]"),
    { clipPath: "inset(18% 22% 18% 22% round 32px)" },
    // The home hero photo is a full-bleed background, so it opens out to square edges; inner-page
    // hero photos keep their rounded corners from their own border-radius.
    { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.7, ease: "expo.inOut" },
    0
  )
    .fromTo(q("[data-hero-media] img"), { scale: 1.4 }, { scale: 1.08, duration: 2.2 }, 0)
    .fromTo(q("[data-hero-foot]"), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, 0.7)
    .fromTo(q("[data-hero-rule-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: "expo.inOut", stagger: 0.12 }, 0.8)
    .fromTo(q("[data-hero-fact]"), { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.1 }, 1.1)
    .fromTo(q("[data-hero-glow]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.6, ease: "power2.out", stagger: 0.2 }, 0.4)
    .fromTo(q("[data-hero-halo]"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 2.2, ease: "power2.out" }, 1);

  // The glow breathes slowly so the dark never feels flat.
  gsap.to(q("[data-hero-glow-main]"), { scale: 1.15, xPercent: -6, duration: 7, ease: "sine.inOut", repeat: -1, yoyo: true });
  gsap.to(q("[data-hero-glow-low]"), { xPercent: 18, yPercent: -10, duration: 9, ease: "sine.inOut", repeat: -1, yoyo: true });

  // Background carousel: slides crossfade on a loop (no controls). Each slide also breathes with
  // a slow zoom on its wrapper, so it never feels static while it's on screen.
  const slides = q("[data-hero-slide]");
  if (slides.length > 1) {
    const hold = 5;
    const fade = 1.6;
    gsap.set(slides, { autoAlpha: (i: number) => (i === 0 ? 1 : 0) });
    const loop = gsap.timeline({ repeat: -1, delay: 1.2 });
    slides.forEach((slide, i) => {
      const next = slides[(i + 1) % slides.length];
      const at = i * (hold + fade) + hold;
      loop
        .to(slide, { autoAlpha: 0, duration: fade, ease: "power2.inOut" }, at)
        .to(next, { autoAlpha: 1, duration: fade, ease: "power2.inOut" }, at);
    });
    gsap.fromTo(slides, { scale: 1 }, { scale: 1.06, duration: hold + fade * 2, ease: "sine.inOut", repeat: -1, yoyo: true });
  }

  // Scrolling away: the photo drifts in its frame and the copy lifts off.
  const away = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
  gsap.to(q("[data-hero-media] img"), { yPercent: 10, ease: "none", scrollTrigger: away });
  gsap.to(q("[data-hero-copy]"), { yPercent: wide ? -18 : -8, ease: "none", scrollTrigger: away });

  return () => {};
}

function scrollAnimations(root: HTMLElement) {
  const all = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(root.querySelectorAll(sel));

  // Headings rise line by line out of a mask.
  all("[data-split]").forEach((el) => {
    gsap.fromTo(splitLines(el).lines, { yPercent: 105 }, {
      yPercent: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });

  // Plain fade-up for other headings and anything marked data-reveal.
  const reveals = all("h2:not([data-no-reveal]):not([data-split]), [data-reveal]");
  if (reveals.length) {
    gsap.set(reveals, { autoAlpha: 0, y: 48 });
    ScrollTrigger.batch(reveals, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.08 }),
    });
  }

  // Cards arrive in a staggered wave.
  const cards = all("[data-card]");
  if (cards.length) {
    gsap.set(cards, { autoAlpha: 0, y: 70, rotate: 1.5 });
    ScrollTrigger.batch(cards, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger: 0.09 }),
    });
  }

  // Images open from the bottom, then drift inside their frame.
  all("[data-clip]").forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 82%" } }
    );
  });
  all("[data-parallax]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;
    gsap.fromTo(img, { yPercent: -8, scale: 1.18 }, {
      yPercent: 8,
      scale: 1.18,
      ease: "none",
      scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // Drawn rules with their row contents following.
  all("[data-rule]").forEach((row) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%" } });
    const line = row.querySelector("[data-rule-line]");
    if (line) tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.inOut" });
    const text = row.querySelectorAll("[data-rule-text]");
    if (text.length) {
      tl.fromTo(text, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" }, 0.3);
    }
  });

  // Statement lights up word by word: faint → burnt orange → settles to its own colour.
  all("[data-scrub-words]").forEach((el) => {
    const words = SplitText.create(el, { type: "words" }).words;
    const base = getComputedStyle(el).color;
    const settle = (_: number, word: Element) => (word.closest("[data-ember]") ? EMBER : base);
    gsap
      .timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } })
      .fromTo(words, { opacity: 0.15, color: base }, { opacity: 1, color: EMBER, duration: 0.2, stagger: 0.08 }, 0)
      .to(words, { color: settle, duration: 0.35, stagger: 0.08 }, 0.3);
  });

  // Marquee loops on its own, then speeds up and flips direction with the scroll.
  all("[data-marquee]").forEach((band) => {
    const track = band.querySelector("[data-marquee-track]");
    if (!track) return;
    const loop = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    // Start deep into the loop so playing it backwards never hits the start and stalls.
    loop.totalTime(loop.duration() * 1000);
    ScrollTrigger.create({
      trigger: band,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const boost = Math.min(Math.abs(self.getVelocity()) / 220, 5);
        gsap.to(loop, { timeScale: self.direction * (1 + boost), duration: 0.4, overwrite: true });
        gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.4 });
      },
    });
  });

  // Oversized line slides across as its section passes.
  all("[data-slide-x]").forEach((el) => {
    gsap.fromTo(el, { xPercent: 8 }, {
      xPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  // Process steps light up one after another along a drawn line.
  all("[data-process]").forEach((block) => {
    const scrub = { trigger: block, start: "top 80%", end: "bottom 55%", scrub: true };
    gsap.fromTo(block.querySelectorAll("[data-process-step]"), { opacity: 0.18 }, { opacity: 1, stagger: 0.5, ease: "none", scrollTrigger: scrub });
    const line = block.querySelector("[data-process-line]");
    if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: scrub });
  });

  // Numbers count up ("3,000+" → keeps its prefix, separators and suffix).
  const restore: (() => void)[] = [];
  all("[data-count]").forEach((el) => {
    const original = el.textContent ?? "";
    restore.push(() => { el.textContent = original; });
    const match = original.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ""));
    const decimals = raw.split(".")[1]?.length ?? 0;
    const comma = raw.includes(",");
    const state = { v: 0 };
    const render = () => {
      const n = decimals ? state.v.toFixed(decimals) : Math.round(state.v).toString();
      el.textContent = prefix + (comma ? Number(n).toLocaleString("en-US") : n) + suffix;
    };
    render();
    gsap.to(state, { v: target, duration: 2, ease: "power3.out", onUpdate: render, scrollTrigger: { trigger: el, start: "top 90%" } });
  });
  return () => restore.forEach((fn) => fn());
}

/** Index rows: a photo follows the cursor and swaps to the hovered row's image. */
function cursorPreview(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>("[data-cat-list]").forEach((list) => {
    const preview = list.querySelector<HTMLElement>("[data-cat-preview]");
    const img = preview?.querySelector("img");
    if (!preview || !img) return;

    gsap.set(preview, { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.6, rotate: -6 });
    const moveX = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
    const moveY = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });

    const onMove = (event: PointerEvent) => {
      const box = list.getBoundingClientRect();
      moveX(event.clientX - box.left);
      moveY(event.clientY - box.top);
      const row = (event.target as HTMLElement).closest<HTMLElement>("[data-cat-row]");
      if (row?.dataset.image && img.getAttribute("src") !== row.dataset.image) {
        img.src = row.dataset.image;
        gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 0.6, ease: "power3.out" });
      }
    };
    const onEnter = () => gsap.to(preview, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "power3.out" });
    const onLeave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.6, rotate: -6, duration: 0.4, ease: "power3.in" });

    list.addEventListener("pointermove", onMove);
    list.addEventListener("pointerenter", onEnter);
    list.addEventListener("pointerleave", onLeave);
    cleanups.push(() => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
      list.removeEventListener("pointerleave", onLeave);
    });
  });
  return () => cleanups.forEach((fn) => fn());
}

export default function SmoothScroll() {
  const pathname = usePathname();

  // Create Lenis once and hand its frame loop to GSAP.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    // Heroes share one intro; pages without every optional piece (halo, facts) shouldn't warn.
    gsap.config({ nullTargetWarn: false });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      lerp: 0.085, // lower = floatier, higher = snappier
      smoothWheel: true,
      anchors: { offset: -24 }, // smooth-scroll "#section" links
      stopInertiaOnNavigate: true,
      autoRaf: false,
    });
    lenis = instance;

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Late images and fonts can shift layout; re-measure once everything has loaded.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      if (lenis === instance) lenis = null;
    };
  }, []);

  // Per page: start at the top, then set up the page's animations.
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });

    const media = gsap.matchMedia();
    let frame = 0;
    let cancelled = false;

    // Wait for the web font so headings split at their real line breaks.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          wide: "(min-width: 1024px)",
          hover: "(hover: hover) and (min-width: 1024px)",
        },
        (context) => {
          const { motion, wide, hover } = context.conditions as { motion: boolean; wide: boolean; hover: boolean };
          if (!motion) return;
          // Wait a frame so the new page is in the DOM; context.add() records the triggers
          // so they are reverted when the page changes.
          let cleanup = () => {};
          frame = requestAnimationFrame(() =>
            context.add(() => {
              const main = document.getElementById("main-content");
              const hero = main?.querySelector<HTMLElement>("[data-hero]");
              const offHero = hero ? heroIntro(hero, wide) : () => {};
              const offScroll = main ? scrollAnimations(main) : () => {};
              const offPreview = main && hover ? cursorPreview(main) : () => {};

              const mark = document.querySelector("[data-footer-mark]");
              if (mark) {
                gsap.fromTo(mark, { yPercent: 45 }, {
                  yPercent: 0,
                  ease: "none",
                  scrollTrigger: { trigger: mark.closest("footer"), start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
                });
              }
              ScrollTrigger.refresh();
              cleanup = () => {
                offHero();
                offPreview();
                offScroll();
              };
            })
          );
          return () => cleanup();
        }
      );
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, [pathname]);

  return null;
}
