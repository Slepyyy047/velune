"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import styles from "./liquid-wordmark.module.css";

/** HTML lettering, with a short-lived SVG refraction only while using a mouse. */
export function LiquidWordmark() {
  const heading = useRef<HTMLHeadingElement>(null);
  const noise = useRef<SVGFETurbulenceElement>(null);
  const displacement = useRef<SVGFEDisplacementMapElement>(null);
  const blur = useRef<SVGFEGaussianBlurElement>(null);
  const filterId = `velune-water-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    const element = heading.current;
    if (!element) return;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let phase = 0;
    const current = { strength: 0, x: 0, y: 0 };
    const target = { strength: 0, x: 0, y: 0 };
    const enabled = () => pointer.matches && !reduced.matches && !document.hidden;

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      current.strength = target.strength = 0;
      element!.dataset.waterActive = "false";
      displacement.current?.setAttribute("scale", "0");
      blur.current?.setAttribute("stdDeviation", "0");
      element!.style.setProperty("--water-echo", "0");
    }

    function animate(time: number) {
      if (!enabled()) { reset(); return; }
      const delta = lastTime ? Math.min(time - lastTime, 40) : 16;
      lastTime = time;
      const ease = 1 - Math.exp(-delta / (target.strength ? 125 : 185));
      current.strength += (target.strength - current.strength) * ease;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      const strength = current.strength;
      phase += delta * 0.0011;
      noise.current?.setAttribute("baseFrequency", `${(0.006 + Math.sin(phase) * 0.0012 + current.x * 0.0008).toFixed(5)} ${(0.021 + Math.cos(phase * 0.8) * 0.0025).toFixed(5)}`);
      displacement.current?.setAttribute("scale", (strength * 26).toFixed(2));
      blur.current?.setAttribute("stdDeviation", `${(strength * 0.9).toFixed(2)} ${(strength * 0.45).toFixed(2)}`);
      element!.style.setProperty("--water-x", `${50 + current.x * 50}%`);
      element!.style.setProperty("--water-y", `${50 + current.y * 50}%`);
      element!.style.setProperty("--water-shift", `${strength * (5 + current.x * 4)}px`);
      element!.style.setProperty("--water-lift", `${strength * 3}px`);
      element!.style.setProperty("--water-echo", (strength * 0.52).toFixed(3));
      if (!target.strength && strength < 0.002) { reset(); return; }
      frame = requestAnimationFrame(animate);
    }

    function start() {
      if (!enabled() || frame) return;
      element!.dataset.waterActive = "true";
      lastTime = 0;
      frame = requestAnimationFrame(animate);
    }

    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || !enabled()) return;
      const bounds = element!.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      target.y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      target.strength = 1;
      start();
    }
    const leave = () => { target.strength = 0; };
    const preferences = () => { if (!enabled()) reset(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) reset();
    });
    observer.observe(element);
    element.addEventListener("pointerenter", move);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", leave);
    element.addEventListener("pointercancel", reset);
    pointer.addEventListener("change", preferences);
    reduced.addEventListener("change", preferences);
    document.addEventListener("visibilitychange", preferences);
    window.addEventListener("blur", reset);
    return () => {
      reset();
      observer.disconnect();
      element.removeEventListener("pointerenter", move);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("pointercancel", reset);
      pointer.removeEventListener("change", preferences);
      reduced.removeEventListener("change", preferences);
      document.removeEventListener("visibilitychange", preferences);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return <h1 ref={heading} className={`hero-wordmark ${styles.root}`} data-no-letters data-wordmark="velune." data-water-active="false" style={{ "--water-filter": `url("#${filterId}")` } as CSSProperties}>
    <span className={styles.ink}>velune.</span>
    <svg className={styles.definitions} width="0" height="0" aria-hidden="true" focusable="false">
      <defs><filter id={filterId} x="-25%" y="-50%" width="150%" height="200%" colorInterpolationFilters="sRGB">
        <feTurbulence ref={noise} type="fractalNoise" baseFrequency="0.006 0.021" numOctaves="1" seed="7" result="water"/>
        <feDisplacementMap ref={displacement} in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G" result="refraction"/>
        <feGaussianBlur ref={blur} in="refraction" stdDeviation="0"/>
      </filter></defs>
    </svg>
  </h1>;
}
