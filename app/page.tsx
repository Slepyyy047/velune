import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import {
  Eyebrow,
  TextLink,
  ButtonLink,
  SectionHeading,
  VisitInvitation,
} from "@/components/ui";
import { articles, readingTime } from "@/data/journal";
import { HomeCupAccent } from "@/components/home-cup";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <picture>
          <source media="(max-width:600px)" srcSet="/images/hero-mobile.webp" />
          <img
            className="hero-image"
            src="/images/hero.webp"
            alt="VELUNE concept interior with a pale stone coffee counter, sculptural oak stools, and morning light"
            width="1536"
            height="1024"
            fetchPriority="high"
          />
        </picture>
        <div className="hero-shade" />
        <div className="hero-top">
          <span>SPECIALTY COFFEE & QUIET MOMENTS</span>
          <span>OSAKA, JAPAN · A CONCEPT</span>
        </div>
        <div className="hero-brand">
          <h1 className="hero-wordmark">velune.</h1>
          <p>A softer kind of ritual.</p>
        </div>
        <div className="hero-bottom">
          <p>
            Thoughtfully crafted coffee.
            <br />
            Beautifully unhurried moments.
          </p>
          <ButtonLink href="/menu">Find your daily ritual</ButtonLink>
          <a
            className="hero-scroll"
            href="#introduction"
            aria-label="Scroll to slow down — explore VELUNE"
          >
            <span>SCROLL TO SLOW DOWN</span>
            <ArrowDown size={16} />
          </a>
        </div>
        <HomeCupAccent />
      </section>
      <section id="introduction" className="intro container" data-reveal>
        <Eyebrow>Good coffee. A little more presence.</Eyebrow>
        <div>
          <h2>
            Some things are better
            <br />
            taken <em>slowly.</em>
          </h2>
          <div className="intro-copy">
            <p>
              A first sip. A patch of sunlight. A conversation with nowhere to
              be.
            </p>
            <p>
              VELUNE is an imagined coffee shop in Osaka, shaped around the
              simple pleasure of being here. Considered coffee, thoughtful
              spaces, and a little room for the everyday.
            </p>
            <TextLink href="/story">Get to know us</TextLink>
          </div>
        </div>
        <span className="intro-flower" aria-hidden="true">
          ✳
        </span>
      </section>
      <section className="signature-section container" data-reveal>
        <SectionHeading
          label="The coffee collection"
          title={
            <>
              Find your <em>usual.</em>
            </>
          }
          href="/menu"
          link="Explore the menu"
        />
        <div className="signature-grid">
          {[
            {
              name: "Velune Latte",
              note: "Soft, silky, quietly exceptional.",
              image: "latte",
              id: "latte",
              label: "THE EVERYDAY FAVORITE",
              price: "5.50",
            },
            {
              name: "Hand-Poured Coffee",
              note: "A little patience. A world of detail.",
              image: "filter",
              id: "pour-over",
              label: "SLOWLY, BY HAND",
              price: "6.50",
            },
            {
              name: "Lavender Cloud",
              note: "Floral notes. A softer finish.",
              image: "cup",
              id: "lavender-cloud",
              label: "A VELUNE SIGNATURE",
              price: "7.00",
            },
          ].map((d, i) => (
            <Link prefetch={false}
              className="signature-card"
              href={`/menu?drink=${d.id}`}
              key={d.id}
            >
              <div className={`signature-image image-tone-${i}`}>
                <img
                  src={`/images/${d.image}.webp`}
                  alt={
                    d.name === "Lavender Cloud"
                      ? "VELUNE Sage Edition takeaway cup"
                      : d.name
                  }
                  width="1100"
                  height="733"
                  loading="lazy"
                />
                <span className="product-label">{d.label}</span>
                <span className="round-arrow">
                  <Plus size={19} />
                </span>
              </div>
              <div className="product-title">
                <h3>{d.name}</h3>
                <span>${d.price}</span>
              </div>
              <p>{d.note}</p>
            </Link>
          ))}
        </div>
        <p className="menu-note">
          Made to be savored. Concept menu · USD pricing.
        </p>
      </section>
      <section className="space-feature" data-reveal>
        <div className="space-photo">
          <img
            src="/images/space.webp"
            alt="A quiet corner in the imagined café, with sage upholstery and soft light"
            width="1100"
            height="733"
            loading="lazy"
          />
          <span>01 / THE SPACE</span>
        </div>
        <div className="space-copy">
          <Eyebrow>A place to simply be</Eyebrow>
          <h2>
            Stay for
            <br />a <em>little longer.</em>
          </h2>
          <p>
            Warm stone. Soft green. Light that moves with the day. A space
            imagined for quiet company, unrushed conversations, and the
            occasional second cup.
          </p>
          <TextLink href="/visit">Step inside VELUNE</TextLink>
          <span className="space-coordinates">AN OSAKA STATE OF MIND</span>
        </div>
      </section>
      <section className="bean-story container" data-reveal>
        <div className="bean-visual">
          <img
            src="/images/beans.webp"
            alt="Roasted coffee beans with rich brown surfaces and natural variations"
            width="1100"
            height="733"
            loading="lazy"
          />
          <i className="bean bean-one" data-bean aria-hidden="true" />
          <i className="bean bean-two" data-bean aria-hidden="true" />
        </div>
        <div>
          <Eyebrow>Care, from the very beginning</Eyebrow>
          <h2>
            A small bean.
            <br />A <em>beautiful journey.</em>
          </h2>
          <p>
            Behind every cup is a sequence of small decisions. The roast. The
            grind. The way the water meets the coffee. Explore the care that
            turns a daily habit into something worth noticing.
          </p>
          <div className="inline-links">
            <TextLink href="/story">Our approach</TextLink>
            <TextLink href="/experience">Explore the experience</TextLink>
          </div>
        </div>
      </section>
      <section className="journal-home container" data-reveal>
        <SectionHeading
          label="The VELUNE journal"
          title={
            <>
              Notes on a <em>slower life.</em>
            </>
          }
          href="/journal"
          link="All stories"
        />
        <div className="journal-grid">
          {[articles[0], articles[3], articles[2]].map((a) => (
            <Link prefetch={false}
              className="journal-card"
              href={`/journal/${a.slug}`}
              key={a.slug}
            >
              <div className="journal-image">
                <img
                  src={`/images/${a.image}.webp`}
                  alt=""
                  width="1100"
                  height="733"
                  loading="lazy"
                />
                <span className="round-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="article-meta">
                <span>{a.category}</span>
                <span>{readingTime(a)} MIN READ</span>
              </div>
              <h3>{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <VisitInvitation />
    </main>
  );
}
