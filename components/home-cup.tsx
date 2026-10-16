"use client";
import Link from "next/link";
export function HomeCupAccent() {
  return (
    <Link prefetch={false}
      className="hero-cup-accent"
      href="/experience"
      aria-label="Explore the Sage Edition cup in 3D"
    >
      <img
        src="/images/cup.webp"
        alt="Sage Edition takeaway cup"
        width="1200"
        height="800"
      />
      <span>
        SAGE EDITION <span aria-hidden="true">↗</span>
      </span>
    </Link>
  );
}
