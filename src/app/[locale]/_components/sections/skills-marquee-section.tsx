import { useFindManySkills } from "@/hooks/queries/skills";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_SKILLS_VARS } from "../../queries";
import { SkillsMarquee } from "../skills-marquee";

export function SkillsMarqueeSection() {
  const getMessages = useMessages();
  const findManySkills = useFindManySkills(HOME_SKILLS_VARS);

  const skills = (findManySkills.data?.findManySkills.nodes ?? []).map(
    (skill) => ({
      id: skill.id,
      slug: skill.slug,
      title: getMessages(skill.i18n)?.title ?? skill.slug ?? skill.id,
    })
  );

  return <SkillsMarquee skills={skills} />;
}
