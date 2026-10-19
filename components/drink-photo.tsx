"use client";
import manifest from "@/data/drink-photo-manifest.json";
import { menuItems } from "@/data/catalogue";
import { useLanguage } from "@/components/language";
export function DrinkPhoto({ id, priority = false, detail = false, fullSize = false }: { id: string; priority?: boolean; detail?: boolean; fullSize?: boolean }) {
  const photo = (manifest as Record<string,{sheet:string;column:number;row:number;detailRow?:number}>)[id];
  const { t } = useLanguage();
  const name = menuItems.find(d => d.id === id)?.name || id;
  if (!photo) return null;
  return <div className={`drink-photo ${detail ? "is-detail" : ""}`} data-drink-photo={id}>
    <picture>
      {!fullSize && <source media="(max-width:600px)" srcSet={photo.sheet.replace(".webp", "-800.webp")} />}
      <img src={fullSize ? photo.sheet : photo.sheet.replace(".webp", "-960.webp")} alt={`${t(name)} — ${t("Concept photography")}`} width="1254" height="1254" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "low"} style={{ left: `${photo.column * -100}%`, top: `${(detail && photo.detailRow !== undefined ? photo.detailRow : photo.row) * -100}%` }} />
    </picture>
  </div>;
}
