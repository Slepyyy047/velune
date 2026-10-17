import type { Metadata } from "next";
import { PageIntro, TextLink } from "@/components/ui";
import { Localized } from "@/components/language";
export const metadata: Metadata = { title: "The ritual", description: "A quiet, illustrated journey from coffee bean to first sip. Follow the craft at your own pace." };
const chapters = [
  { label: "01 / Choose", title: "Character begins with a bean.", text: "A roast is a starting point, not a promise of quality. Look for a clear origin, a roast date, and flavors that sound like something you would enjoy. We imagine a menu with room for both a bright filter and a deeper, sweeter espresso.", image: "beans", alt: "Roasted coffee beans in warm light", href: "/journal/from-bean-to-brew", link: "Read the coffee notes" },
  { label: "02 / Grind", title: "A small change. A different cup.", text: "Grinding gives water access to the coffee. Finer particles usually slow an espresso shot; a coarser grind suits longer immersion. Start with a recipe, then adjust one thing and taste the difference.", image: "grinding", alt: "Freshly ground coffee falling from a grinder into a portafilter", href: "/story#grind", link: "Explore the grind" },
  { label: "03 / Brew", title: "Let the water do its work.", text: "Freshly ground coffee, good water, a little attention. Watch the flow rather than the clock alone. A steady pour and an even coffee bed help a filter brew taste clear; espresso asks for an evenly prepared puck and a balanced yield.", image: "filter", alt: "Coffee brewed by hand through a ceramic filter", href: "/journal/the-art-of-slow-coffee", link: "Read the coffee notes" },
  { label: "04 / Pause", title: "The best part needs no instruction.", text: "Give it a moment to cool. Find the sweetness, the texture, the finish. The point of all those small decisions is simply a cup you want to drink again.", image: "latte", alt: "A warm latte in a ceramic cup", href: "/menu", link: "Find your cup" },
];
export default function Experience() {
  return <Localized><main id="main" className="ritual-page">
    <PageIntro label="The ritual" title={<>Coffee, <em>in motion.</em></>} description="A quiet journey, from the first bean to the first sip. Scroll at your own pace; the story follows in the background."/>
    <div className="ritual-chapters container">{chapters.map((chapter, i) => <section className="ritual-chapter" key={chapter.label} data-reveal>
      <figure><img src={`/images/${chapter.image}.webp`} alt={chapter.alt} width="1100" height="733" loading={i === 0 ? "eager" : "lazy"}/><span aria-hidden="true">0{i + 1}</span></figure>
      <div><p className="eyebrow">{chapter.label}</p><h2>{chapter.title}</h2><p>{chapter.text}</p><TextLink href={chapter.href}>{chapter.link}</TextLink></div>
    </section>)}</div>
    <p className="ritual-note container small">An illustrated brewing sequence follows your scroll. All photography depicts the fictional VELUNE concept.</p>
  </main></Localized>;
}
