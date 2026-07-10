import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Counter } from "@/components/counter";
import { SectionTitle } from "@/components/section-title";
import { useGetMe } from "@/hooks/queries/auth";
import { useMessages } from "@/hooks/reactive/use-messages";

export function AboutSection() {
  const t = useTranslations("homePage");
  const getMe = useGetMe();
  const getMessages = useMessages();

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
            {getMessages(getMe.data?.getMe.i18n)?.description}
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
