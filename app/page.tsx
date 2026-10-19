import { Localized } from "@/components/language";
import Link from "next/link";
import { ArrowDown, Coffee, Croissant, CupSoda, Armchair } from "lucide-react";
import { ButtonLink, TextLink, SectionHeading } from "@/components/ui";
import { CoffeeDrawing } from "@/components/coffee-drawing";
import { PhotoPanel } from "@/components/photo-panel";
import { MenuPreviewCard } from "@/components/menu-preview-card";
import { LiquidWordmark } from "@/components/liquid-wordmark";

export default function Home() {
  return <Localized><main id="main" className="cafe-home bakery-home">
    <section className="cafe-hero photo-home-hero" aria-label="VELUNE café">
      <picture className="home-hero-picture"><source media="(max-width:600px)" srcSet="/images/hero-mobile.webp"/><img src="/images/hero.webp" alt="Sunlit café with a stone coffee counter, oak stools and green seating" width="1536" height="1024" fetchPriority="high"/></picture>
      <div className="home-hero-shade"/>
      <div className="home-hero-meta"><span>COFFEE & BAKERY</span><span>OSAKA, JAPAN · A CONCEPT</span></div>
      <div className="home-hero-brand"><LiquidWordmark/><p>Coffee. Cake. A seat by the window.</p></div>
      <div className="home-hero-bottom"><p>Your usual coffee.<br/>And something from the bakery.</p><div><ButtonLink href="/menu/">Drinks menu</ButtonLink><Link href="/desserts/" className="hero-counter-link">See the desserts <ArrowDown size={16}/></Link></div></div>
    </section>
    <section className="cafe-benefits container" aria-label="On the menu">
      <div><Coffee size={27}/><span>36 drinks<small>Espresso, tea & matcha</small></span></div><div><Croissant size={27}/><span>18 desserts<small>Pastries, cakes & cookies</small></span></div><div><CupSoda size={27}/><span>Hot or iced<small>Pick your favorite</small></span></div><div><Armchair size={27}/><span>Take a seat<small>Have a look inside</small></span></div>
    </section>
    <section id="coffee" className="popular-coffee container" data-reveal>
      <div className="popular-intro"><p className="eyebrow">THE COFFEE MENU</p><h2>Coffee<br/><em>first.</em></h2><p>Classics, matcha and a few new things.</p><ButtonLink href="/menu/" outline>All 36 drinks</ButtonLink></div>
      <div className="popular-coffee-grid"><MenuPreviewCard id="latte" compact/><MenuPreviewCard id="pistachio-latte" compact/><MenuPreviewCard id="strawberry-matcha" compact/></div>
    </section>
    <section id="desserts" className="home-desserts container" data-reveal>
      <SectionHeading label="FROM THE BAKERY" title={<>Something <em>sweet.</em></>} href="/desserts/" link="All 18 desserts"/>
      <div className="dessert-preview-grid"><MenuPreviewCard id="butter-croissant"/><MenuPreviewCard id="basque-cheesecake"/><MenuPreviewCard id="tiramisu"/><MenuPreviewCard id="pistachio-cookie"/></div>
      <div className="bakery-categories"><Link href="/desserts/?category=Pastries">Croissants & pastries</Link><span aria-hidden="true">·</span><Link href="/desserts/?category=Cakes%20%26%20Chilled%20Desserts">Cakes & chilled desserts</Link><span aria-hidden="true">·</span><Link href="/desserts/?category=Cookies%20%26%20Small%20Bakes">Cookies & small bakes</Link></div>
    </section>
    <section id="counter" className="pairing-feature" data-reveal>
      <picture><source media="(max-width:600px)" srcSet="/images/coffee-croissant-mobile.webp"/><img src="/images/coffee-croissant.webp" alt="Cappuccino and a butter croissant on a ceramic plate" width="1672" height="941" loading="lazy"/></picture>
      <div className="pairing-copy"><p className="eyebrow">COFFEE + CROISSANT</p><h2>Coffee &<br/><em>a croissant.</em></h2><p>Cappuccino · $5.00<br/>Butter croissant · $4.25</p><div><TextLink href="/menu/cappuccino/">The coffee</TextLink><TextLink href="/menu/butter-croissant/">The croissant</TextLink></div></div>
    </section>
    <section className="home-new-menu container" data-reveal>
      <SectionHeading label="A FEW MORE TO TRY" title={<>On the <em>menu.</em></>} href="/menu/" link="Browse the menu"/>
      <div className="new-menu-grid"><MenuPreviewCard id="iced-caramel-latte"/><MenuPreviewCard id="affogato"/><MenuPreviewCard id="matcha-crepe-cake"/><MenuPreviewCard id="almond-croissant"/></div>
    </section>
    <section id="space" className="cafe-space photo-space-section">
      <PhotoPanel image="space" alt="Green upholstered café seating beside a sunny window" label="THE CAFÉ" title={<>Choose<br/><em>a seat.</em></>} href="/visit/" link="Look inside">At the counter, by the window or with friends.</PhotoPanel>
    </section>
    <section id="questions" className="cafe-questions container" data-reveal>
      <div><p className="eyebrow">GOOD TO KNOW</p><h2>Before<br/><em>you choose.</em></h2><CoffeeDrawing kind="cup" className="questions-drawing cafe-cup"/></div>
      <div className="coffee-faq">
        <details><summary>Are there oat milk options?</summary><p>Yes. The menu includes an oat latte, and selected milk drinks list an oat alternative. Check the ingredients on each drink.</p></details>
        <details><summary>Where can I check allergens?</summary><p>Open any drink or dessert for its ingredients, portion and allergen notes. Preparation takes place in a shared-space concept; cross-contact is possible.</p></details>
        <details><summary>Can I visit VELUNE?</summary><p>VELUNE is a fictional café concept in Osaka. There’s no operating address or opening schedule. The menu and images show the concept.</p></details>
      </div>
    </section>
  </main></Localized>;
}
