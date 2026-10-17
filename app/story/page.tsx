import { Localized } from "@/components/language";
import type { Metadata } from "next";
import { Eyebrow, TextLink, ButtonLink, PageIntro } from "@/components/ui";
import { GrindStudy } from "@/components/grind-study";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "The philosophy behind VELUNE: considered coffee, thoughtful spaces, and a little room for the everyday.",
};
export default function Story() {
  return (
    <Localized><main id="main">
      <PageIntro
        label="Our story"
        title={
          <>
            Less hurry.
            <br />
            More <em>here.</em>
          </>
        }
        description="VELUNE began as a simple question: what would a coffee shop feel like if every detail invited you to stay a little longer?"
      />
      <figure className="wide-image container">
        <img
          src="/images/ritual.webp"
          alt="A quiet coffee ritual in warm morning light"
          width="1100"
          height="733"
          fetchPriority="high"
        />
        <figcaption>
          01 — A study in everyday pleasure. Concept imagery.
        </figcaption>
      </figure>
      <section className="story-philosophy container" data-reveal>
        <Eyebrow>A softer kind of ritual</Eyebrow>
        <div>
          <h2>
            Not every moment
            <br />
            needs to be <em>filled.</em>
          </h2>
          <p>
            Some need a little space. For the first sip to cool. For the light
            to shift across a table. For a conversation to find its own way.
          </p>
          <p>
            VELUNE is a fictional specialty coffee shop concept imagined in
            Osaka. It brings together the precision of good coffee and the
            comfort of a thoughtfully made room. There is no grand promise. Just
            a considered cup, and a place to enjoy it.
          </p>
          <p>
            Our name has no borrowed tradition to explain. It is simply a soft
            sound, chosen to fit the feeling.
          </p>
        </div>
      </section>
      <section className="principles container" data-reveal>
        <div>
          <Eyebrow>What we would stand for</Eyebrow>
          <h2>
            Care is in
            <br />
            the <em>small things.</em>
          </h2>
        </div>
        <div>
          {[
            {
              n: "01",
              title: "Clarity, from the source",
              text: "Our sourcing approach would begin with traceable information: producer, region, process, and roast date. We have no contracted suppliers or certifications, and make no claims on their behalf.",
            },
            {
              n: "02",
              title: "Taste before convention",
              text: "A bright filter, a rounded espresso, a generous latte. Every coffee has a different expression. We would choose and prepare each one for balance, sweetness, and the pleasure of drinking it.",
            },
            {
              n: "03",
              title: "Hospitality without the fuss",
              text: "Coffee knowledge should make ordering easier. Familiar language, clear ingredients, and space to ask a question are as important as a carefully adjusted grinder.",
            },
          ].map((p) => (
            <article key={p.n}>
              <span>{p.n}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <GrindStudy />
      <section className="process-section container" data-reveal>
        <Eyebrow>From bean to your cup</Eyebrow>
        <h2>
          A sequence of <em>small decisions.</em>
        </h2>
        <div className="process-grid">
          {[
            {
              name: "Select",
              text: "Start with a coffee whose origin and processing are clearly described.",
            },
            {
              name: "Grind",
              text: "Adjust the particle size to the brew method, then refine by taste.",
            },
            {
              name: "Brew",
              text: "Balance water, time, and temperature. Change one variable at a time.",
            },
            {
              name: "Enjoy",
              text: "Let the cup cool a little. Notice what opens up. Make it your moment.",
            },
          ].map((s, i) => (
            <article key={s.name}>
              <span>0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="story-experience container">
        <img
          src="/images/filter.webp"
          alt="Coffee prepared by hand in a ceramic filter"
          width="1200"
          height="800"
          loading="lazy"
        />
        <div>
          <Eyebrow>Look a little closer</Eyebrow>
          <h2>
            <em>Follow the coffee.</em>
          </h2>
          <p>
            The small decisions behind a good cup, told through photographs and a quiet moving illustration.
          </p>
          <ButtonLink href="/experience">Discover the ritual</ButtonLink>
        </div>
      </section>
    </main></Localized>
  );
}
