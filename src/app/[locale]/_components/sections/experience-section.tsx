import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyExperiences } from "@/hooks/queries/experiences";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_EXPERIENCES_VARS } from "../../queries";
import { ExperienceCard } from "../experience-card";

export function ExperienceSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyExperiences = useFindManyExperiences(HOME_EXPERIENCES_VARS);

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.experience.description")}
            id="my-experience"
            title={t("sections.experience.title")}
          />
        </AnimateOnScroll>
        {findManyExperiences.data?.findManyExperiences.nodes.map(
          (experience) => (
            <AnimateOnScroll key={experience.id} y={16}>
              <ExperienceCard
                organization={experience.organization}
                roles={experience.roles.map((role) => ({
                  title: getMessages(role.i18n)?.title,
                  description: getMessages(role.i18n)?.description,
                  skills: role.skills ?? undefined,
                  period: role.period ?? undefined,
                }))}
              />
            </AnimateOnScroll>
          )
        )}
      </div>
    </div>
  );
}
