import { Localized } from "@/components/language";
import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { MenuBrowser } from "@/components/menu-browser";
export const metadata: Metadata = {
  title: "The menu",
  description:
    "Explore 20 thoughtful coffee and tea drinks. Filter the concept menu, discover ingredients, and save your favorites.",
};
export default function Menu() {
  return (
    <Localized><main id="main">
      <PageIntro
        label="The VELUNE menu"
        title={
          <>
            Coffee & <em>more.</em>
          </>
        }
        description="Espresso, filter, iced coffee and matcha. Find a drink, check the ingredients, save your favorites."
      />
      <MenuBrowser />
      <section className="menu-footer container">
        <span className="serif">
          Hot or iced.
          <br />
          Milk or oat.
        </span>
        <div>
          <h2 className="eyebrow">A note on your cup</h2>
          <p>
            Concept pricing in USD. Oat alternatives are illustrative options,
            not an ordering service. All drinks are prepared in a shared-space
            concept; cross-contact cannot be ruled out. Images illustrate drink
            styles and may not show the exact recipe.
          </p>
          <p>This is a fictional menu. No orders or payments are accepted.</p>
        </div>
      </section>
    </main></Localized>
  );
}
