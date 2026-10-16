import type { Metadata } from "next";
import { PageIntro, Eyebrow, TextLink } from "@/components/ui";
import { CoffeeExperience } from "@/components/experience";
export const metadata: Metadata = {
  title: "The experience",
  description:
    "Explore the Sage Edition cup in 3D and a visual study of coffee, from bean to everyday ritual.",
};
export default function Experience() {
  return (
    <main id="main">
      <PageIntro
        label="The coffee experience"
        title={
          <>
            A closer look at
            <br />a <em>daily ritual.</em>
          </>
        }
        description="From the character of a bean to the curve of a cup. Follow the journey, then turn the Sage Edition over in your hands."
      />
      <CoffeeExperience />
      <section className="experience-notes container">
        <div>
          <Eyebrow>Designed to feel considered</Eyebrow>
          <h2>
            Quiet color.
            <br />
            <em>Tangible details.</em>
          </h2>
        </div>
        <div>
          <p>
            The Sage Edition study brings together a tapered paper body, rolled
            rim, recessed base, and a sculpted graphite lid. The wordmark
            follows the surface, with a fine grain suggesting paper under soft
            studio lighting.
          </p>
          <p>
            This is an original interactive design study, not a photographed or
            manufacturing-validated product. A licensed professional grinder
            model, realistic extraction footage, and final scanned materials
            remain part of the production asset plan.
          </p>
          <TextLink href="/story">Explore the thinking behind it</TextLink>
        </div>
      </section>
    </main>
  );
}
