"use client";

import {
  ArrowUpRightIcon,
  CaretRightIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DevicesIcon,
  DiamondIcon,
  EnvelopeIcon,
  FlaskIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  ReadCvLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fragment, useCallback } from "react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Counter } from "@/components/counter";
import { CourseCard } from "@/components/course-card";
import { EducationCard } from "@/components/education-card";
import { ExperienceCard } from "@/components/experience-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillCard } from "@/components/skill-card";
import { SocialLink } from "@/components/social-links";
import { TitleLink } from "@/components/title-link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { ContributionGraph } from "@/components/ui/contribution-graph";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { ContactForm, type ContactSchema } from "@/forms/contact";
import { SortEnum } from "@/graphql/graphql";
import { useFindManyCourses } from "@/hooks/queries/courses";
import { useFindManyEducations } from "@/hooks/queries/educations";
import { useFindManyExperiences } from "@/hooks/queries/experiences";
import { useGetContributions } from "@/hooks/queries/external";
import { useFindManyProjects } from "@/hooks/queries/projects";
import { useFindManySkills } from "@/hooks/queries/skills";
import { useMessages } from "@/hooks/reactive/use-messages";
import { Link } from "@/i18n/navigation";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const getMessages = useMessages();
  const t = useTranslations("homePage");
  const tCommons = useTranslations("common");

  const getContributions = useGetContributions({ username: "yagrrusso" });
  const findManySkills = useFindManySkills({
    skillFilters: {},
    skillPagination: { limit: 50, skip: 0 },
    skillSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  });
  const findManyProjects = useFindManyProjects({
    projectSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
    projectPagination: { limit: 3 },
  });
  const findManyExperiences = useFindManyExperiences({
    experienceSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
    experiencePagination: { limit: 3 },
  });
  const findManyEducations = useFindManyEducations({
    educationSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
    educationPagination: { limit: 3 },
  });
  const findManyCourses = useFindManyCourses({
    courseSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
    coursePagination: { limit: 6 },
  });

  const handleSendMail = useCallback(
    (data: ContactSchema) => {
      window.location.href = `mailto:yagrrusso@gmail.com?subject=${data.name}&body=${data.message}%0A%0A${data.phone}%0A${data.email}`;
      toast.success(tCommons("successTitle"));
    },
    [tCommons]
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="container relative flex min-h-[92vh] w-full items-center gap-8 max-md:flex-col-reverse">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <InteractiveGridPattern className="mask-[radial-gradient(24rem_circle_at_center,white,transparent)] max-md:mask-[radial-gradient(50vw_circle_at_center,white,transparent)] -skew-y-7 max-md:h-1/2 md:ml-64" />
        </div>
        <AnimateOnScroll
          className="flex w-full min-w-0 flex-1 flex-col gap-4"
          y={16}
        >
          <div className="flex flex-col gap-2 tracking-wide">
            <div className="-ml-5 flex items-center gap-1 font-jetbrains-mono font-medium text-primary uppercase">
              <CaretRightIcon
                className="mb-0.5 animate-caret-blink"
                weight="bold"
              />
              <h2>Yago Russo</h2>
            </div>
            <Highlighter action="underline" padding={4}>
              <h1 className="font-semibold text-6xl max-md:text-5xl">
                {t("title")}
              </h1>
            </Highlighter>
          </div>
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="flex flex-wrap items-center gap-2">
            <TitleLink
              href="https://cdn.jsdelivr.net/gh/YaGRRusso/public-assets@main/documents/curriculum.pdf"
              icon={<ReadCvLogoIcon weight="bold" />}
              rel="noopener noreferrer"
              target="_blank"
              title={t("openCv")}
              variant="default"
            />
            <TitleLink href="#about-me" title={t("sections.aboutMe.title")} />
            <TitleLink
              href="#my-portfolio"
              title={t("sections.portfolio.title")}
            />
            <TitleLink href="#my-skills" title={t("sections.skills.title")} />
            <TitleLink
              href="#my-experience"
              title={t("sections.experience.title")}
            />
            <TitleLink
              href="#my-education"
              title={t("sections.education.title")}
            />
            <TitleLink href="#my-courses" title={t("sections.course.title")} />
            <TitleLink
              href="#get-in-touch"
              title={t("sections.getInTouch.title")}
            />
          </div>
        </AnimateOnScroll>
        <AnimateOnScroll
          className="relative flex flex-1 items-center justify-center max-md:-mb-16 max-md:justify-center"
          y={16}
        >
          <Image
            alt="sticker"
            className="max-md:mask-b-from-75% max-md:mask-b-to-100% animate-astronaut-float object-contain object-center drop-shadow-primary/25 drop-shadow-xl saturate-75"
            height={460}
            priority={true}
            src="/images/sticker.png"
            width={460}
          />
        </AnimateOnScroll>
      </div>
      <Separator />
      <Marquee className="w-full" pauseOnHover>
        <div className="flex items-center gap-8 p-4 opacity-75">
          {findManySkills.data?.findManySkills.nodes.map((skill) => (
            <Fragment key={skill.id}>
              <Avatar.Root className="size-2.5">
                <Avatar.Image
                  alt={skill.name}
                  src={simpleIconsCdn(skill.slug)}
                />
                <Avatar.Fallback className="bg-transparent">
                  <DiamondIcon weight="fill" />
                </Avatar.Fallback>
              </Avatar.Root>
              <span
                className="text-[0.625rem] uppercase tracking-wide"
                key={skill.id}
              >
                {skill.name}
              </span>
            </Fragment>
          ))}
        </div>
      </Marquee>
      <Separator />
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
      <Separator />
      <div className="w-full">
        <div className="container relative flex w-full flex-col justify-center gap-8">
          <AnimateOnScroll
            className="flex flex-1 flex-wrap justify-between gap-8"
            y={16}
          >
            <SectionTitle
              description={t("sections.portfolio.description")}
              id="my-portfolio"
              title={t("sections.portfolio.title")}
            />
            <Button asChild variant="outline">
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
          {findManyProjects.data?.findManyProjects.nodes
            .slice(0, 3)
            ?.map((proj, index) => (
              <AnimateOnScroll key={proj.id} y={16}>
                <ProjectCard
                  description={getMessages(proj.i18n)?.description}
                  direction={index % 2 === 0 ? "left" : "right"}
                  images={proj.images}
                  skills={proj.skills ?? []}
                  slug={proj.slug}
                  title={getMessages(proj.i18n).title}
                  urls={proj.urls ?? []}
                />
              </AnimateOnScroll>
            ))}
        </div>
      </div>
      <Separator />
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
      <Separator />
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
      <Separator />
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
            {findManyEducations.data?.findManyEducations.nodes.map(
              (education) => (
                <AnimateOnScroll key={education.id} y={16}>
                  <EducationCard
                    description={getMessages(education.i18n)?.description}
                    image={education.image ?? undefined}
                    level={education.level}
                    organization={education.organization}
                    period={education.period ?? undefined}
                    skills={education.skills ?? undefined}
                    status={education.status}
                    title={getMessages(education.i18n)?.title}
                    url={education.url ?? undefined}
                  />
                </AnimateOnScroll>
              )
            )}
          </div>
        </div>
      </div>
      <Separator />
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
            {findManyCourses.data?.findManyCourses.nodes.map((course) => (
              <AnimateOnScroll key={course.id} y={16}>
                <CourseCard
                  hours={course.hours ?? undefined}
                  image={course.image ?? undefined}
                  organization={course.organization}
                  skills={course.skills ?? undefined}
                  status={course.status}
                  title={getMessages(course.i18n)?.title}
                  url={course.url ?? undefined}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <Marquee className="w-full" pauseOnHover>
        <div className="flex items-center gap-8 p-4 opacity-75">
          {findManySkills.data?.findManySkills.nodes.map((skill) => (
            <Fragment key={skill.id}>
              <Avatar.Root className="size-2.5">
                <Avatar.Image
                  alt={skill.name}
                  src={simpleIconsCdn(skill.slug)}
                />
                <Avatar.Fallback className="bg-transparent">
                  <DiamondIcon weight="fill" />
                </Avatar.Fallback>
              </Avatar.Root>
              <span
                className="text-[0.625rem] uppercase tracking-wide"
                key={skill.id}
              >
                {skill.name}
              </span>
            </Fragment>
          ))}
        </div>
      </Marquee>
      <Separator />
      <div className="w-full">
        <div className="container relative flex w-full flex-col gap-8">
          <div className="flex gap-x-32 gap-y-8 max-lg:flex-col">
            <AnimateOnScroll
              className="flex min-w-0 flex-1 flex-col gap-8"
              x={-16}
            >
              <SectionTitle
                description={t("sections.getInTouch.description")}
                id="get-in-touch"
                title={t("sections.getInTouch.title")}
              />
              <div className="flex flex-col gap-4">
                <div className="flex gap-6 max-sm:flex-col">
                  <Image
                    alt="portrait"
                    className="rounded-lg"
                    height={96}
                    priority={true}
                    src="/images/portrait.jpg"
                    width={96}
                  />
                  <div className="flex flex-col gap-2">
                    <strong className="text-4xl">Yago Russo</strong>
                    <span className="text-muted-foreground">
                      Software Engineer
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <SocialLink
                    href="https://github.com/yagrrusso"
                    icon={<GithubLogoIcon className="size-6" />}
                    title="GitHub"
                  />
                  <SocialLink
                    href="https://www.linkedin.com/in/yago-russo"
                    icon={<LinkedinLogoIcon className="size-6" />}
                  />
                  <SocialLink
                    href="https://wa.me/5551986824203"
                    icon={<WhatsappLogoIcon className="size-6" />}
                  />
                  <SocialLink
                    href="mailto:yagrrusso@gmail.com"
                    icon={<EnvelopeIcon className="size-6" />}
                  />
                  <SocialLink
                    href="tel:51986824203"
                    icon={<PhoneIcon className="size-6" />}
                  />
                </div>
              </div>
              <span className="text-muted-foreground">
                {t("sections.getInTouch.message")}
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll className="min-w-0 flex-1" x={16}>
              <ContactForm onSub={handleSendMail} />
            </AnimateOnScroll>
          </div>
          {getContributions.data && (
            <AnimateOnScroll y={16}>
              <ContributionGraph.Root
                data={getContributions.data.contributions}
              >
                <ContributionGraph.Calendar>
                  {({ activity, dayIndex, weekIndex }) => (
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <ContributionGraph.Block
                          activity={activity}
                          dayIndex={dayIndex}
                          weekIndex={weekIndex}
                        />
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        <p className="font-semibold">{activity.date}</p>
                        <p>{activity.count} contributions</p>
                      </Tooltip.Content>
                    </Tooltip.Root>
                  )}
                </ContributionGraph.Calendar>
                <ContributionGraph.Footer>
                  <ContributionGraph.TotalCount />
                  <ContributionGraph.Legend />
                </ContributionGraph.Footer>
              </ContributionGraph.Root>
            </AnimateOnScroll>
          )}
        </div>
      </div>
    </div>
  );
}
