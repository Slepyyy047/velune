import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Localized } from "@/components/language";
import type { ReactNode } from "react";

export function PhotoPanel({ image, alt, label, title, children, href, link, className = "", priority = false, heading = "h2" }: {
  image: string; alt: string; label: string; title: ReactNode; children?: ReactNode; href?: string; link?: string; className?: string; priority?: boolean; heading?: "h1" | "h2";
}) {
  const Heading = heading;
  const mobileImage = image === "hero" ? "hero-mobile" : image === "espresso" ? "espresso-mobile" : image === "coffee-croissant" ? "coffee-croissant-mobile" : null;
  return <Localized>{priority && <>
    <link rel="preload" as="image" href={`/images/${mobileImage || image}.webp`} media="(max-width:600px)" fetchPriority="high"/>
    <link rel="preload" as="image" href={`/images/${image}.webp`} media="(min-width:601px)" fetchPriority="high"/>
  </>}<section className={`photo-panel ${className}`}>
    <picture>{mobileImage && <source media="(max-width:600px)" srcSet={`/images/${mobileImage}.webp`}/>}<img className="photo-panel-image" src={`/images/${image}.webp`} alt={alt} width={image === "hero" ? 1536 : 1100} height={image === "hero" ? 1024 : 733} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"}/></picture>
    <div className="photo-panel-shade"/>
    <div className="photo-panel-copy"><p className="eyebrow">{label}</p><Heading>{title}</Heading>{children && <p>{children}</p>}{href && <Link className="photo-panel-link" href={href}>{link}<ArrowUpRight size={19}/></Link>}</div>
  </section></Localized>;
}
