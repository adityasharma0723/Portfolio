"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/content/types";

/* ── Architecture data (from CV facts only) ─────────────── */
type ArchNode = { id: string; label: string; explanation: string };
type ArchFlow = { from: string; to: string };

const ARCH: Record<string, { nodes: ArchNode[]; flows: ArchFlow[] }> = {
  estatex: {
    nodes: [
      { id: "react", label: "React + Redux", explanation: "Frontend SPA using Redux Toolkit for global state management across buyer, seller, and admin roles." },
      { id: "jwt", label: "JWT + RBAC", explanation: "JWT tokens carry role claims so the Express middleware enforces Role-Based Access Control without a database call per request." },
      { id: "api", label: "Express REST API", explanation: "REST endpoints handle property CRUD, image uploads via Cloudinary, and chat message persistence." },
      { id: "mongo", label: "MongoDB", explanation: "Document store for listings, users, and chat messages; validated through Postman before going live." },
      { id: "socket", label: "Socket.io", explanation: "Enables real-time live chat between buyers and sellers without polling." },
      { id: "stripe", label: "Stripe", explanation: "Handles secure payment collection for property bookings." },
    ],
    flows: [
      { from: "react", to: "jwt" },
      { from: "jwt", to: "api" },
      { from: "api", to: "mongo" },
      { from: "api", to: "socket" },
      { from: "api", to: "stripe" },
    ],
  },
  metricflow: {
    nodes: [
      { id: "ops", label: "Operational Data", explanation: "Raw CSV/Excel operational data ingested as the source of truth for all KPI calculations." },
      { id: "etl", label: "Python/Pandas ETL", explanation: "Python scripts with Pandas clean, transform and validate data before it reaches the dashboard layer." },
      { id: "sql", label: "SQL", explanation: "SQL queries aggregate cleaned data into KPI summaries ready for Power BI consumption." },
      { id: "valid", label: "Validation", explanation: "Data validation sits inside the pipeline so dashboards only show numbers that have passed quality checks." },
      { id: "bi", label: "Power BI", explanation: "Interactive dashboards with KPI tracking, drill-down analysis, and dynamic filters for self-service reporting." },
    ],
    flows: [
      { from: "ops", to: "etl" },
      { from: "etl", to: "sql" },
      { from: "sql", to: "valid" },
      { from: "valid", to: "bi" },
    ],
  },
  shipjam: {
    nodes: [
      { id: "react", label: "React + Vite", explanation: "Vite build tool for fast HMR in development; React Router handles four role-specific views." },
      { id: "axios", label: "Axios", explanation: "HTTP client connecting the React frontend to the Express backend REST API." },
      { id: "express", label: "Express Routes", explanation: "Separate routes and controllers per domain (auth, hackathon, submissions) keep logic modular and testable." },
      { id: "mongo", label: "MongoDB + Mongoose", explanation: "Mongoose schemas enforce data shape for hackathon, team, and submission documents." },
      { id: "auth", label: "JWT + bcrypt", explanation: "bcrypt hashes passwords at rest; JWT tokens authorize admin, organizer, participant, and judge actions." },
    ],
    flows: [
      { from: "react", to: "axios" },
      { from: "axios", to: "express" },
      { from: "express", to: "mongo" },
      { from: "express", to: "auth" },
    ],
  },
};

