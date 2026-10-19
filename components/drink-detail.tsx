"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { price } from "@/data/menu";
import { menuItems, type MenuItem } from "@/data/catalogue";
import extraPreparation from "@/data/extra-preparation.json";
import { DrinkPhoto } from "@/components/drink-photo";
import { Localized, useLanguage } from "@/components/language";
import { useFavorites } from "@/components/favorites";
import { PhotoPanel } from "@/components/photo-panel";
import { preparation } from "@/data/preparation";
export function DrinkDetail({ drink }: { drink: MenuItem }) {
  const { language, t } = useLanguage();
  const { favorites, toggleFavorite, storageError } = useFavorites();
  const pool = menuItems.filter(d => d.kind === drink.kind);
  const index = pool.findIndex(d => d.id === drink.id);
  const related = pool.filter(d => d.id !== drink.id && d.category === drink.category).slice(0, 3);
  const steps = preparation[drink.id] || extraPreparation[drink.id as keyof typeof extraPreparation];
  return <Localized><main id="main" className="drink-detail-page">
    <div className="container detail-breadcrumb"><Link prefetch={false} className="text-link" href={drink.kind === "dessert" ? "/desserts/" : "/menu/"}><ArrowLeft size={16}/>Back to menu</Link><span>{String(index + 1).padStart(2, "0")} / {pool.length}</span></div>
    <section className="drink-detail-hero container">
      <div className="drink-portrait"><DrinkPhoto id={drink.id} priority fullSize/><span className="portrait-caption">Concept photography</span></div>
      <div className="drink-detail-copy">
        <p className="eyebrow">{drink.category}</p><h1>{drink.name}</h1>
        <div className="detail-price"><strong>{price(drink.price)}</strong><span>{t(drink.size)}<br/>Concept price · USD</span></div>
        <p className="detail-description">{drink.description}</p>
        <div className="flavor-pills" role="group" aria-label={t("Tasting notes")}>{drink.notes.map(note => <span key={note}>{note}</span>)}</div>
        <p className="small">See ingredients below for the full recipe.</p>
        <button className="button magnetic detail-save" aria-pressed={favorites.includes(drink.id)} onClick={() => toggleFavorite(drink.id)}><Heart size={17} fill={favorites.includes(drink.id) ? "currentColor" : "none"}/>{favorites.includes(drink.id) ? "Saved to favorites" : "Save to favorites"}</button>
        {storageError && <p role="status" className="notice">Your browser cannot save preferences right now. Favorites still work during this visit.</p>}
        <dl className="drink-facts"><div><dt>Ingredients</dt><dd>{drink.ingredients.map(t).join(" · ")}</dd></div><div><dt>Dietary information</dt><dd>{drink.dietary}</dd></div></dl>
      </div>
    </section>
    <section className="drink-preparation container" data-reveal>
      <div><p className="eyebrow">{drink.kind === "dessert" ? "From the kitchen" : "Preparation"}</p><h2>{language === "ru" ? steps.ru.title : steps.en.title}</h2><p>{language === "ru" ? steps.ru.body : steps.en.body}</p><p className="small">Concept recipe. Prepared in a shared space; cross-contact is possible.</p></div>
      <figure><div className="drink-macro"><DrinkPhoto id={drink.id} detail fullSize/></div><figcaption>A closer look.</figcaption></figure>
    </section>
    {related.length > 0 && <section className="drink-related container" data-reveal><p className="eyebrow">You might also like</p><div className="signature-grid">{related.map(d => <Link prefetch={false} href={`/menu/${d.id}/?lang=${language}`} className="signature-card" key={d.id}><div className="signature-image"><DrinkPhoto id={d.id}/></div><div className="product-title"><h3>{d.name}</h3><span>{price(d.price)}</span></div></Link>)}</div></section>}
    <PhotoPanel image="space" alt="Window-side seating in the VELUNE café concept" label="THE CAFÉ" title="Coffee at velune." href="/visit/" link="Look inside" className="photo-panel--detail"/>
    <nav className="drink-pagination container" aria-label={language === "ru" ? (drink.kind === "dessert" ? "Другие десерты" : "Другие напитки") : (drink.kind === "dessert" ? "More desserts" : "More drinks")}>
      <Link prefetch={false} href={`/menu/${pool[(index + pool.length - 1) % pool.length].id}/?lang=${language}`}><ArrowLeft size={18}/><span><small>{drink.kind === "dessert" ? "Previous dessert" : "Previous drink"}</small>{t(pool[(index + pool.length - 1) % pool.length].name)}</span></Link>
      <Link prefetch={false} href={`/menu/${pool[(index + 1) % pool.length].id}/?lang=${language}`}><span><small>{drink.kind === "dessert" ? "Next dessert" : "Next drink"}</small>{t(pool[(index + 1) % pool.length].name)}</span><ArrowRight size={18}/></Link>
    </nav>
  </main></Localized>;
}
