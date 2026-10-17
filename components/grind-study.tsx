"use client";
import { Localized } from "@/components/language";
import { useState } from "react";
const guides = [
  {
    label: "Fine",
    method: "Espresso",
    body: "Small particles create the resistance a pressurized brew needs. A little adjustment can make a large difference.",
    time: "About 25–35 seconds",
  },
  {
    label: "Medium-fine",
    method: "AeroPress",
    body: "A little coarser than espresso. Immersion time and gentle pressure work together; recipes vary considerably.",
    time: "About 1–3 minutes",
  },
  {
    label: "Medium",
    method: "Pour-over",
    body: "A useful starting point for a paper-filter dripper. Refine the grind by how the cup tastes and how the water flows.",
    time: "About 2½–4 minutes",
  },
  {
    label: "Coarse",
    method: "Cold brew",
    body: "Larger particles suit a long immersion and make filtration easier. Steep time, temperature, and ratio still matter.",
    time: "About 12–18 hours",
  },
];
export function GrindStudy() {
  const [grind, setGrind] = useState(2);
  const guide = guides[grind];
  return (<Localized>
    <section className="grind-study" id="grind">
      <div className="container grind-layout">
        <div>
          <p className="eyebrow">A hands-on coffee note</p>
          <h2>
            A change in grind.
            <br />A change in <em>character.</em>
          </h2>
          <p>
            Move through four starting points to see how grind size relates to
            the way you brew.
          </p>
          <label htmlFor="grind-size">
            Explore the grind <span>{guide.label}</span>
          </label>
          <input
            id="grind-size"
            type="range"
            min="0"
            max="3"
            step="1"
            value={grind}
            onChange={(e) => setGrind(Number(e.target.value))}
            aria-valuetext={`${guide.label}, ${guide.method}`}
          />
          <div className="range-labels">
            <span>Fine</span>
            <span>Coarse</span>
          </div>
          <div className="grind-explanation" aria-live="polite">
            <h3>{guide.method}</h3>
            <p>{guide.body}</p>
            <span>{guide.time} · illustrative starting range</span>
          </div>
        </div>
        <div className="grind-visual">
          <img
            src="/images/beans.webp"
            alt="Roasted coffee beans before grinding"
            width="1100"
            height="733"
            loading="lazy"
          />
          <div className="grounds" aria-hidden="true">
            {Array.from({ length: 48 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${8 + ((i * 37) % 85)}%`,
                  top: `${8 + ((i * 23) % 80)}%`,
                  width: 3 + grind * 3,
                  height: 2 + grind * 2,
                  transform: `rotate(${i * 43}deg)`,
                }}
              />
            ))}
          </div>
          <span className="grind-caption">
            GRIND-SIZE STUDY · STYLIZED ILLUSTRATION
          </span>
        </div>
      </div>
    </section>
  </Localized>);
}
