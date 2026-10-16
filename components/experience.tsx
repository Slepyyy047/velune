"use client";
import dynamic from "next/dynamic";
import { SceneLoading } from "./scene-loading";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Plus,
  Minus,
  Move,
  Play,
  Pause,
  Image as ImageIcon,
  Box,
} from "lucide-react";
import type { CupView } from "./three/cup-scene";
const CupScene = dynamic(() => import("./three/cup-scene"), {
  ssr: false,
  loading: () => <SceneLoading />,
});
const BeanScene = dynamic(() => import("./three/bean-scene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
const chapters = [
  {
    label: "The bean",
    title: "Small beginnings.",
    description:
      "Every coffee starts with a seed. Origin, processing, and roasting shape what it can become.",
    image: "beans",
    note: "Procedural bean study · deterministic trajectories, simplified contact",
    eyebrow: "01 / POTENTIAL",
  },
  {
    label: "The grind",
    title: "A matter of detail.",
    description:
      "Grinding creates the surface the water will meet. Particle size, consistency, and freshness all influence the cup.",
    image: "beans",
    note: "Concept still · professional grinder animation is not available",
    eyebrow: "02 / PREPARATION",
  },
  {
    label: "The extraction",
    title: "A brief transformation.",
    description:
      "Water draws flavor and aroma from the grounds. In espresso, pressure creates a concentrated cup crowned by crema.",
    image: "espresso",
    note: "Illustrative concept still · not extraction footage or a fluid simulation",
    eyebrow: "03 / EXPRESSION",
  },
  {
    label: "Your ritual",
    title: "A softer kind of ritual.",
    description:
      "The journey ends in your hands. Meet our Sage Edition cup: quiet color, tactile paper, and a considered silhouette.",
    image: "cup",
    note: "Authored 3D design study · final manufacturing and material validation pending",
    eyebrow: "04 / SAGE EDITION",
  },
];
function canWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2") || c.getContext("webgl");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
export function CoffeeExperience() {
  const [stage, setStage] = useState(3),
    [playing, setPlaying] = useState(false),
    [interactive, setInteractive] = useState(false),
    [webgl, setWebgl] = useState<boolean | null>(null),
    [failed, setFailed] = useState(false),
    [ready, setReady] = useState(false),
    [rotation, setRotation] = useState(0),
    [zoom, setZoom] = useState(1),
    [view, setView] = useState<CupView>("front"),
    [reset, setReset] = useState(0),
    [reduced, setReduced] = useState(false),
    [progress, setProgress] = useState(0.72);
  const viewport = useRef<HTMLDivElement>(null);
  const chapter = chapters[stage];
  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const change = () => setReduced(m.matches);
    m.addEventListener("change", change);
    setWebgl(typeof window.WebGLRenderingContext !== "undefined");
    return () => m.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStage((s) => {
        if (s >= 3) {
          setPlaying(false);
          return 3;
        }
        return s + 1;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => {
    if (stage !== 0 || !playing || reduced) return;
    let frame: number;
    const start = performance.now();
    function tick(now: number) {
      setProgress(Math.min(1, (now - start) / 3500));
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stage, playing, reduced]);
  useEffect(() => {
    if (stage !== 3) setInteractive(false);
  }, [stage]);
  function select(s: number) {
    setPlaying(false);
    if (s === 0) setWebgl(canWebGL());
    setStage(s);
  }
  function resetCamera() {
    setRotation(0);
    setZoom(1);
    setView("front");
    setReset((x) => x + 1);
  }
  function error() {
    setFailed(true);
    setInteractive(false);
  }
  const fallback = (
    <img
      className="experience-still"
      src={`/images/${chapter.image}.webp`}
      alt={
        stage === 3
          ? "VELUNE Sage Edition cup concept photograph"
          : stage === 2
            ? "Illustrative espresso with crema"
            : "Roasted coffee bean concept photograph"
      }
      width="1200"
      height="800"
      fetchPriority="high"
    />
  );
  return (
    <div className="coffee-experience container">
      <div className="journey-nav" aria-label="Coffee journey chapters">
        {chapters.map((c, i) => (
          <button
            key={c.label}
            className={stage === i ? "active" : ""}
            aria-pressed={stage === i}
            onClick={() => select(i)}
          >
            <span>0{i + 1}</span>
            {c.label}
            <span className="chapter-dot" />
          </button>
        ))}
      </div>
      <div className="experience-stage">
        <div
          className="experience-visual"
          ref={viewport}
          tabIndex={interactive ? 0 : -1}
          role={interactive ? "region" : undefined}
          aria-label={
            interactive
              ? "Interactive cup. Use arrow keys to rotate, plus and minus to zoom, and R to reset."
              : undefined
          }
          onKeyDown={(e) => {
            if (!interactive) return;
            if (
              ["ArrowLeft", "ArrowRight", "+", "-", "=", "r", "R"].includes(
                e.key,
              )
            ) {
              e.preventDefault();
              if (e.key === "ArrowLeft") setRotation((v) => v - 0.22);
              if (e.key === "ArrowRight") setRotation((v) => v + 0.22);
              if (e.key === "+" || e.key === "=")
                setZoom((v) => Math.max(0.65, +(v - 0.1).toFixed(2)));
              if (e.key === "-")
                setZoom((v) => Math.min(1.3, +(v + 0.1).toFixed(2)));
              if (e.key.toLowerCase() === "r") resetCamera();
            }
          }}
        >
          {stage === 3 && interactive && webgl && !failed ? (
            <SceneBoundary onError={error} fallback={fallback}>
              <CupScene
                rotation={rotation}
                zoom={zoom}
                view={view}
                reset={reset}
                reduced={reduced}
                onReady={() => setReady(true)}
                onError={error}
              />
            </SceneBoundary>
          ) : stage === 0 && webgl && !failed ? (
            <SceneBoundary onError={error} fallback={fallback}>
              <BeanScene progress={progress} />
            </SceneBoundary>
          ) : (
            fallback
          )}
          <span className="scene-edition">
            {stage === 3 ? "VELUNE OBJECTS — 001" : chapter.eyebrow}
          </span>
          {stage === 3 && !interactive && webgl && !failed && (
            <button
              className="enter-model button"
              onClick={async () => {
                if (!canWebGL()) { setWebgl(false); return; }
                await document.fonts.load('220px "Velune Product Serif"');
                setInteractive(true);
                setReady(false);
                setTimeout(() => viewport.current?.focus(), 100);
              }}
            >
              <Box size={16} />
              Explore in 3D
            </button>
          )}
          {stage === 3 && interactive && (
            <span className="scene-hint">
              <Move size={13} />
              {ready ? "Drag to rotate · controls below" : "Loading geometry…"}
            </span>
          )}
          {(failed || webgl === false) && (
            <span className="fallback-note">
              Image mode — 3D is unavailable on this device.
            </span>
          )}
        </div>
        <div className="experience-copy" key={stage}>
          <p className="eyebrow">{chapter.eyebrow}</p>
          <h2>{chapter.title}</h2>
          <p>{chapter.description}</p>
          {stage === 3 ? (
            <>
              <dl className="cup-specs">
                <div>
                  <dt>Color</dt>
                  <dd>
                    <i />
                    Sage green
                  </dd>
                </div>
                <div>
                  <dt>Body</dt>
                  <dd>Matte paper study</dd>
                </div>
                <div>
                  <dt>Finish</dt>
                  <dd>Graphite lid & wordmark</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>12 oz / 355 ml concept</dd>
                </div>
              </dl>
              {interactive && (
                <div
                  className="inspection-tabs"
                  aria-label="Cup inspection views"
                >
                  {(["front", "rim", "paper"] as CupView[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      aria-pressed={view === v}
                      className={view === v ? "active" : ""}
                    >
                      {v === "front"
                        ? "The silhouette"
                        : v === "rim"
                          ? "Lid details"
                          : "Paper & print"}
                    </button>
                  ))}
                </div>
              )}
              <p className="scene-disclosure">{chapter.note}</p>
            </>
          ) : (
            <>
              <div className="chapter-fact">
                <span>
                  {stage === 0
                    ? "The shape of possibility"
                    : stage === 1
                      ? "A useful starting point"
                      : "Taste, then adjust"}
                </span>
                <p>
                  {stage === 0
                    ? "Natural variation is part of coffee. This simplified instanced scene lets you scrub the same falling paths forward and backward."
                    : stage === 1
                      ? "A fine grind suits espresso. A medium grind is a starting point for pour-over. The ideal setting changes with the coffee and recipe."
                      : "Dose, yield, grind, and temperature work together. Crema is beautiful, but balance in the cup matters more than appearance."}
                </p>
              </div>
              <p className="scene-disclosure">{chapter.note}</p>
            </>
          )}
          <div className="journey-actions">
            <button
              className="text-link"
              onClick={() => {
                if (playing) setPlaying(false);
                else {
                  setInteractive(false);
                  setWebgl(canWebGL());
                  setStage(0);
                  setProgress(0);
                  setPlaying(true);
                }
              }}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}{" "}
              {playing ? "Pause journey" : "Play the journey"}
            </button>
            <button
              className="icon-button"
              aria-label="Previous journey chapter"
              disabled={stage === 0}
              onClick={() => select(stage - 1)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              className="icon-button"
              aria-label="Next journey chapter"
              disabled={stage === 3}
              onClick={() => select(stage + 1)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      {stage === 3 && interactive && (
        <div className="model-controls">
          <div>
            <button
              className="icon-button"
              aria-label="Rotate cup left"
              onClick={() => setRotation((v) => v - 0.35)}
            >
              <ArrowLeft size={17} />
            </button>
            <span>Rotate</span>
            <button
              className="icon-button"
              aria-label="Rotate cup right"
              onClick={() => setRotation((v) => v + 0.35)}
            >
              <ArrowRight size={17} />
            </button>
          </div>
          <div>
            <button
              className="icon-button"
              aria-label="Zoom out"
              disabled={zoom >= 1.3}
              onClick={() =>
                setZoom((v) => Math.min(1.3, +(v + 0.1).toFixed(2)))
              }
            >
              <Minus size={17} />
            </button>
            <span>Zoom</span>
            <button
              className="icon-button"
              aria-label="Zoom in"
              disabled={zoom <= 0.65}
              onClick={() =>
                setZoom((v) => Math.max(0.65, +(v - 0.1).toFixed(2)))
              }
            >
              <Plus size={17} />
            </button>
          </div>
          <button className="control-text" onClick={resetCamera}>
            <RotateCcw size={15} />
            Reset view
          </button>
          <button
            className="control-text"
            onClick={() => setInteractive(false)}
          >
            <ImageIcon size={15} />
            Image view
          </button>
        </div>
      )}
      {stage === 0 && (
        <div className="bean-scrubber">
          <label htmlFor="bean-progress">
            Explore the fall <span>{Math.round(progress * 100)}%</span>
          </label>
          <input
            type="range"
            id="bean-progress"
            min="0"
            max="100"
            value={Math.round(progress * 100)}
            onChange={(e) => {
              setPlaying(false);
              setProgress(Number(e.target.value) / 100);
            }}
          />
          <p>
            The same cached formula at every position. Drag back to reverse.
          </p>
        </div>
      )}
      <p className="experience-footnote">
        A visual concept, made to explore. Photographic stills and 3D studies
        are labeled separately. Sound is optional and off by default.
      </p>
    </div>
  );
}
