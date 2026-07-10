import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyEducations } from "@/hooks/queries/educations";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_EDUCATIONS_VARS } from "../../queries";
import { EducationCard } from "../education-card";

export function EducationSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyEducations = useFindManyEducations(HOME_EDUCATIONS_VARS);

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.education.description")}
            id="my-education"
            title={t("sections.education.title")}
          />
        </AnimateOnScroll>
        <div className="flex w-full flex-col gap-4">
          {findManyEducations.data?.findManyEducations.nodes
            .filter((education) => education.organization)
            .map((education) => (
              <AnimateOnScroll key={education.id} y={16}>
                <EducationCard
                  description={getMessages(education.i18n)?.description}
                  image={education.image ?? undefined}
                  level={education.level}
                  organization={education.organization!}
                  period={education.period ?? undefined}
                  skills={education.skills ?? undefined}
                  status={education.status}
                  title={getMessages(education.i18n)?.title ?? ""}
                  url={education.url ?? undefined}
                />
              </AnimateOnScroll>
            ))}
        </div>
      </div>
    </div>
  );
}
