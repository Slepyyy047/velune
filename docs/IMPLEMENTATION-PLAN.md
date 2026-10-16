# Implementation plan and decisions

1. Inspect workspace: no existing repository/app/assets were supplied. Initialize a new isolated Next.js project in `/workspace/sites/velune`.
2. Establish brand: cream editorial surfaces, Instrument Serif + Manrope, sage and lavender accents, a real HTML `velune.` hero wordmark and architectural concept imagery.
3. Complete core content first: six primary routes, five journal articles, exactly 20 typed drinks, responsive navigation, accessible dialogs, search/filtering, local favorites, image gallery, concept disclosures.
4. Add motion: immediate CSS hero entrance and GSAP scroll reveals, reversible scroll bean accent, small magnetic link displacement, optional pointer ring, nonblocking route wash, a real 3D-loading indicator and explicit sound opt-in.
5. Audit 3D inputs: none supplied. Author a detailed parametric GLB cup, original deterministic bean study and studio lights. Provide image fallback. Do not present missing professional grinder/extraction assets as implemented; preserve an explicit production specification.
6. Optimize: local WebP/fonts, responsive hero, lazy images and dynamic 3D, request-based rendering, mobile DPR ceiling, 36 instanced beans, static page generation, clean unmount behavior.
7. QA: strict TypeScript, production build, Chromium functional tests at desktop/mobile, screenshots at 1440/768/390, axe checks, Lighthouse production measurements, WebGL unavailable/blocked storage/reduced motion tests.
8. Package source and static export, record evidence and limitations, and provide run instructions. Hosted publication depends on the supported Sites source/packaging helpers; those helpers were absent from this executor when inspected. No Site registration or deployment is claimed.

## Deliberate implementation choices

- Use static Next.js export because every requested behavior is browser-local and there is no genuine backend to configure.
- Use one custom CSS design system instead of adding unused Tailwind tooling. Use GSAP for timeline/scroll and CSS for simple transitions; no overlapping animation frameworks.
- Use generated concept photography, clearly identified, to avoid pretending to show an actual café or real suppliers.
- Use representative image categories on the menu, with an explicit disclosure; there are not twenty unique photographed recipes.
- Load 3D on the Experience route and activate the cup deliberately. The homepage retains an editorial product still rather than shipping WebGL in the critical path.
- Preserve production asset gaps explicitly instead of substituting primitive machines or fake liquid motion.
