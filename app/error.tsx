"use client";
import { Localized } from "@/components/language";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Localized><main id="main" className="not-found container">
      <p className="eyebrow">A brief interruption</p>
      <h1>
        Let’s try that
        <br />
        <em>once more.</em>
      </h1>
      <p>
        Something did not load as expected. Your saved favorites stay in this
        browser.
      </p>
      <button className="button" onClick={reset}>
        Try again
      </button>
      <a className="text-link" href="/">
        Return home ↗
      </a>
    </main></Localized>
  );
}
