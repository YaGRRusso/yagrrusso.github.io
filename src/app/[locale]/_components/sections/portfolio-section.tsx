import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { useFindManyProjects } from "@/hooks/queries/projects";
import { useMessages } from "@/hooks/reactive/use-messages";
import { Link } from "@/i18n/navigation";
import { HOME_PROJECTS_VARS } from "../../queries";
import { ProjectCard } from "../project-card";

export function PortfolioSection() {
  const t = useTranslations("homePage");
  const getMessages = useMessages();
  const findManyProjects = useFindManyProjects(HOME_PROJECTS_VARS);

  return (
    <div className="w-full">
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <SectionTitle
          description={t("sections.portfolio.description")}
          id="my-portfolio"
          title={t("sections.portfolio.title")}
        />
        {findManyProjects.data?.findManyProjects.nodes
          .slice(0, 3)
          ?.map((proj, index) => (
            <AnimateOnScroll key={proj.id} y={16}>
              <ProjectCard
                description={getMessages(proj.i18n)?.description}
                direction={index % 2 === 0 ? "left" : "right"}
                images={proj.images ?? []}
                skills={proj.skills?.map((skill) => ({
                  id: skill.id,
                  slug: skill.slug,
                  title:
                    getMessages(skill.i18n)?.title ?? skill.slug ?? skill.id,
                }))}
                slug={proj.slug ?? proj.id}
                title={getMessages(proj.i18n)?.title}
                urls={proj.urls ?? []}
              />
            </AnimateOnScroll>
          ))}
        <AnimateOnScroll y={16}>
          <Button asChild className="w-full py-8" size="lg" variant="outline">
            <Link
              href="https://github.com/YaGRRusso?tab=repositories"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("viewAll")}
              <ArrowUpRightIcon weight="bold" />
            </Link>
          </Button>
        </AnimateOnScroll>
      </div>
    </div>
  );
}
