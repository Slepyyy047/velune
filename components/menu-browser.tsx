"use client";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Heart, X, ArrowUpRight, Coffee, Croissant } from "lucide-react";
import { menuItems, drinks, desserts, categories, dessertCategories } from "@/data/catalogue";
import { price } from "@/data/menu";
import { DrinkPhoto } from "@/components/drink-photo";
import { Localized, useLanguage } from "@/components/language";
import { useFavorites } from "@/components/favorites";
type Collection = "drinks" | "desserts";
const normalise = (value:string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase();
function LocationSync({ onChange }: { onChange:(section:Collection, category:string|null)=>void }) {
  const params = useSearchParams();
  const path = usePathname();
  const section = path.startsWith("/desserts") || params.get("section") === "desserts" ? "desserts" : "drinks";
  const category = params.get("category");
  useEffect(() => onChange(section,category), [section,category,onChange]);
  return null;
}
export function MenuBrowser({initialCollection="drinks"}:{initialCollection?:Collection}) {
  const [collection, setCollection] = useState<Collection>(initialCollection);
  const [category, setCategory] = useState(initialCollection === "drinks" ? "All drinks" : "All desserts");
  const [focusTab, setFocusTab] = useState<Collection>(initialCollection);
  const [query, setQuery] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const { favorites, storageError, toggleFavorite } = useFavorites();
  const { language, t } = useLanguage();
  const router = useRouter();
  const available = menuItems.filter(d => d.kind === (collection === "drinks" ? "drink" : "dessert"));
  const allLabel = collection === "drinks" ? "All drinks" : "All desserts";
  const options = collection === "drinks" ? categories : dessertCategories;
  const sync = useCallback((section:Collection, requested:string|null) => {
    const valid = section === "drinks" ? categories : dessertCategories;
    setCollection(section);setFocusTab(section);
    setCategory(requested && valid.includes(requested) ? requested : section === "drinks" ? "All drinks" : "All desserts");
  }, []);
  function change(section:Collection, nextCategory:string) {
    setCollection(section);setFocusTab(section);setCategory(nextCategory);
    const url = new URL(location.href);
    const nextPath = section === "desserts" ? "/desserts/" : "/menu/";
    const routeChanged = url.pathname !== nextPath;
    url.pathname = nextPath;
    url.searchParams.delete("section");
    if (nextCategory.startsWith("All ")) url.searchParams.delete("category"); else url.searchParams.set("category",nextCategory);
    if (routeChanged) router.push(url.pathname + url.search,{scroll:false});
    else router.replace(url.pathname + url.search,{scroll:false});
  }
  const filtered = available.filter(d => {
    const fields = [d.name,d.category,d.description,...d.ingredients,...d.notes];
    return (category === allLabel || d.category === category) && (!onlyFavorites || favorites.includes(d.id)) && normalise([...fields,...fields.map(t)].join(" ")).includes(normalise(query.trim()));
  });
  const savedCount = available.filter(d=>favorites.includes(d.id)).length;
  const count = filtered.length;
  const russianForms = collection === "drinks" ? ["напиток","напитка","напитков"] : ["десерт","десерта","десертов"];
  const form = count % 10 === 1 && count % 100 !== 11 ? 0 : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? 1 : 2;
  const resultLabel = language === "ru" ? `${count} ${russianForms[form]}` : `${count} ${count === 1 ? collection.slice(0,-1) : collection}`;
  return <Localized><section className="menu-browser container">
    <Suspense fallback={null}><LocationSync onChange={sync}/></Suspense>
    <div className="menu-collections" role="tablist" aria-label="Menu sections" onKeyDown={e=>{
      // Manual tab activation: arrows move focus; Enter/Space opens the route.
      if (e.altKey || e.ctrlKey || e.metaKey || !["ArrowLeft","ArrowRight","Home","End"].includes(e.key)) return;
      e.preventDefault();
      const current = (e.target as HTMLElement).closest("[role=tab]")?.id === "desserts-tab" ? "desserts" : "drinks";
      const next:Collection = e.key === "Home" ? "drinks" : e.key === "End" ? "desserts" : current === "drinks" ? "desserts" : "drinks";
      setFocusTab(next);
      document.getElementById(`${next}-tab`)?.focus();
    }}>
      <button id="drinks-tab" role="tab" tabIndex={focusTab === "drinks" ? 0 : -1} onFocus={()=>setFocusTab("drinks")} aria-selected={collection === "drinks"} aria-controls="menu-results-panel" onClick={()=>change("drinks","All drinks")}><Coffee size={20}/>Drinks<span>{drinks.length}</span></button>
      <button id="desserts-tab" role="tab" tabIndex={focusTab === "desserts" ? 0 : -1} onFocus={()=>setFocusTab("desserts")} aria-selected={collection === "desserts"} aria-controls="menu-results-panel" onClick={()=>change("desserts","All desserts")}><Croissant size={20}/>Desserts<span>{desserts.length}</span></button>
    </div>
    <div className="menu-toolbar">
      <label className="search-field"><Search size={18}/><span className="sr-only">Search the menu</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search names or ingredients" type="search"/>{query && <button className="icon-button" onClick={()=>setQuery("")} aria-label="Clear search"><X size={16}/></button>}</label>
      <button className={`favorite-filter ${onlyFavorites ? "active" : ""}`} aria-pressed={onlyFavorites} onClick={()=>setOnlyFavorites(!onlyFavorites)}><Heart size={17} fill={onlyFavorites ? "currentColor" : "none"}/>My favorites<span>{savedCount}</span></button>
    </div>
    <div className="category-filters" role="group" aria-label="Menu categories">{[allLabel,...options].map(c=><button key={c} aria-pressed={category === c} className={category === c ? "active" : ""} onClick={()=>change(collection,c)}>{c}</button>)}</div>
    <div id="menu-results-panel" role="tabpanel" aria-labelledby={`${collection}-tab`}>
      <div className="menu-results"><p role="status">{resultLabel}</p><span>PRICES IN USD</span></div>
      {storageError && <p role="status" className="notice">Your browser cannot save preferences right now. Favorites still work during this visit.</p>}
      <div className="drink-grid" key={`${collection}-${category}-${onlyFavorites}`}>
        {filtered.map((d,i)=><article className={`drink-card menu-item-${d.kind}`} data-kind={d.kind} key={d.id} style={{animationDelay:`${Math.min(i,5)*40}ms`}}>
          <div className="drink-image"><a className="drink-open" href={`/menu/${d.id}/?lang=${language}`} target="_blank" rel="noopener" aria-label={`${t(d.name)}${d.signature ? ` — ${t("VELUNE SIGNATURE")}` : ""} — ${t("Opens in a new tab")}`}><DrinkPhoto id={d.id} priority={i<3}/>{d.signature && <span className="product-label">VELUNE SIGNATURE</span>}<span className="round-arrow"><ArrowUpRight size={18}/></span></a><button className={`favorite-button ${favorites.includes(d.id) ? "saved" : ""}`} aria-label={`${favorites.includes(d.id) ? (language === "ru" ? "Убрать из избранного" : "Remove from favorites") : (language === "ru" ? "Сохранить в избранное" : "Save to favorites")}: ${t(d.name)}`} aria-pressed={favorites.includes(d.id)} onClick={()=>toggleFavorite(d.id)}><Heart size={18} fill={favorites.includes(d.id) ? "currentColor" : "none"}/></button></div>
          <p className="drink-category">{d.category}</p><div className="product-title"><h2 data-no-letters><a href={`/menu/${d.id}/?lang=${language}`} target="_blank" rel="noopener">{d.name}<span className="sr-only"> — {t("Opens in a new tab")}</span></a></h2><span>{price(d.price)}</span></div><p>{d.description}</p><span className="drink-size">{t(d.size)}<span> · </span>{d.notes.slice(0,2).map(t).join(" / ")}</span>
        </article>)}
      </div>
      {!filtered.length && <div className="empty-state"><Heart size={26}/><h2>{onlyFavorites ? "Nothing saved here yet." : "No matches."}</h2><p>{onlyFavorites ? "Use the heart to save an item." : "Try a different search or category."}</p><button className="button" onClick={()=>{setQuery("");setOnlyFavorites(false);change(collection,allLabel);}}>{collection === "drinks" ? "Show all drinks" : "Show all desserts"}<ArrowUpRight size={17}/></button></div>}
    </div>
  </section></Localized>;
}
