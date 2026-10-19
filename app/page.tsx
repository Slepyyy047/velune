import { Localized } from "@/components/language";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { ButtonLink, TextLink, SectionHeading } from "@/components/ui";
import { DrinkPhoto } from "@/components/drink-photo";
import { CoffeeDrawing } from "@/components/coffee-drawing";
import { PhotoPanel } from "@/components/photo-panel";

export default function Home() {
  return <Localized><main id="main" className="cafe-home">
    <section className="cafe-hero photo-home-hero" aria-label="VELUNE café">
      <picture className="home-hero-picture"><source media="(max-width:600px)" srcSet="/images/hero-mobile.webp"/><img src="/images/hero.webp" alt="Sunlit café with a stone coffee counter, oak stools and green seating" width="1536" height="1024" fetchPriority="high"/></picture>
      <div className="home-hero-shade"/>
      <div className="home-hero-meta"><span>SPECIALTY COFFEE</span><span>OSAKA, JAPAN · A CONCEPT</span></div>
      <div className="home-hero-brand"><h1 className="hero-wordmark" data-no-letters>velune.</h1><p>Coffee, just how you like it.</p></div>
      <div className="home-hero-bottom"><p>Espresso, filter coffee, matcha.<br/>A table for your next coffee.</p><div><ButtonLink href="/menu/">See the menu</ButtonLink><a href="#counter" className="hero-counter-link">At the counter <ArrowDown size={16}/></a></div></div>
    </section>
    <div className="cafe-strip"><span>ESPRESSO & FILTER</span><span aria-hidden="true">✳</span><span>MATCHA & ICED DRINKS</span><span aria-hidden="true">✳</span><span>A TABLE. A COFFEE. A BREAK.</span></div>
    <section className="cafe-welcome container" data-reveal>
      <div><p className="eyebrow">COME ON IN</p><h2>Your coffee.<br/><em>Your kind of day.</em></h2></div>
      <div><p>A quick espresso at the counter or a long catch-up at a table. Choose your drink. We’ve made room for both.</p><div className="welcome-facts"><span>20 drinks</span><span>Hot & iced</span><span>Milk & oat options</span></div></div>
    </section>
    <section id="coffee" className="signature-section container cafe-menu" data-reveal>
      <CoffeeDrawing kind="beans" className="menu-beans cafe-decoration"/>
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
    <div id="counter" className="counter-section">
      <PhotoPanel image="ritual" alt="Coffee being hand-poured through a ceramic filter at the café counter" label="AT THE COUNTER" title={<>Freshly ground.<br/>Made to order.</>} href="/menu/pour-over/" link="Hand-poured coffee · $6.50">Espresso pulled short. Milk steamed smooth. Filter coffee poured by hand.</PhotoPanel>
      <div className="counter-options container"><span>ESPRESSO <strong>36 ml / $3.50</strong></span><span>CAPPUCCINO <strong>180 ml / $5.00</strong></span><span>HAND-POURED <strong>250 ml / $6.50</strong></span></div>
    </div>
    <section className="cafe-pick container" data-reveal>
      <div className="cafe-pick-photo"><CoffeeDrawing kind="cup" className="cafe-cup cafe-decoration"/><span className="drawing-note">ESPRESSO + MILK + FOAM</span></div>
      <div className="cafe-pick-copy"><p className="eyebrow">KEEP IT CLASSIC</p><h2>A cappuccino,<br/>please.</h2><p>Espresso, warm milk and a thick layer of foam. That’s it.</p><div className="cafe-pick-action"><span>$5.00 <small>180 ml</small></span><TextLink href="/menu/cappuccino/">See this drink</TextLink></div></div>
    </section>
    <section className="cafe-cold container" data-reveal>
      <SectionHeading label="A CHANGE OF PACE" title="Over ice. Or a little greener." href="/menu/" link="See every drink"/>
      <div className="cold-drink-grid">{[
        {id:"yuzu-cold-brew", name:"Yuzu Cold Brew",price:"7.00",copy:"Cold brew, yuzu and sparkling water. Served over ice.",label:"ON ICE"},
        {id:"matcha",name:"Matcha Latte",price:"6.00",copy:"Whisked green tea with warm milk. Coffee can wait.",label:"SOMETHING GREEN"},
      ].map(d=><Link className="cold-drink-card" key={d.id} href={`/menu/${d.id}/`} target="_blank" rel="noopener"><div className="cold-drink-photo"><DrinkPhoto id={d.id}/><span>{d.label}</span></div><div className="cold-drink-copy"><div className="product-title"><h3>{d.name}</h3><span>${d.price}</span></div><p>{d.copy}</p><span className="cold-drink-arrow"><ArrowUpRight size={20}/></span><span className="sr-only">Opens in a new tab</span></div></Link>)}</div>
    </section>
    <section id="space" className="cafe-space photo-space-section">
      <PhotoPanel image="space" alt="Green upholstered café seating beside a sunny window" label="THE CAFÉ" title={<>A seat by<br/>the window.</>} href="/visit/" link="Look inside">Warm wood, green benches and a table for your coffee.</PhotoPanel>
      <div className="space-details container" data-reveal><div><span>01</span><h3>At the counter</h3><p>A short coffee and a view of the bar.</p></div><div><span>02</span><h3>By the window</h3><p>Daylight, a book and your usual cup.</p></div><div><span>03</span><h3>With company</h3><p>A shared table for coffee and a catch-up.</p></div></div>
    </section>
    <section id="questions" className="cafe-questions container" data-reveal>
      <div><p className="eyebrow">BEFORE YOU CHOOSE</p><h2>A few<br/><em>coffee questions.</em></h2><CoffeeDrawing kind="filter" className="questions-drawing"/></div>
      <div className="coffee-faq">
        <details><summary>What’s the difference between a flat white and a latte?</summary><p>Both use a double espresso. The flat white is 180 ml with less milk; the latte is 280 ml and milkier. A cappuccino adds a thicker layer of foam.</p></details>
        <details><summary>Are there oat milk options?</summary><p>The menu includes an oat latte, and selected milk drinks list an oat alternative. Open a drink to check its ingredients and allergen notes.</p></details>
        <details><summary>What if I don’t drink coffee?</summary><p>Try matcha, roasted hojicha or dark chocolate. They have their own section in the menu. Tea and chocolate can still contain caffeine.</p></details>
        <details><summary>Can I visit VELUNE?</summary><p>This is a fictional Osaka café concept. There’s no operating location or opening schedule. You can explore the space and the complete concept menu here.</p></details>
      </div>
    </section>
  </main></Localized>;
}
