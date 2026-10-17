import { Localized } from "@/components/language";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { articles, readingTime } from "@/data/journal";
import { Eyebrow, TextLink } from "@/components/ui";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return { title: a?.title ?? "Story not found", description: a?.intro };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <Localized><main id="main">
      <article className="article-page">
        <header className="article-header container">
          <Link prefetch={false} className="back-link" href="/journal">
            <ArrowLeft size={16} />
            Back to the journal
          </Link>
          <Eyebrow>
            {article.category} · {readingTime(article)} minute read
          </Eyebrow>
          <h1>{article.title}</h1>
          <p>{article.intro}</p>
          <span className="article-byline">
            Words from the VELUNE concept journal
          </span>
        </header>
        <figure className="article-cover container">
          <img
            src={`/images/${article.image}.webp`}
            alt={`Concept photograph accompanying ${article.title}`}
            width="1100"
            height="733"
            fetchPriority="high"
          />
          <figcaption>
            VELUNE visual study · Generated concept imagery
          </figcaption>
        </figure>
        <div className="article-body">
          {article.sections.map((s, i) => (
            <section id={`section-${i + 1}`} key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
              {i === 1 && (
                <figure>
                  <img
                    src={`/images/${article.support}.webp`}
                    alt="A supporting study in coffee and everyday rituals"
                    width="1100"
                    height="733"
                    loading="lazy"
                  />
                </figure>
              )}
            </section>
          ))}
          <div className="article-end">
            <span className="wordmark">v.</span>
            <p>A softer kind of ritual.</p>
            <TextLink href="/menu">Find your next cup</TextLink>
          </div>
        </div>
      </article>
      <section className="related-articles container">
        <Eyebrow>A little more to read</Eyebrow>
        <div>
          {articles
            .filter((a) => a.slug !== slug)
            .slice(0, 2)
            .map((a) => (
              <Link prefetch={false} href={`/journal/${a.slug}`} key={a.slug}>
                <img
                  src={`/images/${a.image}.webp`}
                  alt=""
                  width="1100"
                  height="733"
                  loading="lazy"
                />
                <span>
                  <small>
                    {a.category} · {readingTime(a)} min read
                  </small>
                  <h2>{a.title}</h2>
                </span>
              </Link>
            ))}
        </div>
      </section>
    </main></Localized>
  );
}
