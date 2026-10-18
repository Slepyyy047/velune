"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language";
export function BrandMotion() {
  const path = usePathname();
  const { language } = useLanguage();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let alive = true;
    let cleanup = () => {};
    const setup = async () => {
      cleanup();
      if (preference.matches || !document.querySelector("[data-reveal], [data-bean], .story-experience, .visit-details, .article-body > section, .gallery-grid")) return;
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (!alive || preference.matches) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // Everything is visible before enhancement. Start only when entering view,
        // so delayed JS, a missed observer, or quick reverse scrolling cannot hide content.
        const elements = gsap.utils.toArray<HTMLElement>("[data-reveal] > div, [data-reveal] > figure, .story-experience > div, .visit-details > div, .article-body > section, .gallery-grid > button");
        elements.forEach((el, i) => {
          ScrollTrigger.create({ trigger: el, start: "top 96%", once: true, onEnter: () => {
            gsap.fromTo(el, { y: 30, opacity: 0.7 }, { y: 0, opacity: 1, duration: 0.85, delay: (i % 2) * 0.06, ease: "power3.out", clearProps: "transform,opacity" });
          }});
        });
        gsap.utils.toArray<HTMLElement>(".space-large img, .space-small img").forEach(img => {
          gsap.fromTo(img, { scale: 1.035, yPercent: -1 }, { scale: 1.01, yPercent: 1, ease: "none", scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 } });
        });
        gsap.utils.toArray<HTMLElement>(".cafe-decoration").forEach((el, i) => {
          gsap.fromTo(el, { y: 16, rotation: i ? -10 : -8 }, { y: -16, rotation: i ? 0 : 6, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: .8 } });
        });
        ScrollTrigger.refresh();
      });
      cleanup = () => ctx.revert();
    };
    void setup();
    preference.addEventListener("change", setup);
    return () => { alive = false; cleanup(); preference.removeEventListener("change", setup); };
  }, [path, language]);
  useEffect(() => {
    const fine = matchMedia("(pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches) return;
    const move = (e: PointerEvent) => {
      if (reduced.matches) return;
      if (!(e.target instanceof Element)) return;
      const target = e.target.closest<HTMLElement>(".magnetic");
      if (target) { const r = target.getBoundingClientRect(); target.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.045}px ${(e.clientY - r.top - r.height / 2) * 0.06}px`; }
    };
    const out = (e: PointerEvent) => { if (!(e.target instanceof Element)) return; const el = e.target.closest<HTMLElement>(".magnetic"); if (el) el.style.translate = "0 0"; };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", out);
    return () => { document.removeEventListener("pointermove", move); document.removeEventListener("pointerout", out); };
  }, []);
  return <div key={path} className="route-wash" aria-hidden="true"/>;
}
