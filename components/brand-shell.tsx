"use client";
import { Localized, LanguageSwitch } from "@/components/language";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Menu as MenuIcon,
  X,
  Volume2,
  VolumeX,
  ArrowUpRight,
} from "lucide-react";
const links = [
  ["/", "Home"],
  ["/menu", "Menu"],
  ["/story", "Our story"],
  ["/experience", "The ritual"],
  ["/journal", "Journal"],
  ["/visit", "Visit us"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>("a,button");
        if (!els) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (<Localized>
    <header className={`site-header ${open ? "is-open" : ""}`} ref={ref}>
      <Link prefetch={false} href="/" className="wordmark" aria-label="Velune home">
        velune.
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.slice(1).map(([href, label]) => (
          <Link prefetch={false}
            key={href}
            href={href}
            aria-current={path.startsWith(href) ? "page" : undefined}
          >
            {label}
            {href === "/visit" && <ArrowUpRight size={14} />}
          </Link>
        ))}
      </nav>
      <LanguageSwitch />
      <span className="header-location">
        OSAKA, JAPAN <span className="tiny-dot" />
      </span>
      <button
        ref={toggle}
        className="nav-toggle icon-button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <MenuIcon />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {links.map(([href, label], i) => (
            <Link prefetch={false}
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <p>
            A softer kind of ritual.
            <br />
            <small>A fictional coffee shop concept.</small>
          </p>
        </nav>
      )}
    </header>
  </Localized>);
}
export function Footer() {
  const [sound, setSound] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  useEffect(() => {
    try {
      setSound(localStorage.getItem("velune-sound") === "on");
    } catch {}
  }, []);
  useEffect(() => {
    if (!sound) return;
    const play = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("button,a")) return;
      try {
        const ctx = audio.current ?? new AudioContext();
        audio.current = ctx;
        void ctx.resume();
        const osc = ctx.createOscillator(),
          gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(490, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.018, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.13);
      } catch {}
    };
    document.addEventListener("click", play);
    return () => document.removeEventListener("click", play);
  }, [sound]);
  useEffect(
    () => () => {
      void audio.current?.close();
    },
    [],
  );
  function toggle() {
    setSound((v) => {
      try {
        localStorage.setItem("velune-sound", !v ? "on" : "off");
      } catch {}
      return !v;
    });
  }
  return (<Localized>
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link prefetch={false} href="/" className="footer-wordmark">
            velune.
          </Link>
          <p>
            Thoughtfully crafted coffee.
            <br />
            Beautifully unhurried moments.
          </p>
        </div>
        <div className="footer-links">
          <p className="eyebrow">Take your time</p>
          {links.slice(1).map(([href, label]) => (
            <Link prefetch={false} href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-note">
          <span className="tiny-dot" />
          <p>
            Imagined in Osaka.
            <br />
            Made for the everyday.
          </p>
          <p className="small">
            An independent coffee shop concept.
            <br />
            Not an operating café.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} VELUNE · A fictional concept</span>
        <span>All prices are illustrative, in USD.</span>
        <button onClick={toggle} aria-pressed={sound} className="sound-control">
          {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}Sound{" "}
          {sound ? "on" : "off"}
        </button>
      </div>
    </footer>
  </Localized>);
}
