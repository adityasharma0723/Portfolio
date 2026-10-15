"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Command } from "lucide-react";
import type { ContactInfo } from "@/content/types";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Training", href: "#training" },
  { label: "Proof", href: "#proof" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Header({
  owner,
  contact: _contact,
}: {
  owner: string;
  contact: ContactInfo;
}) {
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLUListElement>(null);
  const pillRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.href.slice(1));
    const observers: IntersectionObserver[] = [];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive("#" + entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(observerCallback, {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = pillRefs.current[active];
    if (el && navRef.current) {
      el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [active]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent("open-palette"));
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-line"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        backgroundColor: "color-mix(in srgb, var(--bg) 85%, transparent)",
      }}
    >
      {/* Skip link */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#15213B] focus:outline-none"
      >
        Skip to work
      </a>

      <div className="container-wide flex items-center gap-3 py-3">
        {/* Name / logo */}
        <span className="font-heading text-base font-bold tracking-tight text-ink shrink-0">
          {owner}
        </span>

        {/* Nav */}
        <nav aria-label="Page sections" className="flex-1 min-w-0">
          <ul
            ref={navRef}
            className="flex gap-1 overflow-x-auto scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    ref={(el) => { pillRefs.current[item.href] = el; }}
                    className={[
                      "block rounded-full px-3 py-1 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent",
                      isActive
                        ? "bg-accent text-[#15213B] font-semibold"
                        : "text-muted hover:text-ink hover:bg-line/50",
                    ].join(" ")}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick jump button */}
        <button
          type="button"
          onClick={openPalette}
          aria-label="Open command palette (Ctrl+K)"
          className="hidden sm:flex items-center gap-1.5 rounded-[8px] border border-line bg-card px-2.5 py-1.5 text-xs text-muted hover:text-ink hover:border-blue transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent shrink-0"
        >
          <Command className="w-3 h-3" aria-hidden="true" />
          <span className="hidden md:inline">Quick jump</span>
          <kbd className="font-mono text-[10px] opacity-60 ml-0.5">⌘K</kbd>
        </button>

        {/* Theme toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
