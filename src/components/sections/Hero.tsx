"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import type { PortfolioData, Project } from "@/content/types";

/* ── SVG icons ──────────────────────────────────────────── */
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

/* ── Typewriter hook ─────────────────────────────────────── */
const ROLES = ["Full-stack developer", "Data & analytics builder", "AI/ML learner"];

function useTypewriter(strings: string[], speed = 60, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % strings.length);
    }

    setDisplay(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, deleting, roleIndex]);

  return display;
}

/* ── Count-up hook ───────────────────────────────────────── */
function useCountUp(target: number, duration = 1200, active = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const steps = 40;
    const inc = target / steps;
    const interval = duration / steps;
    let count = 0;
    const timer = setInterval(() => {
      count += inc;
      if (count >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.round(count));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return value;
}

/* ── Particle canvas ─────────────────────────────────────── */
type Particle = {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const hiddenRef = useRef(false);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(60, Math.floor((w * h) / 12000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pause when tab hidden
    const onVisibility = () => { hiddenRef.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibility);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.parentElement?.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      if (!hiddenRef.current) {
        const { width: w, height: h } = canvas;
        ctx.clearRect(0, 0, w, h);

        const isDark = document.documentElement.classList.contains("dark");
        const dotColor = isDark ? "rgba(100,155,255,0.5)" : "rgba(74,127,232,0.4)";
        const lineColor = isDark ? "rgba(100,155,255,0.12)" : "rgba(74,127,232,0.1)";

        const ps = particlesRef.current;
        ps.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;

          // Gentle mouse repulsion
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            p.vx += (dx / dist) * 0.08;
            p.vy += (dy / dist) * 0.08;
          }
          // Dampen speed
          p.vx *= 0.99;
          p.vy *= 0.99;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = dotColor;
          ctx.fill();
        });

        // Draw lines between nearby particles
        for (let i = 0; i < ps.length; i++) {
          for (let j = i + 1; j < ps.length; j++) {
            const dx = ps[i].x - ps[j].x;
            const dy = ps[i].y - ps[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 120) {
              ctx.beginPath();
              ctx.moveTo(ps[i].x, ps[i].y);
              ctx.lineTo(ps[j].x, ps[j].y);
              ctx.strokeStyle = lineColor;
              ctx.globalAlpha = 1 - d / 120;
              ctx.lineWidth = 0.8;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}

/* ── Code window lines ───────────────────────────────────── */
const CODE_LINES = [
  { key: "k1", text: `const aditya = {`, color: "text-blue" },
  { key: "k2", text: `  role: "Full-stack & Data",`, color: "text-muted" },
  { key: "k3", text: `  degree: "B.Tech CSE, LPU",`, color: "text-muted" },
  { key: "k4", text: `  stack: ["MERN", "ETL", "Power BI"],`, color: "text-muted" },
  { key: "k5", text: `  projects: 3,`, color: "text-muted" },
  { key: "k6", text: `  dsa: "100+",`, color: "text-muted" },
  { key: "k7", text: `  hackathon: "Top 5, CodeStorm",`, color: "text-muted" },
  { key: "k8", text: `  openTo: "Fresher roles",`, color: "text-muted" },
  { key: "k9", text: `};`, color: "text-blue" },
];

function CodeWindow({ prefersReduced }: { prefersReduced: boolean | null }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (prefersReduced) { setVisibleCount(CODE_LINES.length); return; }
    const timer = setInterval(() => {
      setVisibleCount((c) => {
        if (c >= CODE_LINES.length) { clearInterval(timer); return c; }
        return c + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [prefersReduced]);

  return (
    <div
      className="rounded-[16px] border border-line bg-card overflow-hidden shadow-xl"
      aria-label="Code preview card"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-bg/50">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" aria-hidden="true" />
        <span className="ml-2 text-[11px] text-muted font-mono">aditya.ts</span>
      </div>

      {/* Code content */}
      <div className="p-5 code-window min-h-[220px]">
        {CODE_LINES.slice(0, visibleCount).map((line) => (
          <div key={line.key} className={`${line.color} whitespace-pre`}>
            {line.text}
          </div>
        ))}
        {visibleCount < CODE_LINES.length && (
          <span className="typewriter-cursor text-muted" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

/* ── Stats strip ─────────────────────────────────────────── */
const STATS = [
  { number: 5, suffix: "+", label: "Major projects" },
  { number: 100, suffix: "+", label: "DSA problems solved" },
  { number: 3, suffix: "", label: "Industry certificates" },
  { number: 5, suffix: "", label: "Top rank, CodeStorm Hackathon" },
];

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const value = useCountUp(stat.number, 1200, active);
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-6 rounded-[16px] border border-line bg-card hover:border-blue transition-colors duration-200">
      <p className="font-heading text-3xl sm:text-4xl font-bold text-ink leading-none">
        {value}{stat.suffix}
      </p>
      <p className="text-xs sm:text-sm text-muted font-sans mt-2 leading-snug">{stat.label}</p>
    </div>
  );
}

function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
      {STATS.map((s) => <StatCard key={s.label} stat={s} active={active} />)}
    </div>
  );
}

/* ── Marquee ─────────────────────────────────────────────── */
const TECH_NAMES = [
  "React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "Redux Toolkit",
  "JWT", "Socket.io", "Stripe", "Python", "Pandas", "SQL", "Power BI", "C++", "Postman", "Git",
];

function Marquee() {
  const items = [...TECH_NAMES, ...TECH_NAMES]; // doubled for seamless loop
  return (
    <div
      className="marquee-wrap relative mt-8 overflow-hidden py-2"
      aria-label="Technologies I work with"
    >
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}
        aria-hidden="true"
      />
      <div className="marquee-track" aria-hidden="true">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="mx-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-xs font-mono text-muted whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero section ────────────────────────────────────────── */
type HeroData = Pick<PortfolioData, "owner" | "tagline" | "heroLede" | "contact"> & {
  projects: Project[];
};

export default function Hero({ data }: { data: HeroData }) {
  const prefersReduced = useReducedMotion();
  const typeText = useTypewriter(ROLES);

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Particle canvas — reduced-motion guard */}
      {!prefersReduced && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <ParticleCanvas />
        </div>
      )}

      {/* Content */}
      <div className="container-wide relative z-10 pt-10 pb-10 lg:pt-14 lg:pb-14">
        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 xl:gap-20 items-center">
          {/* Left column */}
          <motion.div
            variants={prefersReduced ? {} : container}
            initial={prefersReduced ? false : "hidden"}
            animate="show"
            className="flex flex-col gap-6"
          >
            {/* Status pill */}
            <motion.div variants={prefersReduced ? {} : item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs font-mono text-muted">
                <span
                  className="pulse-dot h-2 w-2 rounded-full bg-green-500 shrink-0"
                  aria-hidden="true"
                />
                Open to fresher roles · Software, Data, AI/ML
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              id="hero-heading"
              variants={prefersReduced ? {} : item}
              className="font-heading font-extrabold leading-[1.05] tracking-tight text-ink"
              style={{ fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Aditya{" "}
              <span className="gradient-text">Sharma</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.p
              variants={prefersReduced ? {} : item}
              className="font-heading text-xl sm:text-2xl text-muted font-semibold h-8"
              aria-live="polite"
              aria-label={`Currently: ${typeText}`}
            >
              <span className={prefersReduced ? "" : "typewriter-cursor"}>{typeText}</span>
            </motion.p>

            {/* Lede */}
            <motion.p
              variants={prefersReduced ? {} : item}
              className="text-base sm:text-lg text-muted leading-relaxed max-w-[56ch] font-sans"
            >
              {data.heroLede}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={prefersReduced ? {} : item}
              className="flex flex-wrap gap-3 mt-1"
            >
              <a
                href="#work"
                id="hero-cta-work"
                className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-5 py-2.5 text-sm font-semibold text-[#15213B] transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-md shadow-accent/20"
              >
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
                View projects
              </a>
              <a
                href={`mailto:${data.contact.email}`}
                id="hero-cta-email"
                className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email me
              </a>
              <a
                href={data.contact.github}
                id="hero-cta-github"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href={data.contact.linkedin}
                id="hero-cta-linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <LinkedinIcon />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* Right column: code window */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <CodeWindow prefersReduced={prefersReduced} />
          </motion.div>
        </div>

        {/* Stats strip (full-width below the columns) */}
        <StatsStrip />

        {/* Marquee */}
        <Marquee />
      </div>
    </section>
  );
}
