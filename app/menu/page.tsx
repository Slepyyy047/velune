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
    <main id="main">
      <PageIntro
        label="The VELUNE menu"
        title={
          <>
            A cup for <em>your kind of day.</em>
          </>
        }
        description="Familiar favorites, thoughtful signatures, and a little room to try something new."
      />
      <MenuBrowser />
      <section className="menu-footer container">
        <span className="serif">
          Made with care.
          <br />
          Enjoyed at your pace.
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
    </main>
  );
}
