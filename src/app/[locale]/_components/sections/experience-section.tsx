import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyGroupedExperiences } from "@/hooks/queries/experiences";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_EXPERIENCES_VARS } from "../../queries";
import { mapOrganization, mapPeriod } from "../card-props";
import { ExperienceCard } from "../experience-card";

export function ExperienceSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyGroupedExperiences = useFindManyGroupedExperiences(
    HOME_EXPERIENCES_VARS
  );

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
        {findManyGroupedExperiences.data?.findManyGroupedExperiences.nodes.map(
          (group) => (
            <AnimateOnScroll key={group.organization?.id ?? "none"} y={16}>
              <ExperienceCard
                organization={mapOrganization(group.organization)}
                roles={group.experiences.map((experience) => ({
                  description: getMessages(experience.i18n)?.description ?? "",
                  period: mapPeriod(experience.period),
                  skills: experience.skills?.map((skill) => ({
                    id: skill.id,
                    slug: skill.slug,
                    title:
                      getMessages(skill.i18n)?.title ?? skill.slug ?? skill.id,
                  })),
                  title: getMessages(experience.i18n)?.title ?? "",
                }))}
              />
            </AnimateOnScroll>
          )
        )}
      </div>
    </div>
  );
}
