"use client";

import {
  ArrowUpRightIcon,
  CaretRightIcon,
  DiamondIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  HashIcon,
  LinkedinLogoIcon,
  PhoneIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { Counter } from "@/components/counter";
import { SectionTitle } from "@/components/section-title";
import { SocialLink } from "@/components/social-links";
import { TitleLink } from "@/components/title-link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/ui/timeline";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ContactForm, type ContactSchema } from "@/forms/contact";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { simpleIconsCdn } from "@/lib/cdn";
import { cn } from "@/lib/utils";

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

const project = {
  createdAt: new Date(),
  demoUrl: "https://example.com/demo",
  i18n: [
    {
      locale: "pt",
      messages: {
        description: "Lorem ipsum dolor sit amet",
        name: "Lorem Ipsum",
      },
    },
    {
      locale: "en",
      messages: {
        description: "Lorem ipsum dolor sit amet",
        name: "Lorem Ipsum",
      },
    },
  ],
  id: "abc123",
  images: [
    "https://picsum.photos/1280/720?random=1",
    "https://picsum.photos/1280/720?random=2",
    "https://picsum.photos/1280/720?random=3",
  ],
  repositoryUrl: "https://github.com/demo",
  skills: [
    {
      id: "html5",
      name: "html5",
      slug: "html5",
    },
    {
      id: "css",
      name: "css",
      slug: "css",
    },
    {
      id: "javascript",
      name: "javascript",
      slug: "javascript",
    },
  ],
  slug: "abc",
  updatedAt: new Date(),
};

export function ClientPage() {
  const t = useTranslations("homePage");
  const tCommons = useTranslations("common");

  // const birth = useMemo(() => dayjs().diff("2001-11-30", "year", false), []);
  const exp = useMemo(() => dayjs().diff("2020-01-01", "year", false), []);

  const findAllSkills = useFindAllSkills();
  // const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

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
            className="max-md:mask-b-from-70% max-md:mask-b-to-100% animate-astronaut-float object-contain object-center drop-shadow-primary/25 drop-shadow-xl saturate-75"
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
                  value={exp}
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
        <DotPattern className="mask-[radial-gradient(36rem_circle_at_center,white,transparent)] -z-10 opacity-50" />
        <AnimateOnScroll
          className="flex flex-1 flex-wrap justify-between gap-8"
          y={16}
        >
          <SectionTitle
            description={t("sections.portfolio.description")}
            id="my-portfolio"
            title={t("sections.portfolio.title")}
          />
          <Button size="lg" variant="outline">
            {t("viewAll")}
            <ArrowUpRightIcon weight="bold" />
          </Button>
        </AnimateOnScroll>
        {[project, project, project].map((proj, index) => (
          <AnimateOnScroll key={proj.id + index} y={16}>
            <div
              className={cn(
                "flex h-128 items-center justify-center rounded border border-primary/25 bg-alternative max-lg:h-auto max-lg:flex-col-reverse",
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              )}
            >
              <div className="h-full w-full min-w-0 flex-1">
                <div className="flex h-full flex-col justify-between gap-8 p-8 max-md:p-6">
                  <strong className="flex items-center font-jetbrains-mono text-primary text-sm uppercase tracking-wide">
                    <HashIcon weight="bold" />
                    <span>{proj.slug}</span>
                  </strong>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-6xl max-md:text-5xl">
                      {proj.i18n[0].messages.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {proj.i18n[0].messages.description}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                      {proj.skills.map((skill) => (
                        <Badge
                          className="uppercase"
                          key={skill.id}
                          variant="secondary"
                        >
                          <Avatar.Root className="size-3 brightness-0 invert">
                            <Avatar.Image
                              alt={skill.name}
                              src={simpleIconsCdn(skill.slug)}
                            />
                            <Avatar.Fallback className="bg-transparent">
                              <DiamondIcon className="size-4" weight="fill" />
                            </Avatar.Fallback>
                          </Avatar.Root>
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex max-w-96 items-center gap-2 max-lg:hidden">
                    <Button
                      asChild
                      className="flex-1"
                      size="sm"
                      variant="outline"
                    >
                      <a
                        className="underline-offset-2 hover:underline"
                        href={proj.repositoryUrl}
                        target="_blank"
                      >
                        <GithubLogoIcon />
                        Repo
                      </a>
                    </Button>
                    <Button
                      asChild
                      className="flex-1"
                      size="sm"
                      variant="outline"
                    >
                      <a
                        className="underline-offset-2 hover:underline"
                        href={proj.demoUrl}
                        target="_blank"
                      >
                        <ArrowUpRightIcon />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="relative h-full w-full min-w-0 flex-1">
                <Image
                  alt={proj.slug}
                  className="h-full w-full rounded object-cover object-center"
                  height={720}
                  src={proj.images[index]}
                  width={720}
                />
                <div className="absolute bottom-0 left-0 flex w-full items-center gap-2 p-2 opacity-75 transition-opacity hover:opacity-100 lg:hidden">
                  <Button
                    asChild
                    className="flex-1"
                    size="sm"
                    variant="outline"
                  >
                    <a
                      className="underline-offset-2 hover:underline"
                      href={proj.repositoryUrl}
                      target="_blank"
                    >
                      <GithubLogoIcon />
                      Github
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="flex-1"
                    size="sm"
                    variant="outline"
                  >
                    <a
                      className="underline-offset-2 hover:underline"
                      href={proj.demoUrl}
                      target="_blank"
                    >
                      <ArrowUpRightIcon />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
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
