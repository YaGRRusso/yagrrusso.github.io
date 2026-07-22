import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyExperiences } from "@/hooks/queries/experiences";
import { useMessages } from "@/hooks/reactive/use-messages";
import { groupByRelated } from "@/lib/group-by-related";
import { HOME_EXPERIENCES_VARS } from "../../queries";
import { mapOrganization, mapPeriod } from "../card-props";
import { ExperienceCard } from "../experience-card";

export function ExperienceSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyExperiences = useFindManyExperiences(HOME_EXPERIENCES_VARS);

  const groups = groupByRelated(
    findManyExperiences.data?.findManyExperiences.nodes ?? [],
    (experience) =>
      experience.organization ?? { id: "unknown", name: "Unknown" },
    (organization) => organization.id
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
        {groups.map(({ related: organization, items: experiences }) => (
          <AnimateOnScroll key={organization.id} y={16}>
            <ExperienceCard
              organization={mapOrganization(organization)}
              roles={experiences.map((experience) => ({
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
        ))}
      </div>
    </div>
  );
}
