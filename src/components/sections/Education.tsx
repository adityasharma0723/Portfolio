import type { EducationEntry } from "@/content/types";

export default function Education({ education }: { education: EducationEntry[] }) {
  return (
    <section id="education" aria-labelledby="education-heading" className="py-16 lg:py-24">
      <p className="eyebrow mb-2">Academic background</p>
      <h2 id="education-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-10">
        Education
      </h2>

      {/* Vertical timeline */}
      <ol className="relative flex flex-col gap-4">
        {education.map((entry, i) => {
          const isLast = i === education.length - 1;
          return (
            <li key={i} className="relative flex gap-6">
              {/* Timeline rail */}
              <div className="flex flex-col items-center shrink-0">
                {/* Accent dot */}
                <span
                  className="mt-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg shrink-0 shadow-sm shadow-accent/30"
                  aria-hidden="true"
                />
                {/* Connector line */}
                {!isLast && (
                  <span
                    className="mt-1 flex-1 w-px bg-line"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content card */}
              <div className="flex-1">
                <article className="rounded-[16px] border border-line bg-card p-5 hover:border-blue transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <h3 className="font-heading text-base font-bold text-ink leading-snug">
                      {entry.institution}
                    </h3>
                    <span className="text-xs text-muted/70 font-mono shrink-0">
                      {entry.from} – {entry.to}
                    </span>
                  </div>
                  <p className="text-sm text-muted font-sans">{entry.degree}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <p className="text-xs text-muted/70 font-sans">{entry.location}</p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/8 px-2.5 py-0.5 text-xs font-mono text-accent">
                      {entry.scoreLabel}: {entry.score}
                    </span>
                  </div>
                </article>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
