// ─────────────────────────────────────────────
//  Portfolio Types
// ─────────────────────────────────────────────

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  mobile: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  oneLiner: string;
  problem: string;
  whatItFixes: string;
  bullets: string[];
  whyThisWay: string;
  tech: string[];
  repoUrl: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Training {
  title: string;
  provider: string;
  type: string;
  date: string;
  bullets: string[];
  tech: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

export interface Achievement {
  text: string;
}

export interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  score: string;
  scoreLabel: "CGPA" | "Percentage";
  from: string;
  to: string;
}

export interface PortfolioData {
  owner: string;
  tagline: string;
  heroLede: string;
  SHOW_PHONE: boolean;
  contact: ContactInfo;
  projects: Project[];
  skillGroups: SkillGroup[];
  training: Training;
  certificates: Certificate[];
  achievements: Achievement[];
  education: EducationEntry[];
}
