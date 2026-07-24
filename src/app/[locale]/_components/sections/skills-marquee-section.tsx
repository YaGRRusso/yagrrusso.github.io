import { useGetMe } from "@/hooks/queries/auth";
import { useMessages } from "@/hooks/reactive/use-messages";
import { SkillsMarquee } from "../skills-marquee";

export function SkillsMarqueeSection() {
  const getMessages = useMessages();
  const getMe = useGetMe();

  const skills = (getMe.data?.getMe.skills ?? []).map((skill) => ({
    id: skill.id,
    slug: skill.slug,
    title: getMessages(skill.i18n)?.title ?? skill.slug ?? skill.id,
  }));

  return <SkillsMarquee skills={skills} />;
}
