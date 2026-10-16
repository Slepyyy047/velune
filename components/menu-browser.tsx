"use client";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Heart, X, ArrowUpRight } from "lucide-react";
import { drinks, categories, price, type Drink } from "@/data/menu";
function DrinkFromQuery({onOpen}: {onOpen: (drink: Drink) => void}) {
  const params = useSearchParams();
  useEffect(() => {
    const drink = drinks.find(d => d.id === params.get("drink"));
    if (drink) onOpen(drink);
  }, [params, onOpen]);
  return null;
}
export function MenuBrowser() {
  const [category, setCategory] = useState("All drinks"),
    [query, setQuery] = useState(""),
    [favorites, setFavorites] = useState<string[]>([]),
    [onlyFavorites, setOnlyFavorites] = useState(false),
    [selected, setSelected] = useState<Drink | null>(null),
    [storageError, setStorageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null),
    lastFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("velune-favorites") || "[]",
      );
      if (Array.isArray(saved))
        setFavorites(saved.filter((id) => drinks.some((d) => d.id === id)));
    } catch {
      setStorageError(true);
    }
  }, []);
  const openDrink = useCallback((drink: Drink) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelected(drink);
  }, []);
  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    } else if (dialog.current?.open) dialog.current.close();
  }, [selected]);
  function close() {
    setSelected(null);
    lastFocus.current?.focus();
  }
  function toggleFavorite(id: string) {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      try {
        localStorage.setItem("velune-favorites", JSON.stringify(next));
      } catch {
        setStorageError(true);
      }
      return next;
    });
  }
  const filtered = drinks.filter(
    (d) =>
      (category === "All drinks" || d.category === category) &&
      (!onlyFavorites || favorites.includes(d.id)) &&
      `${d.name} ${d.description} ${d.ingredients.join(" ")} ${d.notes.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <section className="menu-browser container">
      <Suspense fallback={null}><DrinkFromQuery onOpen={openDrink}/></Suspense>
      <div className="menu-toolbar">
        <label className="search-field">
          <Search size={18} />
          <span className="sr-only">Search the menu</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your next favorite…"
            type="search"
          />
          {query && (
            <button
              className="icon-button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </label>
        <button
          className={`favorite-filter ${onlyFavorites ? "active" : ""}`}
          aria-pressed={onlyFavorites}
          onClick={() => setOnlyFavorites(!onlyFavorites)}
        >
          <Heart size={17} fill={onlyFavorites ? "currentColor" : "none"} />
          My favorites <span>{favorites.length}</span>
        </button>
      </div>
      <div className="category-filters" aria-label="Drink categories">
        {["All drinks", ...categories].map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            className={category === c ? "active" : ""}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="menu-results">
        <p role="status">
          {filtered.length} {filtered.length === 1 ? "drink" : "drinks"} to
          savor
        </p>
        <span>CONCEPT MENU · USD</span>
      </div>
      {storageError && (
        <p role="status" className="notice">
          Your browser cannot save preferences right now. Favorites still work
          during this visit.
        </p>
      )}
      <div className="drink-grid">
        {filtered.map((d) => (
          <article className="drink-card" key={d.id}>
            <div className="drink-image">
              <button
                className="drink-open"
                onClick={() => openDrink(d)}
                aria-label={`View ${d.name} details${d.signature ? " — VELUNE SIGNATURE" : ""}`}
              >
                <img
                  src={`/images/${d.image}.webp`}
                  alt={`${d.name} — illustrative drink photography`}
                  width="1100"
                  height="733"
                  loading="lazy"
                />
                {d.signature && (
                  <span className="product-label">VELUNE SIGNATURE</span>
                )}
                <span className="round-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </button>
              <button
                className={`favorite-button ${favorites.includes(d.id) ? "saved" : ""}`}
                aria-label={`${favorites.includes(d.id) ? "Remove" : "Save"} ${d.name} ${favorites.includes(d.id) ? "from" : "to"} favorites`}
                aria-pressed={favorites.includes(d.id)}
                onClick={() => toggleFavorite(d.id)}
              >
                <Heart
                  size={18}
                  fill={favorites.includes(d.id) ? "currentColor" : "none"}
                />
              </button>
            </div>
            <p className="drink-category">{d.category}</p>
            <div className="product-title">
              <h2>
                <button onClick={() => openDrink(d)}>{d.name}</button>
              </h2>
              <span>{price(d.price)}</span>
            </div>
            <p>{d.description}</p>
            <span className="drink-size">
              {d.size} <span>·</span> {d.notes.slice(0, 2).join(" / ")}
            </span>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Heart size={26} />
          <h2>
            {onlyFavorites
              ? "A place for your favorites."
              : "A different kind of cup?"}
          </h2>
          <p>
            {onlyFavorites
              ? "Tap the heart on a drink to keep it here."
              : "No drinks match that search. Try “oat”, “espresso”, or another category."}
          </p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All drinks");
              setOnlyFavorites(false);
            }}
          >
            Explore all 20 drinks
            <ArrowUpRight size={17} />
          </button>
        </div>
      )}
      <dialog
        ref={dialog}
        className="drink-dialog"
        onCancel={close}
        onClose={() => {
          if (selected) close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="drink-title"
      >
        {selected && (
          <div className="dialog-layout">
            <img
              className="dialog-image"
              src={`/images/${selected.image}.webp`}
              alt={`Illustrative ${selected.name}`}
              width="1100"
              height="733"
            />
            <div className="dialog-content">
              <button
                className="dialog-close icon-button"
                aria-label="Close drink details"
                onClick={close}
              >
                <X />
              </button>
              <p className="eyebrow">{selected.category}</p>
              <h2 id="drink-title">{selected.name}</h2>
              <div className="dialog-price">
                {price(selected.price)}{" "}
                <span>{selected.size} · Concept price</span>
              </div>
              <p>{selected.description}</p>
              <dl>
                <dt>In your cup</dt>
                <dd>{selected.ingredients.join(", ")}</dd>
                <dt>Tasting notes</dt>
                <dd>{selected.notes.join(" · ")}</dd>
                <dt>Dietary & allergens</dt>
                <dd>{selected.dietary}</dd>
              </dl>
              <button
                className="button"
                aria-pressed={favorites.includes(selected.id)}
                onClick={() => toggleFavorite(selected.id)}
              >
                <Heart
                  size={17}
                  fill={
                    favorites.includes(selected.id) ? "currentColor" : "none"
                  }
                />
                {favorites.includes(selected.id)
                  ? "Saved to favorites"
                  : "Save to favorites"}
              </button>
              <p className="small">
                Illustrative recipe and image. Shared preparation may introduce
                allergens. This concept does not accept orders.
              </p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
