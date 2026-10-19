import type { Metadata } from "next";
import { Localized } from "@/components/language";
import { PhotoPanel } from "@/components/photo-panel";
import { MenuBrowser } from "@/components/menu-browser";
export const metadata: Metadata = {title:"Pastries & desserts",description:"18 pastries, cakes, cookies and chilled desserts. See prices, portions, ingredients and allergens."};
export default function Desserts() {
  return <Localized><main id="main" className="bakery-menu-page">
    <PhotoPanel image="coffee-croissant" alt="Cappuccino and a butter croissant on a ceramic plate" label="THE BAKERY MENU" title={<>Pastries & <em>cake.</em></>} heading="h1" priority className="photo-panel--menu photo-panel--bakery">Croissants, cakes, cookies and chilled desserts.</PhotoPanel>
    <MenuBrowser initialCollection="desserts"/>
    <div className="menu-disclosure container"><p>Concept menu · USD pricing. Check each item for ingredients and allergens. Shared preparation space; cross-contact is possible. No orders or payments are accepted.</p></div>
  </main></Localized>;
}
