import { Localized } from "@/components/language";
import type { Metadata } from "next";
import { PhotoPanel } from "@/components/photo-panel";
import { MenuBrowser } from "@/components/menu-browser";
export const metadata: Metadata = {
  title: "The menu",
  description:
    "36 coffees, teas and iced drinks, plus 18 pastries and desserts. See prices, ingredients and allergens.",
};
export default function Menu() {
  return (
    <Localized><main id="main">
      <PhotoPanel image="espresso" alt="Fresh espresso in a ceramic cup on the café counter" label="The VELUNE menu" title={<>Coffee & <em>tea.</em></>} heading="h1" priority className="photo-panel--menu">36 drinks. Espresso, matcha, iced coffee and a few new favorites.</PhotoPanel>
      <MenuBrowser />
      <div className="menu-disclosure container"><p>Concept menu · USD pricing. Check each item for ingredients and allergens. Shared preparation space; cross-contact is possible. No orders or payments are accepted.</p></div>
    </main></Localized>
  );
}
