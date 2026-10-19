import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { menuItems } from "@/data/catalogue";
import { price } from "@/data/menu";
import { Localized } from "@/components/language";
import { DrinkPhoto } from "@/components/drink-photo";
export function MenuPreviewCard({ id, compact=false }: {id:string;compact?:boolean}) {
  const item=menuItems.find(d=>d.id===id);
  if(!item)return null;
  return <Localized><Link prefetch={false} className={`menu-preview-card ${compact ? "is-compact" : ""}`} href={`/menu/${id}/`} target="_blank" rel="noopener">
    <div className="preview-photo"><DrinkPhoto id={id}/></div>
    <div className="preview-copy"><h3>{item.name}</h3><p>{item.description}</p><div className="preview-meta"><span>{price(item.price)}</span><small>{item.size}</small><span className="preview-arrow"><ArrowUpRight size={18}/></span></div></div>
    <span className="sr-only">Opens in a new tab</span>
  </Link></Localized>;
}
