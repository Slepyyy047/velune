"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CoffeeDrawing } from "@/components/coffee-drawing";

/** Original line drawing; decorative and independent from page interaction. */
export function CoffeeBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const draw = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      node.style.transform = reduced.matches ? "none" : `translateY(${-progress * 80}px) rotate(${progress * 12}deg)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, [path]);
  return <div className="coffee-background" ref={ref} aria-hidden="true"><CoffeeDrawing kind="beans"/></div>;
}
