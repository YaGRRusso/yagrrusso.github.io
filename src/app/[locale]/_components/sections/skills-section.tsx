import {
  ArrowUpRightIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DevicesIcon,
  FlaskIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Link } from "@/i18n/navigation";
import { SkillCard } from "../skill-card";

export function SkillsSection() {
  const t = useTranslations("homePage");

  return (
    <div className="w-full">
      <Carousel.Root
        className="container relative flex w-full flex-col justify-center gap-8"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.skills.description")}
            id="my-skills"
            title={t("sections.skills.title")}
          />
          <div className="flex h-fit items-center gap-4">
            <Button asChild variant="outline">
              <Link href="/skills">
                {t("viewAll")}
                <ArrowUpRightIcon weight="bold" />
              </Link>
            </Button>
            <Carousel.Previous />
            <Carousel.Next />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll y={16}>
          <Carousel.Content>
            <SkillCard
              description={t("sections.skills.cards.frontend.description")}
              icon={<DevicesIcon className="size-10" />}
              title={t("sections.skills.cards.frontend.title")}
            />
            <SkillCard
              description={t("sections.skills.cards.backend.description")}
              icon={<CodeIcon className="size-10" />}
              title={t("sections.skills.cards.backend.title")}
            />
            <SkillCard
              description={t("sections.skills.cards.devops.description")}
              icon={<CloudIcon className="size-10" />}
              title={t("sections.skills.cards.devops.title")}
            />
            <SkillCard
              description={t("sections.skills.cards.database.description")}
              icon={<DatabaseIcon className="size-10" />}
              title={t("sections.skills.cards.database.title")}
            />
            <SkillCard
              description={t("sections.skills.cards.quality.description")}
              icon={<FlaskIcon className="size-10" />}
              title={t("sections.skills.cards.quality.title")}
            />
          </Carousel.Content>
        </AnimateOnScroll>
      </Carousel.Root>
    </div>
  );
}
