import type { Certificate, Achievement } from "@/content/types";

function CertCard({ certs }: { certs: Certificate[] }) {
  return (
    <article className="rounded-[16px] border border-line bg-card p-6 hover:border-blue transition-colors duration-200 h-full">
      <p className="eyebrow mb-3">Issued credentials</p>
      <h3 className="font-heading text-xl font-bold text-ink mb-5">Certificates</h3>
      <ul className="flex flex-col divide-y divide-line">
        {certs.map((c, i) => (
          <li key={i} className="flex justify-between items-start gap-4 py-3.5 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-ink font-sans">{c.name}</p>
              <p className="text-xs text-muted font-mono mt-0.5">{c.issuer}</p>
            </div>
            <span className="text-xs text-muted/70 font-mono shrink-0">{c.date}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
  return (
    <article className="rounded-[16px] border border-line bg-card p-6 hover:border-blue transition-colors duration-200 h-full">
      <p className="eyebrow mb-3">Recognition</p>
      <h3 className="font-heading text-xl font-bold text-ink mb-5">Achievements</h3>
      <ul className="flex flex-col gap-4">
        {achievements.map((a, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted leading-relaxed font-sans">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
            {a.text}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Proof({
  certificates,
  achievements,
}: {
  certificates: Certificate[];
  achievements: Achievement[];
}) {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="py-10 lg:py-16">
      <p className="eyebrow mb-2">Credentials & Recognition</p>
      <h2 id="proof-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-8">
        Credentials & Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CertCard certs={certificates} />
        <AchievementsCard achievements={achievements} />
      </div>
    </section>
  );
}
