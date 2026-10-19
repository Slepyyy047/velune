import { Localized } from "@/components/language";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui";
import { PhotoPanel } from "@/components/photo-panel";
import { SpaceGallery } from "@/components/space-gallery";
export const metadata: Metadata = { title: "The café", description: "See the VELUNE café concept: a coffee counter, window seats and warm, simple interiors. Fictional location in Osaka." };
export default function Visit() {
  return <Localized><main id="main" className="cafe-visit">
    <PhotoPanel image="hero" alt="The VELUNE café concept with a stone counter and warm oak furniture" label="THE CAFÉ · OSAKA CONCEPT" title={<>Take a<br/><em>seat.</em></>} heading="h1" priority className="photo-panel--visit photo-panel--uncropped"/>
    <section className="cafe-visit-info container" data-reveal>
      <div><p className="eyebrow">AROUND THE ROOM</p><h2>A seat for everyone.</h2><p>Green upholstered benches, wooden stools and small tables by the windows. Take a look through the gallery.</p></div>
      <aside><h3>About this location</h3><p>VELUNE is a fictional café concept set in Osaka, Japan. There is no physical address or opening schedule. The interior and drink images are generated concept visuals.</p><ButtonLink href="/menu/">See the menu</ButtonLink></aside>
    </section>
    <SpaceGallery/>
  </main></Localized>;
}
