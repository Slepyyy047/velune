"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { drinks, price, type Drink } from "@/data/menu";
import { DrinkPhoto } from "@/components/drink-photo";
import { Localized, useLanguage } from "@/components/language";
import { useFavorites } from "@/components/favorites";
import { preparation } from "@/data/preparation";
export function DrinkDetail({ drink }: { drink: Drink }) {
  const { language, t } = useLanguage();
  const { favorites, toggleFavorite, storageError } = useFavorites();
  const index = drinks.findIndex(d => d.id === drink.id);
  const related = drinks.filter(d => d.id !== drink.id && d.category === drink.category).slice(0, 3);
  const steps = preparation[drink.id];
  return <Localized><main id="main" className="drink-detail-page">
    <div className="container detail-breadcrumb"><Link prefetch={false} className="text-link" href="/menu"><ArrowLeft size={16}/>Back to menu</Link><span>{String(index + 1).padStart(2, "0")} / 20</span></div>
    <section className="drink-detail-hero container">
      <div className="drink-portrait"><DrinkPhoto id={drink.id} priority fullSize/><span className="portrait-caption">Concept photography</span></div>
      <div className="drink-detail-copy">
        <p className="eyebrow">{drink.category}</p><h1>{drink.name}</h1>
        <div className="detail-price"><strong>{price(drink.price)}</strong><span>{t(drink.size)}<br/>Concept price · USD</span></div>
        <p className="detail-description">{drink.description}</p>
        <div className="flavor-pills" role="group" aria-label={t("Tasting notes")}>{drink.notes.map(note => <span key={note}>{note}</span>)}</div>
        <p className="small">Flavor notes describe the taste; they are not added ingredients.</p>
        <button className="button magnetic detail-save" aria-pressed={favorites.includes(drink.id)} onClick={() => toggleFavorite(drink.id)}><Heart size={17} fill={favorites.includes(drink.id) ? "currentColor" : "none"}/>{favorites.includes(drink.id) ? "Saved to favorites" : "Save to favorites"}</button>
        {storageError && <p role="status" className="notice">Your browser cannot save preferences right now. Favorites still work during this visit.</p>}
        <dl className="drink-facts"><div><dt>Ingredients</dt><dd>{drink.ingredients.map(t).join(" · ")}</dd></div><div><dt>Dietary information</dt><dd>{drink.dietary}</dd></div></dl>
      </div>
    </section>
    <section className="drink-preparation container" data-reveal>
      <div><p className="eyebrow">Preparation</p><h2>{language === "ru" ? steps.ru.title : steps.en.title}</h2><p>{language === "ru" ? steps.ru.body : steps.en.body}</p><p className="small">Illustrative recipe and generated concept photography. Prepared in a shared-space concept; cross-contact cannot be ruled out. No orders or payments are accepted.</p></div>
      <figure><div className="drink-macro"><DrinkPhoto id={drink.id} detail fullSize/></div><figcaption>Full composition and a closer crop of the same concept photograph.</figcaption></figure>
    </section>
    {related.length > 0 && <section className="drink-related container" data-reveal><p className="eyebrow">Explore another ritual</p><div className="signature-grid">{related.map(d => <Link prefetch={false} href={`/menu/${d.id}/?lang=${language}`} className="signature-card" key={d.id}><div className="signature-image"><DrinkPhoto id={d.id}/></div><div className="product-title"><h3>{d.name}</h3><span>{price(d.price)}</span></div></Link>)}</div></section>}
    <nav className="drink-pagination container" aria-label={language === "ru" ? "Другие напитки" : "More drinks"}>
      <Link prefetch={false} href={`/menu/${drinks[(index + 19) % 20].id}/?lang=${language}`}><ArrowLeft size={18}/><span><small>Previous drink</small>{t(drinks[(index + 19) % 20].name)}</span></Link>
      <Link prefetch={false} href={`/menu/${drinks[(index + 1) % 20].id}/?lang=${language}`}><span><small>Next drink</small>{t(drinks[(index + 1) % 20].name)}</span><ArrowRight size={18}/></Link>
    </nav>
  </main></Localized>;
}
