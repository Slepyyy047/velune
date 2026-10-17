"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Lightweight illustration: progress is a pure function of scroll, not a simulation. */
export function CoffeeBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const draw = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      node.style.setProperty("--journey-progress", String(progress));
      const stage = Math.min(3, Math.floor(progress * 4));
      node.dataset.stage = String(stage);
      node.querySelectorAll<SVGGElement>("[data-journey-stage]").forEach((group, i) => {
        const local = Math.max(0, Math.min(1, progress * 4 - i));
        group.style.opacity = i === stage ? "1" : "0";
        group.style.transform = reduced.matches ? "none" : `translateY(${(0.5 - local) * 34}px) rotate(${(local - 0.5) * 5}deg)`;
      });
      node.querySelectorAll<SVGElement>("[data-falling-bean]").forEach((bean, i) => {
        bean.style.transform = reduced.matches ? "none" : `translate(${Math.sin(i * 2.7) * 12}px,${((progress * 3 + i * 0.13) % 1) * 150 - 75}px) rotate(${progress * 120 + i * 27}deg)`;
      });
      node.querySelectorAll<SVGPathElement>("[data-coffee-flow]").forEach(flow => {
        flow.style.strokeDashoffset = String(reduced.matches ? 0 : -progress * 240);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); reduced.removeEventListener("change", schedule); };
  }, [path]);
  return <div className="coffee-background" ref={ref} aria-hidden="true" data-stage="0">
    <svg viewBox="0 0 600 700" fill="none" stroke="currentColor" strokeWidth="1.5">
      <g data-journey-stage="0">
        {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${110 + (i % 3) * 150} ${210 + Math.floor(i / 3) * 150})`}>
          <g data-falling-bean><ellipse rx="31" ry="48" transform="rotate(25)"/><path d="M18-39C-25-14 25 12-18 39"/></g>
        </g>)}
        <path d="M80 560Q300 490 520 560" strokeDasharray="2 10"/>
      </g>
      <g data-journey-stage="1" style={{ opacity: 0 }}>
        <path d="M188 165H412L375 320H225Z M215 150H385 M228 320H372V480H228Z M258 480V520H430V545H180V520H230 M372 365H415V415H365"/>
        {[0, 1, 2].map(i => <g transform={`translate(${265 + i * 35} 240)`} key={i}><g data-falling-bean><ellipse rx="9" ry="15"/><path d="M3-12L-3 12"/></g></g>)}
        <circle cx="300" cy="390" r="43"/><circle cx="300" cy="390" r="20"/><path d="M300 346V370M344 390H320M300 434V410M256 390H280"/>
        <path d="M395 418V488M405 418V485" strokeDasharray="2 9" data-coffee-flow/>
      </g>
      <g data-journey-stage="2" style={{ opacity: 0 }}>
        <path d="M190 190H410L335 360H265Z M190 190L265 360M410 190L335 360 M216 225H384 M243 288H357 M240 425H360L348 510Q300 540 252 510Z M360 440H380Q410 470 356 485 M230 535H370"/>
        <path d="M295 360V420M305 360V420" strokeDasharray="8 6" data-coffee-flow/>
        <path d="M360 110Q370 135 330 155L300 170"/>
      </g>
      <g data-journey-stage="3" style={{ opacity: 0 }}>
        <ellipse cx="300" cy="380" rx="145" ry="145"/><ellipse cx="300" cy="380" rx="118" ry="118"/><ellipse cx="300" cy="380" rx="100" ry="100"/>
        <path d="M443 345H480Q515 380 480 415H443 M290 415Q240 385 266 365Q282 355 300 375Q322 350 340 372Q360 398 290 415Z M260 180Q235 150 260 120 M300 190Q275 145 305 100 M340 180Q320 150 345 125"/>
      </g>
    </svg>
  </div>;
}
