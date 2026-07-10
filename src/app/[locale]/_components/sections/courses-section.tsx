import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { useFindManyCourses } from "@/hooks/queries/courses";
import { useMessages } from "@/hooks/reactive/use-messages";
import { HOME_COURSES_VARS } from "../../queries";
import { mapOrganization } from "../card-props";
import { CourseCard } from "../course-card";

export function CoursesSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyCourses = useFindManyCourses(HOME_COURSES_VARS);

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.course.description")}
            id="my-courses"
            title={t("sections.course.title")}
          />
        </AnimateOnScroll>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {findManyCourses.data?.findManyCourses.nodes
            .filter((course) => course.organization)
            .map((course) => (
              <AnimateOnScroll key={course.id} y={16}>
                <CourseCard
                  description={getMessages(course.i18n)?.description ?? ""}
                  hours={course.hours ?? undefined}
                  image={course.image ?? undefined}
                  organization={mapOrganization(course.organization!)}
                  skills={course.skills?.map((skill) => ({
                    id: skill.id,
                    slug: skill.slug,
                    title: getMessages(skill.i18n)?.title ?? skill.slug,
                  }))}
                  status={course.status}
                  title={getMessages(course.i18n)?.title ?? ""}
                  url={course.url ?? undefined}
                />
              </AnimateOnScroll>
            ))}
        </div>
      </div>
    </div>
  );
}
