"use client";

import {
  ArrowUpRightIcon,
  CaretRightIcon,
  CodeIcon,
  DiamondIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fragment, useCallback } from "react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Counter } from "@/components/counter";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SocialLink } from "@/components/social-links";
import { TitleLink } from "@/components/title-link";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/ui/timeline";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ContactForm, type ContactSchema } from "@/forms/contact";
import { useFindAllProjects } from "@/hooks/queries/projects";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { Link } from "@/i18n/navigation";
import { simpleIconsCdn } from "@/lib/cdn";

const items = [
  {
    date: "Mar 15, 2024",
    description:
      "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    id: 1,
    title: "Project Kickoff",
  },
  {
    date: "Mar 22, 2024",
    description:
      "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    id: 2,
    title: "Design Phase",
  },
  {
    date: "Apr 5, 2024",
    description:
      "Backend API implementation and frontend component development in progress.",
    id: 3,
    title: "Development Sprint",
  },
  {
    date: "Apr 19, 2024",
    description:
      "Quality assurance testing, performance optimization, and production deployment preparation.",
    id: 4,
    title: "Testing & Deployment",
  },
];

export function ClientPage() {
  const t = useTranslations("homePage");
  const tCommons = useTranslations("common");

  const findAllSkills = useFindAllSkills();
  const findAllProjects = useFindAllProjects();

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
          <div className="scrollbar-hidden flex items-center gap-2 overflow-auto md:flex-wrap">
            <TitleLink href="#about-me" title={t("sections.aboutMe.title")} />
            <TitleLink
              href="#my-portfolio"
              title={t("sections.portfolio.title")}
            />
            <TitleLink href="#my-skills" title={t("sections.skills.title")} />
            <TitleLink
              href="#my-qualifications"
              title={t("sections.qualifications.title")}
            />
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
            height={512}
            priority={true}
            src="/images/sticker.png"
            width={512}
          />
        </AnimateOnScroll>
      </div>
      <Separator />
      <Marquee className="w-full" pauseOnHover>
        <div className="flex items-center gap-8 px-4 py-6 opacity-75">
          {findAllSkills.data?.findAllSkills?.map((skill) => (
            <Fragment key={skill.id}>
              <Avatar.Root className="size-4 brightness-0 dark:invert">
                <Avatar.Image
                  alt={skill.name}
                  src={simpleIconsCdn(skill.slug)}
                />
                <Avatar.Fallback className="bg-transparent">
                  <DiamondIcon className="size-4" weight="fill" />
                </Avatar.Fallback>
              </Avatar.Root>
              <span className="font-medium text-xs uppercase" key={skill.id}>
                {skill.name}
              </span>
            </Fragment>
          ))}
        </div>
      </Marquee>
      <Separator />
      <div className="w-full bg-alternative">
        <div className="container relative flex w-full flex-col justify-center gap-8">
          <div className="flex gap-x-32 gap-y-4 max-lg:flex-col">
            <AnimateOnScroll className="flex flex-1 flex-col gap-4" x={-16}>
              <SectionTitle
                description={t("sections.aboutMe.description", {
                  startYear: 2020,
                })}
                id="about-me"
                title={t("sections.aboutMe.title")}
              />
              <p className="text-muted-foreground">
                {t.rich("sections.aboutMe.message", {
                  age: dayjs().diff("2001-11-30", "year", false),
                  address: "Rio Grande do Sul, Brazil",
                  span: (chunks) => {
                    const text = Array.isArray(chunks) ? chunks[0] : chunks;
                    const words =
                      typeof text === "string" ? text.split(";") : [];
                    return (
                      <TypingAnimation
                        deleteSpeed={30}
                        loop
                        pauseDelay={1600}
                        startOnView
                        typeSpeed={80}
                        words={words}
                      />
                    );
                  },
                })}
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll className="flex flex-1 flex-col gap-8" x={16}>
              <p className="text-muted-foreground">
                {t("sections.aboutMe.experience", { startAge: 18 })}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <Counter
                  accent="+"
                  className="flex-1"
                  label={t("yearsOfExperience")}
                  value={dayjs().diff("2020-01-01", "year", false)}
                />
                <Counter
                  accent="+"
                  className="flex-1"
                  label={t("projectsCompleted")}
                  value={32}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      <Separator />
      <div className="container relative flex w-full flex-col justify-center gap-8">
        <DotPattern className="mask-[radial-gradient(48rem_circle_at_center,white,transparent)] -z-10 opacity-50" />
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
            <Link href="/portfolio">
              {t("viewAll")}
              <ArrowUpRightIcon weight="bold" />
            </Link>
          </Button>
        </AnimateOnScroll>
        {findAllProjects.data?.findAllProjects
          .slice(0, 3)
          ?.map((proj, index) => (
            <AnimateOnScroll key={proj.id} y={16}>
              <ProjectCard
                demoUrl={proj.demoUrl}
                description={proj.i18n[0]?.messages.description || ""}
                direction={index % 2 === 0 ? "left" : "right"}
                images={proj.images}
                name={proj.i18n[0]?.messages.name || ""}
                repositoryUrl={proj.repositoryUrl}
                skills={proj.skills}
                slug={proj.slug}
              />
            </AnimateOnScroll>
          ))}
      </div>
      <Separator />
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
          {[new Array(5)].map((_, index) => (
            <Carousel.Content key={index}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Carousel.Item
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                  key={index}
                >
                  <div className="flex h-full flex-col justify-center gap-4 rounded border bg-alternative px-8 py-12">
                    <CodeIcon
                      className="size-12 rounded bg-primary p-2"
                      weight="bold"
                    />
                    <h3 className="font-semibold text-4xl max-md:text-3xl">
                      {index + 1}. Lorem Ipsum
                    </h3>
                    <p className="text-muted-foreground">
                      lorem ipsum dolor sit amet
                    </p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>
          ))}
        </AnimateOnScroll>
      </Carousel.Root>
      <Separator />
      <div className="w-full bg-alternative">
        <div className="container relative flex w-full justify-center gap-x-32 gap-y-8 max-lg:flex-col">
          <AnimateOnScroll className="flex flex-col gap-8" x={-16}>
            <SectionTitle
              description={t("sections.qualifications.description")}
              id="my-qualifications"
              title={t("sections.qualifications.title")}
            />
            <Timeline.Root>
              {items.map((item) => (
                <Timeline.Item key={item.id} step={item.id}>
                  <Timeline.Header>
                    <Timeline.Separator />
                    <Timeline.Date>{item.date}</Timeline.Date>
                    <Timeline.Title>{item.title}</Timeline.Title>
                    <Timeline.Indicator />
                  </Timeline.Header>
                  <Timeline.Content>{item.description}</Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline.Root>
          </AnimateOnScroll>
          <AnimateOnScroll x={16}>
            <Timeline.Root>
              {items.map((item) => (
                <Timeline.Item key={item.id} step={item.id}>
                  <Timeline.Header>
                    <Timeline.Separator />
                    <Timeline.Date>{item.date}</Timeline.Date>
                    <Timeline.Title>{item.title}</Timeline.Title>
                    <Timeline.Indicator />
                  </Timeline.Header>
                  <Timeline.Content>{item.description}</Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline.Root>
          </AnimateOnScroll>
        </div>
      </div>
      <Separator />
      <div className="container relative flex w-full gap-x-32 gap-y-8 max-lg:flex-col">
        <AnimateOnScroll className="flex flex-1 flex-col gap-8" x={-16}>
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
                <span className="text-muted-foreground">Software Engineer</span>
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
          {/* <Separator className="-my-4" /> */}
          <span className="text-muted-foreground">
            {t("sections.getInTouch.message")}
          </span>
        </AnimateOnScroll>
        <AnimateOnScroll className="flex-1" x={16}>
          <ContactForm onSub={handleSendMail} />
        </AnimateOnScroll>
      </div>
    </div>
  );
}
