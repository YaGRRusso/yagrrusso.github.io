import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Counter } from "@/components/counter";
import { SectionTitle } from "@/components/section-title";

export function AboutSection() {
  const t = useTranslations("homePage");

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <AnimateOnScroll className="flex flex-1 flex-col gap-4" y={16}>
          <SectionTitle
            description={t("sections.aboutMe.description", {
              year: 2020,
            })}
            id="about-me"
            title={t("sections.aboutMe.title")}
          />
          <p className="text-muted-foreground">
            {t.rich("sections.aboutMe.message", {
              age: dayjs().diff("2001-11-30", "year", false),
              address: "Gravataí, RS, Brazil",
              br: () => <br />,
            })}
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Counter
              accent="+"
              label={t("yearsOfExperience")}
              value={dayjs().diff("2020-01-01", "year", false)}
            />
            <Counter accent="+" label={t("projectsCompleted")} value={32} />
          </div>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
