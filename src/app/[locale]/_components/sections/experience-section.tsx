import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyExperiences } from "@/hooks/queries/experiences";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_EXPERIENCES_VARS } from "../../queries";
import { mapOrganization, mapPeriod } from "../card-props";
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
        {findManyExperiences.data?.findManyExperiences.nodes
          .filter((experience) => experience.organization)
          .map((experience) => (
            <AnimateOnScroll key={experience.id} y={16}>
              <ExperienceCard
                organization={mapOrganization(experience.organization!)}
                roles={experience.roles.map((role) => ({
                  description: getMessages(role.i18n)?.description ?? "",
                  period: mapPeriod(role.period),
                  skills: role.skills?.map((skill) => ({
                    id: skill.id,
                    slug: skill.slug,
                    title:
                      getMessages(skill.i18n)?.title ?? skill.slug ?? skill.id,
                  })),
                  title: getMessages(role.i18n)?.title ?? "",
                }))}
              />
            </AnimateOnScroll>
          ))}
      </div>
    </div>
  );
}
