"use client";
import manifest from "@/data/drink-photo-manifest.json";
import { drinks } from "@/data/menu";
import { useLanguage } from "@/components/language";
export function DrinkPhoto({ id, priority = false, detail = false, fullSize = false }: { id: string; priority?: boolean; detail?: boolean; fullSize?: boolean }) {
  const photo = manifest[id as keyof typeof manifest];
  const { t } = useLanguage();
  const name = drinks.find(d => d.id === id)?.name || id;
  if (!photo) return null;
  return <div className={`drink-photo ${detail ? "is-detail" : ""}`} data-drink-photo={id}>
    <picture>
      {!fullSize && <source media="(max-width:600px)" srcSet={photo.sheet.replace(".webp", "-800.webp")} />}
      <img src={fullSize ? photo.sheet : photo.sheet.replace(".webp", "-960.webp")} alt={`${t(name)} — ${t("Concept photography")}`} width="1254" height="1254" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "low"} style={{ left: `${photo.column * -100}%`, top: `${photo.row * -100}%` }} />
    </picture>
  </div>;
}
