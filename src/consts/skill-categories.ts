export const SKILL_FILTER_CATEGORIES = [
  "BACKEND",
  "DATA",
  "DEVOPS",
  "FRONTEND",
  "LANGUAGE",
] as const;

export type SkillFilterCategory = (typeof SKILL_FILTER_CATEGORIES)[number];
