import { Localized } from "@/components/language";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articles, readingTime } from "@/data/journal";
import { PageIntro, TextLink } from "@/components/ui";
export const metadata: Metadata = {
  title: "The journal",
  description:
    "Five stories on coffee, everyday rituals, and the beauty of thoughtful spaces.",
};
export default function Journal() {
  const first = articles[0];
  return (
    <Localized><main id="main">
      <PageIntro
        label="The VELUNE journal"
        title={
          <>
            A few things
            <br />
            worth <em>pausing for.</em>
          </>
        }
        description="Notes on coffee, considered spaces, and the quiet beauty of the everyday."
      />
      <section className="container journal-feature">
        <Link prefetch={false} href={`/journal/${first.slug}`} className="journal-feature-image">
          <img
            src={`/images/${first.image}.webp`}
            alt="Hand-poured coffee in a considered brewing setup"
            width="1100"
            height="733"
            fetchPriority="high"
          />
        </Link>
        <div>
          <p className="eyebrow">
            Editor's note · {readingTime(first)} min read
          </p>
          <h2>
            <Link prefetch={false} href={`/journal/${first.slug}`}>{first.title}</Link>
          </h2>
          <p>{first.intro}</p>
          <TextLink href={`/journal/${first.slug}`}>Take a moment</TextLink>
        </div>
      </section>
      <section className="container journal-index">
        <p className="eyebrow">The reading room</p>
        <div className="journal-index-grid">
          {articles.slice(1).map((a, i) => (
            <article key={a.slug}>
              <Link prefetch={false} href={`/journal/${a.slug}`} className="journal-image">
                <img
                  src={`/images/${a.image}.webp`}
                  alt={a.title}
                  width="1100"
                  height="733"
                  loading="lazy"
                />
                <span className="round-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
              <div className="article-meta">
                <span>{a.category}</span>
                <span>{readingTime(a)} MIN READ</span>
              </div>
              <h2>
                <Link prefetch={false} href={`/journal/${a.slug}`}>{a.title}</Link>
              </h2>
              <p>{a.intro}</p>
              <TextLink href={`/journal/${a.slug}`}>Read the story</TextLink>
            </article>
          ))}
        </div>
      </section>
    </main></Localized>
  );
}
