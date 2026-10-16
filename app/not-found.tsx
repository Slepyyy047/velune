import { ButtonLink } from "@/components/ui";
export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <p className="eyebrow">404 · A little detour</p>
      <h1>
        This corner is
        <br />
        still <em>unwritten.</em>
      </h1>
      <p>
        The page you are looking for is not here. There is always a good place
        to begin again.
      </p>
      <ButtonLink href="/">Back to VELUNE</ButtonLink>
    </main>
  );
}
