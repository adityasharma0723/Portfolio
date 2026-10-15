"use client";

import { useState, useRef, useCallback } from "react";
import { Mail, Copy, Check, Phone } from "lucide-react";
import type { ContactInfo } from "@/content/types";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Contact({
  contact,
  showPhone,
}: {
  contact: ContactInfo;
  showPhone: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Radial glow follows mouse inside panel
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--gx", `${e.clientX - rect.left}px`);
    panel.style.setProperty("--gy", `${e.clientY - rect.top}px`);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.createElement("textarea");
      el.value = contact.email;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-10 lg:py-16">
      <p className="eyebrow mb-2">Get in touch</p>
      <h2 id="contact-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-3">
        Contact
      </h2>
      <p className="text-base text-muted font-sans mb-8 max-w-[52ch]">
        I am actively looking for software development, data science and AI/ML roles. Reach out — I reply fast.
      </p>

      {/* Large contact panel */}
      <div
        ref={panelRef}
        onMouseMove={onMouseMove}
        className="relative rounded-[16px] border border-line bg-card overflow-hidden p-8 lg:p-12"
        style={{
          background: `radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), var(--accent-muted) 0%, transparent 60%), var(--card)`,
        }}
      >
        {/* Main email CTA */}
        <div className="mb-8">
          <a
            href={`mailto:${contact.email}`}
            id="contact-email-link"
            className="inline-flex items-center gap-3 rounded-[12px] bg-accent px-6 py-3.5 text-base font-semibold text-[#15213B] transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-lg shadow-accent/25"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            {contact.email}
          </a>
        </div>

        {/* Secondary actions row */}
        <div className="flex flex-wrap gap-3">
          {/* Copy email */}
          <button
            type="button"
            id="contact-copy-email"
            onClick={handleCopyEmail}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
            className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink transition-all duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {copied ? (
              <><Check className="w-4 h-4 text-green-500" aria-hidden="true" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4" aria-hidden="true" /> Copy email</>
            )}
          </button>

          {/* Phone */}
          {showPhone && (
            <a
              href={`tel:${contact.mobile.replace(/\s/g, "")}`}
              id="contact-phone"
              className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {contact.mobile}
            </a>
          )}

          {/* LinkedIn */}
          <a
            href={contact.linkedin}
            id="contact-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <LinkedinIcon />
            LinkedIn
          </a>

          {/* GitHub */}
          <a
            href={contact.github}
            id="contact-github"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[10px] border border-line bg-bg px-4 py-2.5 text-sm font-semibold text-ink transition-transform duration-150 ease-out hover:-translate-y-[3px] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
