import { Localized } from "@/components/language";
import type { Metadata } from "next";
import { PageIntro, Eyebrow, TextLink } from "@/components/ui";
import { SpaceGallery } from "@/components/space-gallery";
export const metadata: Metadata = {
  title: "Visit the concept",
  description:
    "Step inside VELUNE, a fictional coffee shop imagined in Osaka. Explore the architectural concept and its atmosphere.",
};
export default function Visit() {
  return (
    <Localized><main id="main">
      <PageIntro
        label="An imagined corner of Osaka"
        title={
          <>
            A little room
            <br />
            to <em>stay awhile.</em>
          </>
        }
        description="Soft daylight. The warmth of timber. The reassuring sound of coffee being made. Welcome to the space we imagine."
      />
      <div className="visit-hero container">
        <img
          src="/images/hero.webp"
          alt="The conceptual VELUNE café interior with a sunlit stone counter"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
        <span>OSAKA, JAPAN — CONCEPT LOCATION</span>
      </div>
      <section className="visit-details container" data-reveal>
        <div>
          <Eyebrow>The feeling of being here</Eyebrow>
          <h2>
            A place for company.
            <br />
            And for <em>yourself.</em>
          </h2>
          <p>
            A window seat for the first coffee of the day. A shared table for a
            conversation that runs longer than expected. A quieter corner when a
            book is all the company you need.
          </p>
          <p>
            Our architectural study brings pale stone and warm oak together with
            sage seating and lilac accents. The intention is simple: a room that
            feels welcoming before you have even ordered.
          </p>
        </div>
        <aside className="concept-note">
          <span className="tiny-dot" />
          <Eyebrow>A note before you visit</Eyebrow>
          <h3>
            A real idea.
            <br />
            An imagined address.
          </h3>
          <p>
            VELUNE is a fictional brand and digital design project, based
            conceptually in Osaka, Japan. It is not an operating coffee shop.
          </p>
          <p>
            There is no street address, public opening schedule, reservation
            service, or physical location to visit. All interior and product
            images are generated concept imagery.
          </p>
          <TextLink href="/story">The idea behind VELUNE</TextLink>
        </aside>
      </section>
      <SpaceGallery />
      <section className="visit-closing container">
        <Eyebrow>Until a place like this finds you</Eyebrow>
        <h2>
          Make a little space
          <br />
          for your <em>own ritual.</em>
        </h2>
        <TextLink href="/journal/the-art-of-slow-coffee">
          A note on slow coffee
        </TextLink>
      </section>
    </main></Localized>
  );
}
