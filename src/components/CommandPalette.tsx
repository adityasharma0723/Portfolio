"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Search, Mail, Sun, Moon, Copy, Check, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import type { ContactInfo, Project } from "@/content/types";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

type PaletteAction = {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
  group: "navigate" | "project" | "action";
  tag?: string;
};

export default function CommandPalette({
  contact,
  projects,
}: {
  contact: ContactInfo;
  projects: Project[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { resolvedTheme, toggleTheme } = useTheme();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const el = document.createElement("textarea");
      el.value = contact.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  }, [contact.email]);

  const sections = [
    { id: "work", label: "Work", emoji: "💼" },
    { id: "skills", label: "Skills", emoji: "⚡" },
    { id: "training", label: "Training", emoji: "🎓" },
    { id: "proof", label: "Credentials", emoji: "🏆" },
    { id: "education", label: "Education", emoji: "📚" },
    { id: "contact", label: "Contact", emoji: "✉️" },
  ];

  const actions: PaletteAction[] = [
    ...sections.map((s) => ({
      id: `nav-${s.id}`,
      label: s.label,
      description: `Jump to ${s.label}`,
      keywords: s.id,
      icon: <span className="text-base leading-none">{s.emoji}</span>,
      group: "navigate" as const,
      action: () => {
        document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    })),
    ...projects.map((p) => ({
      id: `proj-${p.id}`,
      label: p.title,
      description: p.category,
      keywords: p.id,
      icon: <ArrowUpRight className="w-4 h-4" />,
      group: "project" as const,
      tag: p.category,
      action: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      },
    })),
    {
      id: "copy-email",
      label: copied ? "Copied!" : "Copy Email",
      description: contact.email,
      icon: copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />,
      group: "action",
      action: copyEmail,
    },
    {
      id: "open-github",
      label: "GitHub",
      description: "github.com/adityasharma0723",
      icon: <GithubIcon />,
      group: "action",
      action: () => { window.open(contact.github, "_blank", "noopener,noreferrer"); setOpen(false); },
    },
    {
      id: "open-linkedin",
      label: "LinkedIn",
      description: "linkedin.com/in/aditya-sharma23",
      icon: <LinkedinIcon />,
      group: "action",
      action: () => { window.open(contact.linkedin, "_blank", "noopener,noreferrer"); setOpen(false); },
    },
    {
      id: "toggle-theme",
      label: `${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      description: "Toggle theme",
      icon: resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      group: "action",
      action: () => { toggleTheme(); setOpen(false); },
    },
    {
      id: "email-me",
      label: "Email Me",
      description: contact.email,
      icon: <Mail className="w-4 h-4" />,
      group: "action",
      action: () => { window.location.href = `mailto:${contact.email}`; setOpen(false); },
    },
  ];

  const filtered = actions.filter((a) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      a.label.toLowerCase().includes(q) ||
      (a.description?.toLowerCase().includes(q) ?? false) ||
      (a.keywords?.toLowerCase().includes(q) ?? false)
    );
  });

  const navItems = filtered.filter((a) => a.group === "navigate");
  const projectItems = filtered.filter((a) => a.group === "project");
  const actionItems = filtered.filter((a) => a.group === "action");
  const flatFiltered = [...navItems, ...projectItems, ...actionItems];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape") setOpen(false);
    };
    const handleEvent = () => setOpen(true);
    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-palette", handleEvent);
    return () => { window.removeEventListener("keydown", handleKey); window.removeEventListener("open-palette", handleEvent); };
  }, []);

  useEffect(() => {
    if (open) { setCursor(0); setQuery(""); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, flatFiltered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
      else if (e.key === "Enter") { e.preventDefault(); flatFiltered[cursor]?.action(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, cursor, flatFiltered]);

  if (!open) return null;

  const CardItem = ({ a, globalIndex }: { a: PaletteAction; globalIndex: number }) => (
    <button
      role="option"
      aria-selected={globalIndex === cursor}
      onClick={a.action}
      onMouseEnter={() => setCursor(globalIndex)}
      className={[
        "flex flex-col items-start gap-1 rounded-xl border p-3 text-left w-full transition-all duration-150 cursor-pointer",
        globalIndex === cursor
          ? "border-accent/60 bg-accent/10 shadow-sm shadow-accent/10"
          : "border-line bg-bg/50 hover:border-accent/30 hover:bg-accent/5",
      ].join(" ")}
    >
      <div className="flex items-center gap-2 w-full">
        <span className={`shrink-0 ${globalIndex === cursor ? "text-accent" : "text-muted"}`}>{a.icon}</span>
        <p className="text-sm font-semibold text-ink truncate font-sans flex-1">{a.label}</p>
        {a.tag && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full border border-line text-muted shrink-0">{a.tag}</span>
        )}
        {globalIndex === cursor && (
          <kbd className="font-mono text-[10px] text-muted border border-line rounded px-1.5 py-0.5 shrink-0">↵</kbd>
        )}
      </div>
      {a.description && (
        <p className="text-[11px] text-muted truncate font-mono pl-6 w-full">{a.description}</p>
      )}
    </button>
  );

  return (
    <>
      <div className="palette-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed left-1/2 top-[15vh] z-[999] w-full max-w-[600px] -translate-x-1/2 rounded-[20px] border border-line bg-card shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 32px 96px rgba(0,0,0,0.55)" }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <Search className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="palette-list"
            placeholder="Search sections, projects, actions…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted outline-none font-sans"
          />
          <kbd className="font-mono text-[10px] text-muted border border-line rounded px-1.5 py-0.5">Esc</kbd>
        </div>

        <div
          id="palette-list"
          role="listbox"
          aria-label="Command palette results"
          className="max-h-[440px] overflow-y-auto p-3 flex flex-col gap-4"
        >
          {flatFiltered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted font-sans">No results for &ldquo;{query}&rdquo;</p>
          )}
          {navItems.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2 px-0.5">Navigate</p>
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((a) => <CardItem key={a.id} a={a} globalIndex={flatFiltered.indexOf(a)} />)}
              </div>
            </div>
          )}
          {projectItems.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2 px-0.5">Projects</p>
              <div className="grid grid-cols-2 gap-2">
                {projectItems.map((a) => <CardItem key={a.id} a={a} globalIndex={flatFiltered.indexOf(a)} />)}
              </div>
            </div>
          )}
          {actionItems.length > 0 && (
            <div>
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-2 px-0.5">Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {actionItems.map((a) => <CardItem key={a.id} a={a} globalIndex={flatFiltered.indexOf(a)} />)}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-line px-4 py-2 flex gap-4 text-[10px] text-muted font-mono">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span><kbd className="font-mono">Esc</kbd> close</span>
        </div>
      </div>
    </>
  );
}
