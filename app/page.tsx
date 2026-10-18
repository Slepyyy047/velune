import { Localized } from "@/components/language";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, TextLink, SectionHeading } from "@/components/ui";
import { DrinkPhoto } from "@/components/drink-photo";

export default function Home() {
  return <Localized><main id="main" className="cafe-home">
    <section className="cafe-hero">
      <div className="cafe-hero-copy">
        <p className="eyebrow">COFFEE SHOP · OSAKA CONCEPT</p>
        <h1 className="hero-wordmark" data-no-letters>velune.</h1>
        <p className="cafe-hero-heading">Coffee, just how<br/>you like it.</p>
        <p className="cafe-hero-description">Espresso, filter coffee, matcha.<br/>Something hot. Something iced. Your choice.</p>
        <ButtonLink href="/menu/">See the menu</ButtonLink>
        <div className="cafe-hero-foot"><span>GOOD COFFEE. GOOD COMPANY.</span><span>OSAKA, JAPAN</span></div>
      </div>
      <div className="cafe-hero-photo">
        <picture><source media="(max-width:600px)" srcSet="/images/hero-mobile.webp"/><img src="/images/hero.webp" alt="Sunlit café with a stone coffee counter, oak stools and green seating" width="1536" height="1024" fetchPriority="high"/></picture>
        <Link href="/visit/" className="photo-caption"><span>Take a look around</span><ArrowUpRight size={20}/></Link>
      </div>
    </section>
    <div className="cafe-strip"><span>ESPRESSO & FILTER</span><span aria-hidden="true">✳</span><span>MATCHA & ICED DRINKS</span><span aria-hidden="true">✳</span><span>A TABLE. A COFFEE. A BREAK.</span></div>
    <section id="coffee" className="signature-section container cafe-menu" data-reveal>
      <img className="menu-beans cafe-decoration" src="/images/coffee-beans-cutout.webp" alt="" width="480" height="480" loading="lazy" aria-hidden="true"/>
      <SectionHeading label="WHAT ARE YOU HAVING?" title="Start with these." href="/menu/" link="Full menu · 20 drinks"/>
      <div className="signature-grid">
        {[
          {id:"espresso",name:"Espresso",note:"Double shot. Chocolate, caramel, a clean finish.",price:"3.50",label:"SHORT & STRONG"},
          {id:"latte",name:"Velune Latte",note:"Double espresso with silky steamed milk.",price:"5.50",label:"WITH MILK"},
          {id:"lavender-cloud",name:"Lavender Cloud",note:"Espresso, milk, vanilla and a little lavender.",price:"7.00",label:"SOMETHING DIFFERENT"},
        ].map(d=><Link prefetch={false} className="signature-card" href={`/menu/${d.id}/`} target="_blank" rel="noopener" key={d.id}>
          <div className="signature-image"><DrinkPhoto id={d.id}/><span className="product-label">{d.label}</span><span className="round-arrow"><ArrowUpRight size={19}/></span></div>
          <div className="product-title"><h3>{d.name}</h3><span>${d.price}</span></div><p>{d.note}</p><span className="sr-only">Opens in a new tab</span>
        </Link>)}
      </div>
      <p className="menu-note">Concept menu · Prices in USD</p>
    </section>
    <section className="cafe-pick container" data-reveal>
      <div className="cafe-pick-photo"><img className="cafe-cup cafe-decoration" src="/images/lavender-cup.webp" alt="Cappuccino in a lavender ceramic cup with leaf-shaped latte art" width="800" height="800" loading="lazy"/></div>
      <div className="cafe-pick-copy"><p className="eyebrow">KEEP IT CLASSIC</p><h2>A cappuccino,<br/>please.</h2><p>Espresso, warm milk and a thick layer of foam. That’s it.</p><div className="cafe-pick-action"><span>$5.00 <small>180 ml</small></span><TextLink href="/menu/cappuccino/">See this drink</TextLink></div></div>
    </section>
    <section className="cafe-space container" data-reveal>
      <div className="cafe-space-copy"><p className="eyebrow">THE CAFÉ</p><h2>Pick a seat.</h2><p>At the counter, by the window or at a table with friends. A bright room with warm wood, soft green seats and plenty of coffee.</p><TextLink href="/visit/">Look inside</TextLink></div>
      <div className="cafe-space-photos"><figure className="space-large"><img src="/images/space.webp" alt="Green upholstered café seating beside a sunny window" width="1100" height="733" loading="lazy"/></figure><figure className="space-small"><img src="/images/ritual.webp" alt="Filter coffee being poured at the counter" width="1100" height="733" loading="lazy"/><figcaption>COFFEE AT THE COUNTER</figcaption></figure></div>
    </section>
  </main></Localized>;
}
