"use client";

import { useState } from "react";
import type { SkillGroup, Project } from "@/content/types";

/* Map which projects use each skill (CV-verified only) */
const SKILL_PROJECT_MAP: Record<string, string[]> = {
  "React.js":        ["EstateX", "ShipJam"],
  "Redux Toolkit":   ["EstateX"],
  "Node.js":         ["EstateX", "ShipJam"],
  "Express.js":      ["EstateX", "ShipJam"],
  "REST APIs":       ["EstateX", "ShipJam"],
  "JWT":             ["EstateX", "ShipJam"],
  "MongoDB":         ["EstateX", "ShipJam"],
  "Python":          ["MetricFlow"],
  "Pandas":          ["MetricFlow"],
  "SQL":             ["MetricFlow"],
  "Power BI":        ["MetricFlow"],
  "ETL":             ["MetricFlow"],
  "Git":             ["EstateX", "MetricFlow", "ShipJam"],
  "Postman":         ["EstateX"],
  "Mongoose":        ["ShipJam"],
};

function SkillChip({
  skill,
  isHighlighted,
  onClick,
}: {
  skill: string;
  isHighlighted: boolean;
  onClick: () => void;
}) {
  const hasProjects = SKILL_PROJECT_MAP[skill] !== undefined;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isHighlighted}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono transition-all duration-150 focus-visible:outline-2 focus-visible:outline-accent",
        isHighlighted
          ? "border-accent bg-accent/10 text-ink"
          : hasProjects
          ? "border-line bg-bg text-muted hover:border-blue hover:text-ink cursor-pointer"
          : "border-line bg-bg text-muted/60 cursor-default",
      ].join(" ")}
    >
      {skill}
    </button>
  );
}

function SkillCard({
  group,
  activeChip,
  onChipClick,
}: {
  group: SkillGroup;
  activeChip: string | null;
  onChipClick: (skill: string) => void;
}) {
  return (
    <article className="rounded-[16px] border border-line bg-card p-5 hover:border-blue transition-colors duration-200">
      <p className="eyebrow mb-3">{group.label}</p>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <SkillChip
            key={skill}
            skill={skill}
            isHighlighted={activeChip === skill}
            onClick={() => onChipClick(skill)}
          />
        ))}
      </div>
    </article>
  );
}

export default function Skills({
  skillGroups,
  projects: _projects,
}: {
  skillGroups: SkillGroup[];
  projects: Project[];
}) {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const handleChip = (skill: string) => {
    setActiveChip((prev) => (prev === skill ? null : skill));
  };

  const projectsUsingChip = activeChip ? SKILL_PROJECT_MAP[activeChip] : null;

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-16 lg:py-24">
      <p className="eyebrow mb-2">What I know</p>
      <h2 id="skills-heading" className="font-heading text-3xl sm:text-4xl font-bold text-ink mb-3">
        Skills
      </h2>

      {/* Hint / project highlight feedback */}
      <div className="mb-8 h-6" aria-live="polite" aria-atomic="true">
        {activeChip && projectsUsingChip ? (
          <p className="text-sm text-muted font-sans">
            <span className="text-accent font-medium">{activeChip}</span>
            {" "}used in: {projectsUsingChip.join(", ")}
          </p>
        ) : activeChip ? (
          <p className="text-sm text-muted font-sans">
            <span className="text-accent font-medium">{activeChip}</span>
            {" "}— not directly tied to a listed project.
          </p>
        ) : (
          <p className="text-xs text-muted/60 font-mono">Click a chip to see which projects use it.</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <SkillCard
            key={group.label}
            group={group}
            activeChip={activeChip}
            onChipClick={handleChip}
          />
        ))}
      </div>
    </section>
  );
}
