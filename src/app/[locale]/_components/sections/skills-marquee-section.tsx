import { useFindManySkills } from "@/hooks/queries/skills";
import { HOME_SKILLS_VARS } from "../../queries";
import { SkillsMarquee } from "../skills-marquee";

export function SkillsMarqueeSection() {
  const findManySkills = useFindManySkills(HOME_SKILLS_VARS);

  return (
    <SkillsMarquee skills={findManySkills.data?.findManySkills.nodes ?? []} />
  );
}
