"use client";
import { useState } from "react";
import { Search, Heart, X, ArrowUpRight } from "lucide-react";
import { drinks, categories, price } from "@/data/menu";
import { DrinkPhoto } from "@/components/drink-photo";
import { Localized, useLanguage } from "@/components/language";
import { useFavorites } from "@/components/favorites";
export function MenuBrowser() {
  const [category, setCategory] = useState("All drinks");
  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { favorites, storageError, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const filtered = drinks.filter(d => {
    const fields = [d.name, d.category, d.description, ...d.ingredients, ...d.notes];
    return (category === "All drinks" || d.category === category) && (!onlyFavorites || favorites.includes(d.id)) && [...fields, ...fields.map(t)].join(" ").toLocaleLowerCase().includes(query.toLocaleLowerCase().trim());
  });
  return <Localized><section className="menu-browser container">
    <div className="menu-toolbar">
      <label className="search-field"><Search size={18}/><span className="sr-only">Search the menu</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Find your next favorite…" type="search"/>
        {query && <button className="icon-button" onClick={() => setQuery("")} aria-label="Clear search"><X size={16}/></button>}
      </label>
      <button className={`favorite-filter ${onlyFavorites ? "active" : ""}`} aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(!onlyFavorites)}><Heart size={17} fill={onlyFavorites ? "currentColor" : "none"}/>My favorites <span>{favorites.length}</span></button>
    </div>
    <div className="category-filters" role="group" aria-label="Drink categories">{["All drinks", ...categories].map(c => <button key={c} aria-pressed={category === c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
    <div className="menu-results"><p role="status">{language === "ru" ? `Напитков: ${filtered.length}` : `${filtered.length} drinks to savor`}</p><span>CONCEPT MENU · USD</span></div>
    {storageError && <p role="status" className="notice">Your browser cannot save preferences right now. Favorites still work during this visit.</p>}
    <div className="drink-grid" key={`${category}-${onlyFavorites}`}>
      {filtered.map((d, i) => <article className="drink-card" key={d.id} style={{ animationDelay: `${Math.min(i, 5) * 45}ms` }}>
        <div className="drink-image">
          <a className="drink-open" href={`/menu/${d.id}/?lang=${language}`} target="_blank" rel="noopener" aria-label={`${t(d.name)}${d.signature ? ` — ${t("VELUNE SIGNATURE")}` : ""} — ${t("Opens in a new tab")}`}>
            <DrinkPhoto id={d.id} priority={i < 3}/>
            {d.signature && <span className="product-label">VELUNE SIGNATURE</span>}
            <span className="round-arrow"><ArrowUpRight size={18}/></span>
          </a>
          <button className={`favorite-button ${favorites.includes(d.id) ? "saved" : ""}`} aria-label={`${favorites.includes(d.id) ? (language === "ru" ? "Убрать из избранного" : "Remove from favorites") : (language === "ru" ? "Сохранить в избранное" : "Save to favorites")}: ${t(d.name)}`} aria-pressed={favorites.includes(d.id)} onClick={() => toggleFavorite(d.id)}><Heart size={18} fill={favorites.includes(d.id) ? "currentColor" : "none"}/></button>
        </div>
        <p className="drink-category">{d.category}</p>
        <div className="product-title"><h2 data-no-letters><a href={`/menu/${d.id}/?lang=${language}`} target="_blank" rel="noopener">{d.name}<span className="sr-only"> — {t("Opens in a new tab")}</span></a></h2><span>{price(d.price)}</span></div>
        <p>{d.description}</p>
        <span className="drink-size">{t(d.size)} <span>·</span> {d.notes.slice(0, 2).map(t).join(" / ")}</span>
      </article>)}
    </div>
    {!filtered.length && <div className="empty-state"><Heart size={26}/><h2>{onlyFavorites ? "A place for your favorites." : "A different kind of cup?"}</h2><p>{onlyFavorites ? "Tap the heart on a drink to keep it here." : "No drinks match that search. Try “oat”, “espresso”, or another category."}</p><button className="button" onClick={() => {setQuery("");setCategory("All drinks");setOnlyFavorites(false);}}>Explore all 20 drinks<ArrowUpRight size={17}/></button></div>}
  </section></Localized>;
}