/* ── Spotlight card wrapper ──────────────────────────────── */
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Architecture diagram ────────────────────────────────── */
function ArchDiagram({ projectId }: { projectId: string }) {
  const arch = ARCH[projectId];
  const [activeNode, setActiveNode] = useState<string | null>(null);
  if (!arch) return null;

  const activeExplanation = arch.nodes.find((n) => n.id === activeNode)?.explanation;

  return (
    <div className="mt-4">
      <p className="eyebrow mb-3">Architecture</p>
      {/* Node row */}
      <div className="flex flex-wrap gap-2 items-center">
        {arch.nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              aria-pressed={activeNode === node.id}
              className={[
                "rounded-[8px] border px-3 py-1.5 text-xs font-mono transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent",
                activeNode === node.id
                  ? "border-accent bg-accent/10 text-ink"
                  : "border-line bg-bg text-muted hover:border-blue hover:text-ink",
              ].join(" ")}
            >
              {node.label}
            </button>
            {/* Animated connector */}
            {i < arch.nodes.length - 1 && (
              <svg
                width="24"
                height="12"
                viewBox="0 0 24 12"
                aria-hidden="true"
                className="shrink-0"
              >
                <line
                  x1="0" y1="6" x2="20" y2="6"
                  stroke="var(--line)"
                  strokeWidth="1.5"
                  className="flow-line"
                />
                <polygon
                  points="18,3 24,6 18,9"
                  fill="var(--line)"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      {/* Explanation */}
      {activeExplanation && (
        <p className="mt-3 text-sm text-muted leading-relaxed font-sans border-l-2 border-accent pl-3 py-0.5 animate-[fade-up_0.2s_ease-out_forwards]">
          {activeExplanation}
        </p>
      )}
      {!activeNode && (
        <p className="mt-2 text-xs text-muted/60 font-mono">Click a node to see what it does.</p>
      )}
    </div>
  );
}

/* ── Project selector tab card ───────────────────────────── */
function SelectorCard({
  project,
  index,
  isActive,
  onClick,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <SpotlightCard className="rounded-[16px] border overflow-hidden">
      <button
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`panel-${project.id}`}
        id={`tab-${project.id}`}
        onClick={onClick}
        className={[
          "w-full text-left p-4 transition-all duration-200 relative z-10 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent",
          isActive
            ? "border-[var(--accent)] bg-accent/5"
            : "border-transparent hover:bg-line/20",
        ].join(" ")}
      >
        <span className="eyebrow mb-1 block">
          {String(index + 1).padStart(2, "0")} · {project.date}
        </span>
        <p className="font-heading text-base font-bold text-ink">{project.title}</p>
        <p className="text-xs text-muted font-sans mt-0.5">{project.oneLiner}</p>
      </button>
    </SpotlightCard>
  );
}

/* ── Detail panel ────────────────────────────────────────── */
function DetailPanel({ project }: { project: Project }) {
  return (
    <SpotlightCard
      className={[
        "rounded-[16px] border border-line bg-card p-6 lg:p-8 flex flex-col gap-6 relative z-10",
        "min-h-[500px]",
      ].join(" ")}
    >
      {/* Header */}
      <div>
        <p className="eyebrow mb-1">{project.category}</p>
        <h3 className="font-heading text-2xl font-bold text-ink">{project.title}</h3>
        <p className="text-sm text-muted font-mono mt-1">{project.date}</p>
        <p className="text-base text-muted font-sans mt-2 leading-relaxed">{project.oneLiner}</p>
      </div>

      {/* Architecture */}
      <ArchDiagram projectId={project.id} />

      {/* Problem / Outcome */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="eyebrow mb-2">Problem</p>
          <p className="text-sm text-muted leading-relaxed font-sans">{project.problem}</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Outcome</p>
          <p className="text-sm text-muted leading-relaxed font-sans">{project.whatItFixes}</p>
        </div>
      </div>

      {/* What I built */}
      <div>
        <p className="eyebrow mb-3">What I built</p>
        <ul className="flex flex-col gap-2">
          {project.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted leading-relaxed font-sans">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech chips */}
      <div>
        <p className="eyebrow mb-3">Tech used</p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="inline-block rounded-full border border-line bg-bg px-3 py-1 text-xs font-mono text-muted hover:border-blue hover:text-ink transition-colors duration-150"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Repo link */}
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent w-fit rounded"
      >
        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        View code
      </a>
    </SpotlightCard>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export default function Work({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Arrow-key navigation for tablist
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % projects.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + projects.length) % projects.length);
      }
    };
    list.addEventListener("keydown", handleKey);
    return () => list.removeEventListener("keydown", handleKey);
  }, [projects.length]);

  return (
    <section id="work" aria-labelledby="work-heading" className="py-10 lg:py-16">
      <p className="eyebrow mb-2">Selected work</p>
      <h2 id="work-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-10">
        Projects
      </h2>

      {/* Mobile: horizontal scroll tabs above panel */}
      <div
        role="tablist"
        aria-label="Projects"
        ref={listRef}
        className="flex lg:hidden gap-3 overflow-x-auto scrollbar-none pb-3 mb-4"
      >
        {projects.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-controls={`panel-${p.id}`}
            id={`tab-mobile-${p.id}`}
            onClick={() => setActiveIndex(i)}
            className={[
              "shrink-0 rounded-[10px] border px-4 py-2.5 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent",
              i === activeIndex
                ? "border-accent bg-accent/10 text-ink"
                : "border-line bg-card text-muted hover:border-blue",
            ].join(" ")}
          >
            <p className="text-xs font-mono text-muted mb-0.5">{p.date}</p>
            <p className="text-sm font-heading font-bold text-ink">{p.title}</p>
          </button>
        ))}
      </div>

      {/* Desktop: left sidebar + right panel */}
      <div className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sticky selector */}
        <div
          role="tablist"
          aria-label="Projects"
          ref={listRef}
          className="flex flex-col gap-3 self-start sticky top-24"
        >
          {projects.map((p, i) => (
            <SelectorCard
              key={p.id}
              project={p}
              index={i}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div
          id={`panel-${projects[activeIndex].id}`}
          role="tabpanel"
          aria-labelledby={`tab-${projects[activeIndex].id}`}
        >
          <DetailPanel project={projects[activeIndex]} />
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className="lg:hidden"
        id={`panel-${projects[activeIndex].id}`}
        role="tabpanel"
        aria-labelledby={`tab-mobile-${projects[activeIndex].id}`}
      >
        <DetailPanel project={projects[activeIndex]} />
      </div>
    </section>
  );
}
