"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
export function BrandMotion() {
  const path = usePathname();
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.querySelector("[data-reveal], [data-bean]")) return;
    let alive = true;
    let cleanup = () => {};
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (!alive) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((el) =>
              gsap.from(el, {
                y: 24,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 94%", once: true },
              }),
            );
          gsap.utils
            .toArray<HTMLElement>("[data-bean]")
            .forEach((el, i) =>
              gsap.to(el, {
                y: -30 - i * 8,
                rotation: 20 + i * 10,
                ease: "none",
                scrollTrigger: {
                  trigger: ".bean-story",
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              }),
            );
        });
        cleanup = () => ctx.revert();
      },
    );
    return () => {
      alive = false;
      cleanup();
    };
  }, [path]);
  useEffect(() => {
    if (
      !matchMedia("(pointer:fine)").matches ||
      matchMedia("(prefers-reduced-motion:reduce)").matches
    )
      return;
    const move = (e: PointerEvent) => {
      const node = cursor.current;
      if (!node) return;
      node.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      node.dataset.active = String(
        !!(e.target as HTMLElement).closest("a,button"),
      );
      node.style.opacity = "1";
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        ".magnetic",
      );
      if (target) {
        const r = target.getBoundingClientRect();
        target.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.045}px ${(e.clientY - r.top - r.height / 2) * 0.06}px`;
      }
    };
    const out = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>(".magnetic");
      if (t) t.style.translate = "0 0";
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerout", out);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", out);
    };
  }, []);
  return (
    <>
      <div key={path} className="route-wash" aria-hidden="true" />
      <div ref={cursor} className="custom-cursor" aria-hidden="true" />
    </>
  );
}
