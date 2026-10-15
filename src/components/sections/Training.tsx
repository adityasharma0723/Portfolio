import type { Training as TrainingType } from "@/content/types";

export default function Training({ training }: { training: TrainingType }) {
  return (
    <section id="training" aria-labelledby="training-heading" className="py-10 lg:py-16">
      <p className="eyebrow mb-2">Development</p>
      <h2 id="training-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-8">
        Training
      </h2>

      <article className="rounded-[16px] border border-line bg-card p-6 lg:p-8 hover:border-blue transition-colors duration-200">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-6">
          <div>
            <p className="eyebrow mb-1">{training.type}</p>
            <h3 className="font-heading text-xl font-bold text-ink">{training.title}</h3>
            <p className="text-sm text-muted font-sans mt-1">
              {training.provider}
            </p>
          </div>
          <span className="text-xs text-muted/70 font-mono shrink-0 mt-1">{training.date}</span>
        </div>

        {/* Two-column: bullets left, chips right */}
        <div className="grid sm:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Bullets */}
          <ul className="flex flex-col gap-2.5">
            {training.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-muted leading-relaxed font-sans">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Tech chips */}
          <div className="flex flex-col gap-2 sm:items-end">
            <p className="eyebrow mb-1">Technologies</p>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {training.tech.map((t) => (
                <span
                  key={t}
                  className="inline-block rounded-full border border-line bg-bg px-3 py-1 text-xs font-mono text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
