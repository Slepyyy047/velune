"use client";
import { Children, cloneElement, createContext, isValidElement, useContext, useEffect, useState, type ReactNode, type ReactElement } from "react";
import russian from "@/data/ru.json";
import additions from "@/data/ru-additions.json";

type Language = "en" | "ru";
const dictionary: Record<string, string> = { ...russian, ...additions };
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_: Language) => {}, t: (s: string) => s });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try {
      const requested = new URLSearchParams(location.search).get("lang");
      const stored = localStorage.getItem("velune-language");
      const initial = requested === "ru" || requested === "en" ? requested : stored;
      if (initial === "ru" || initial === "en") {
        setLanguage(initial);
        document.documentElement.lang = initial;
      }
    } catch {}
    const sync = (e: StorageEvent) => {
      if (e.key === "velune-language" && (e.newValue === "en" || e.newValue === "ru")) {
        setLanguage(e.newValue); document.documentElement.lang = e.newValue;
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  function change(next: Language) {
    setLanguage(next);
    document.documentElement.lang = next;
    try { localStorage.setItem("velune-language", next); } catch {}
    // Keep a shared detail-page URL in step with an explicit language change.
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) { url.searchParams.set("lang", next); history.replaceState(null, "", url); }
  }
  function t(text: string) {
    if (language === "en") return text;
    const key = text.replace(/\s+/g, " ").trim();
    const translated = dictionary[key];
    if (translated) return `${/^\s/.test(text) ? " " : ""}${translated}${/\s$/.test(text) ? " " : ""}`;
    return text.replace(/\bMIN READ\b/g, "МИН ЧТЕНИЯ").replace(/\bml\b/g, "мл").replace(/\bg\b/g, "г");
  }
  return <LanguageContext.Provider value={{ language, setLanguage: change, t }}>{children}</LanguageContext.Provider>;
}
export const useLanguage = () => useContext(LanguageContext);
export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-switch" role="group" aria-label={language === "ru" ? "Язык сайта" : "Site language"}>
    <button lang="en" onClick={() => setLanguage("en")} aria-pressed={language === "en"} aria-label="EN — English">EN</button>
    <span aria-hidden="true">/</span>
    <button lang="ru" onClick={() => setLanguage("ru")} aria-pressed={language === "ru"} aria-label="RU — Русский">RU</button>
  </div>;
}
function Letters({ text }: { text: string }) {
  return <span className="letter-line">{text.split(/(\s+)/).map((word, i) => /^\s+$/.test(word) ? word : <span className="letter-word" key={i}>{Array.from(word).map((letter, j) => <span className="letter" key={j}>{letter}</span>)}</span>)}</span>;
}
/** Translates server-rendered host elements without mutating React-owned DOM.
 * Interactive islands use the same boundary for their own rendered content. */
export function Localized({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  function walk(nodes: ReactNode, letters = false): ReactNode {
    return Children.map(nodes, (node) => {
      if (typeof node === "string") return letters && node.trim() ? <Letters text={t(node)} /> : t(node);
      if (!isValidElement(node)) return node;
      const element = node as ReactElement<Record<string, unknown>>;
      // Walk children (including Link) without executing component functions.
      // Interactive islands translate data generated inside their own render.
      const props: Record<string, unknown> = {};
      for (const key of ["alt", "title", "placeholder", "aria-label", "aria-valuetext"]) {
        if (typeof element.props[key] === "string") props[key] = t(element.props[key] as string);
      }
      if (element.props.children) props.children = walk(element.props.children as ReactNode, element.props["data-no-letters"] ? false : letters || element.type === "h1" || element.type === "h2");
      return cloneElement(element, props);
    });
  }
  return <>{walk(children)}</>;
}
