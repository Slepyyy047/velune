> Historical specification — superseded on 17 October 2026. The owner requested complete removal of the interactive 3D cup. No 3D assets or scenes are used in the current application; this document is retained only as project history.

# VELUNE — 3D asset audit and production specification

## Delivered vs. final visual standard

The interactive scene is an **authored design study**, not a certified photorealistic production asset. The app labels it accordingly. No primitive grinder, fake liquid stream, or generated still is claimed to be a professional model or fluid simulation.

| Asset | Delivered | Outstanding |
| --- | --- | --- |
| Sage Edition cup | Original GLB, 13 meshes, 23,680 triangles, 1,037,036 bytes; source generator retained | Manufacturer dimensions, calibrated material scans, physically validated printed color, production art review |
| Cup body | Tapered lathed surface, separate inner wall, folded foot, recessed base, rolled rim, paper overlap seam | Real seam adhesive details, calibrated 0.3–0.5 mm stock thickness, real-world tolerances |
| Graphite lid | Compound snap collar, raised drinking wall, recessed top, actual sip aperture, pressure vent, molded rings | A real tooling reference, underside snap mechanism and embossed production marks |
| Cup materials | Runtime 2048×1024 wordmark map; deterministic procedural grain/bump; rough matte PBR | Scanned paper fiber, calibrated roughness/normal maps, print absorption and subtle imperfections |
| Coffee beans | 36 instanced creased bean meshes, size/orientation variation, reversible deterministic fall formula | Multiple scanned geometries, albedo/normal/roughness, cached rigid-body simulation with bean-to-bean collision |
| Grinder | Contextual still and interactive grind-size explanation | Licensed or commissioned professional burr-grinder GLB and prepared mechanism animation |
| Espresso | Generated editorial espresso still, explicitly labeled | Licensed/commissioned precomputed extraction footage or fluid render |
| Lighting | Procedural studio environment with area-light forms, key/fill/rim, soft contact shadow | Calibrated color-managed HDRI and photographic lighting match |

The hero uses the product still as its restrained secondary accent; there is no live homepage 3D cup. Scroll beans on the home page are decorative CSS illustrations. The full 3D study is route-lazy-loaded and activated deliberately. The bean scene uses simplified contact and does not claim a complete collision simulation.

## Cup production brief

1. **Reference and scale:** commission a real 355 ml paper cup and compatible lid, or obtain dimensioned supplier drawings with visualization permission. Work in meters. Validate top/bottom diameters, wall taper, rim radius, lid retention, sip opening and assembled height against physical samples. Preserve a dimension sheet and unbranded turntable reference.
2. **Geometry:** model an actual sheet wall with an overlapping seam and rolled paper rim. Build recessed bottom insert and folded base separately. Subdivide only silhouette-critical edges. Lid needs a real snap flange, raised lip, recessed drink well, rounded slot, vent and underside. Keep the assembled origin centered on its ground plane. Use bevel radii consistent with manufacturing, not cosmetic highlights.
3. **UV mapping:** unwrap the paper side as a frustum sector, with seam behind the logo. Validate a checker texture from front, sides and macro angles. Print wordmark from vector typography at physical dimensions; bake into albedo so it follows curvature and cannot float. Separate internal paper, base, and lid islands; ensure consistent texel density.
4. **Materials:** create color-managed base color, tangent-space normal and roughness maps from scanned paper. Keep albedo free of baked lighting. Use approximately 0.82–0.95 paper roughness as an initial range and tune against photographs. Lid roughness should remain matte, with only controlled soft reflections. Add submillimeter fiber variation, barely perceptible seam displacement, and a restrained roughness variation in printed ink. No metallic paper, artificial bloom or polished plastic body.
5. **Texture/export:** deliver source textures at 4K; runtime 2K cup textures on desktop and 1K on mobile. Export GLB with named meshes/materials, correct normals, transforms applied, meters documented, and no cameras or lights baked accidentally. Produce KTX2/Basis variants and Meshopt compression after visual comparison. Target 30–60k triangles desktop, 12–25k mobile; total compressed model/textures ideally under 2 MB. Test target quality rather than assuming compression is visually lossless.
6. **Lighting:** broad soft key, low fill, gentle back rim, and a neutral studio HDR environment. Match white balance across still fallback and real-time render. Use soft contact shadows and avoid excessively dark ambient occlusion. Compare 8 turntable angles and 3 macro views at desktop and phone DPR.
7. **Animation:** export a brief settling turn with the same final pose as the manual camera. Ease the handoff to orbit controls; never reset camera abruptly. Keep zoom limits tied to cup bounds. Provide labeled front, rim, paper, reset, rotate and zoom controls, all keyboard operable. Test touch rotation, image mode, reduced motion, context loss and route unmount.

## Bean and grinder production brief

- Scan at least five different roasted beans, including asymmetrical creases and realistic color variation. Keep individual source scans and licenses. Generate LODs and share atlas textures. Instance repeated meshes; target 30–50 active beans mobile and 80–150 desktop only after profiling.
- Model or license an identifiable **professional burr grinder** from a validated industrial reference with permission. Required components: transparent hopper with sensible wall thickness, bean gate, adjustment ring, burr chamber, motor housing, portafilter fork and grounds chute. Avoid fantasy mechanical arrangements. Maintain separable moving parts and sane pivots.
- Precompute rigid-body trajectories at fixed steps with gravity, hopper collisions and bean interactions. Export positions/quaternions or bake animation at 30–60 fps. Scrub by absolute progress; never advance a fresh physics simulation in response to scrolling. Validate forward/reverse frames for identical transforms.
- Animate visible burr rotation and grounds emission based on a technically plausible cutaway or clearly explain when internals are a diagram. Bake ground particles and use efficient instancing. Do not imply a realistic grinding mechanism merely by spinning a decorative cylinder.
- Prepare three camera shots: hopper, mechanism detail, and portafilter. Use one shared camera path with controlled transitions. Provide mobile-safe composition and a still alternative for every stage.

## Espresso extraction production brief

Commission macro footage of a real machine extraction or a professional offline liquid simulation. Obtain explicit web-hosting/editing rights; record author, source and license. Include a locked shot and a matched product-camera angle. Requirements: caramel color variation, believable stream thickness and breakup, viscous behavior, highlights, crema, and a stable receiver. Deliver a color reference, clean master, WebM/MP4 variants, poster, duration and frame rate. Avoid autoplay audio. A 4–7 second segment should have a clear visual beginning and endpoint; if scroll-scrubbed video seeks unreliably, use an optimized image sequence with prefetch bounds and fallback.

Composite or align it with 3D portafilter/cup assets only after verifying perspective and lighting. The UI must call footage footage; it is not interactive real-time fluid simulation. Transition through a short lavender studio environment into the Sage cup reveal without sudden camera discontinuities.

## Acceptance gate

Review against physical reference, UV checker, logo curvature, matte surface response, shadow softness, aperture geometry and silhouette. Capture 1440, 768 and 390 px views. Profile rendering on an actual midrange phone and a desktop GPU; document FPS percentiles, memory and texture counts before setting final budgets. Run keyboard, reduced-motion, WebGL-disabled and context-loss cases. Obtain asset-license sign-off before public commercial launch. Until these assets and measurements exist, the photorealistic Coffee Journey remains incomplete.
