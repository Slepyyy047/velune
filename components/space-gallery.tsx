"use client";
import { Localized } from "@/components/language";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
const items = [
  {
    image: "space",
    alt: "A sage seating nook with warm oak and soft daylight",
    label: "A quieter corner",
  },
  {
    image: "ritual",
    alt: "A considered coffee ritual at a light-filled table",
    label: "The everyday details",
  },
  {
    image: "hero",
    alt: "The main café counter in warm stone",
    label: "The heart of the room",
  },
];
export function SpaceGallery() {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  function open(i: number, e: React.MouseEvent<HTMLButtonElement>) {
    trigger.current = e.currentTarget;
    setIndex(i);
    dialog.current?.showModal();
  }
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  return (<Localized>
    <section className="space-gallery container">
      <p className="eyebrow">A walk through the concept</p>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <button
            key={item.image}
            onClick={(e) => open(i, e)}
            aria-label={`Enlarge 0${i + 1} / ${item.label}`}
          >
            <img
              src={`/images/${item.image}.webp`}
              alt={item.alt}
              width="1100"
              height="733"
              loading="lazy"
            />
            <span>
              <span>
                0{i + 1} / {item.label}
              </span>
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-label="Interior concept image gallery"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setIndex((index + 1) % items.length);
          if (e.key === "ArrowLeft")
            setIndex((index + items.length - 1) % items.length);
        }}
      >
        <button
          className="gallery-close icon-button"
          onClick={close}
          aria-label="Close gallery"
        >
          <X />
        </button>
        <img
          src={`/images/${items[index].image}.webp`}
          alt={items[index].alt}
          width="1100"
          height="733"
        />
        <div className="gallery-controls">
          <button
            className="icon-button"
            aria-label="Previous image"
            onClick={() => setIndex((index + items.length - 1) % items.length)}
          >
            <ArrowLeft />
          </button>
          <p aria-live="polite">
            {index + 1} / 3 — {items[index].label}
          </p>
          <button
            className="icon-button"
            aria-label="Next image"
            onClick={() => setIndex((index + 1) % items.length)}
          >
            <ArrowRight />
          </button>
        </div>
      </dialog>
    </section>
  </Localized>);
}
