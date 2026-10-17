"use client";
import { Localized } from "@/components/language";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Localized><p className={`eyebrow ${className}`}>{children}</p></Localized>;
}
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (<Localized>
    <Link prefetch={false} className={`text-link ${light ? "light" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  </Localized>);
}
export function ButtonLink({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (<Localized>
    <Link prefetch={false} className={`button magnetic ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  </Localized>);
}
export function SectionHeading({
  label,
  title,
  href,
  link,
}: {
  label: string;
  title: ReactNode;
  href?: string;
  link?: string;
}) {
  return (<Localized>
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {href && <TextLink href={href}>{link || "Explore more"}</TextLink>}
    </div>
  </Localized>);
}
export function PageIntro({
  label,
  title,
  description,
}: {
  label: string;
  title: ReactNode;
  description: string;
}) {
  return (<Localized>
    <div className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </Localized>);
}
export function VisitInvitation() {
  return (<Localized>
    <section className="visit-invitation container" data-reveal>
      <div>
        <Eyebrow>An imagined place. A familiar feeling.</Eyebrow>
        <h2>
          Your little pause
          <br />
          in <em>Osaka.</em>
        </h2>
      </div>
      <div>
        <p>
          A sunlit corner, a warm cup, a moment that belongs to you. Step inside
          the VELUNE concept.
        </p>
        <ButtonLink href="/visit">Discover the space</ButtonLink>
      </div>
    </section>
  </Localized>);
}
export function ArrowLabel({ children }: { children: ReactNode }) {
  return (<Localized>
    <span className="arrow-label">
      {children}
      <ArrowRight size={16} />
    </span>
  </Localized>);
}
