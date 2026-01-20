"use client";

import {
  CalendarIcon,
  DiamondIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinAreaIcon,
  PhoneIcon,
  UserIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import dayjs from "dayjs";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { IntroInfo } from "@/components/intro-info";
import { SectionTitle } from "@/components/section-title";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { Timeline } from "@/components/ui/timeline";
import { ContactForm, type ContactSchema } from "@/forms/contact";
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

  const birth = useMemo(() => dayjs().diff("2001-11-30", "year", false), []);
  // const exp = useMemo(() => dayjs().diff("2020-01-01", "year", false), []);

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
      <div className="container relative flex min-h-[92vh] w-full items-center justify-center gap-8 max-md:flex-col-reverse">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <InteractiveGridPattern className="mask-[radial-gradient(24rem_circle_at_center,white,transparent)] max-md:mask-[radial-gradient(50vw_circle_at_center,white,transparent)] -skew-y-7 max-md:h-1/2 md:ml-64" />
        </div>
        <div className="flex w-full min-w-0 max-w-lg flex-1 flex-col gap-2">
          <span>Yago Russo</span>
          <h1 className="font-jetbrains-mono text-5xl">
            <Highlighter action="underline">{t("title")}</Highlighter>
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
          {/* <div className="mt-6 flex justify-between gap-2">
            <div className="flex items-center gap-2 max-sm:flex-col-reverse max-sm:text-center">
              <strong className="text-5xl">
                {exp}
                <span className="text-primary">+</span>
              </strong>
              <span className="max-w-28 text-sm">{t("yearsOfExperience")}</span>
            </div>
            <div className="flex items-center gap-2 max-sm:flex-col-reverse max-sm:text-center">
              <strong className="text-5xl">
                {findAllSkills.data?.findAllSkills?.length}
                <span className="text-primary">+</span>
              </strong>
              <span className="max-w-28 text-sm">{t("technologiesUsed")}</span>
            </div>
          </div> */}
          <div className="scrollbar-hidden mt-6 flex items-center gap-1 overflow-auto md:flex-wrap">
            <Button asChild size="sm" variant="outline">
              <Link href="#my-intro" id="my-intro">
                {t("sections.aboutMe.title")}
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="#my-portfolio" id="my-portfolio">
                {t("sections.myPortfolio.title")}
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="#my-qualifications" id="my-qualifications">
                {t("sections.myQualifications.title")}
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="#get-in-touch" id="get-in-touch">
                {t("sections.getInTouch.title")}
              </Link>
            </Button>
          </div>
        </div>
        <AnimateOnScroll
          className="relative flex flex-1 items-center justify-center max-md:-mb-16 max-md:justify-center"
          x={16}
        >
          <Image
            alt="sticker"
            className="max-md:mask-[linear-gradient(to_bottom,black_70%,transparent_100%)] object-contain object-center drop-shadow-primary/25 drop-shadow-xl saturate-75"
            height={512}
            priority={true}
            src="/images/sticker.png"
            width={512}
          />
        </AnimateOnScroll>
      </div>
      <Separator />
      <Marquee className="w-full" pauseOnHover>
        <div className="flex items-center gap-16 px-4 py-6 opacity-75">
          {findAllSkills.data?.findAllSkills?.map((skill) => (
            // <Tooltip.Root key={skill.id}>
            //   <Tooltip.Trigger asChild>
            //     <Avatar.Root className="size-6 opacity-75 drop-shadow drop-shadow-foreground/10 hover:opacity-100">
            //       <Avatar.Image
            //         alt={skill.name}
            //         src={simpleIconsCdn(skill.slug)}
            //       />
            //       <Avatar.Fallback>
            //         <ImageBrokenIcon />
            //       </Avatar.Fallback>
            //     </Avatar.Root>
            //   </Tooltip.Trigger>
            //   <Tooltip.Content>{skill.name}</Tooltip.Content>
            // </Tooltip.Root>
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
        <div className="container relative flex w-full flex-col items-center justify-center gap-16">
          <SectionTitle
            description={t("sections.aboutMe.description")}
            id="my-intro"
            title={t("sections.aboutMe.title")}
          />
          <div className="flex items-center gap-x-24 gap-y-16 max-lg:flex-col">
            <AnimateOnScroll
              className="w-full text-center text-muted-foreground"
              x={-16}
            >
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </AnimateOnScroll>
            <AnimateOnScroll className="flex w-full flex-col gap-2" x={16}>
              <IntroInfo
                description="Yago Russo"
                icon={<UserIcon />}
                title={t("infos.name")}
              />
              <IntroInfo
                description={t("infos.yearsOld", { age: birth })}
                icon={<CalendarIcon />}
                title={t("infos.age")}
              />
              <IntroInfo
                description="(51) 98682-4203"
                icon={<PhoneIcon />}
                title={t("infos.phone")}
              />
              <IntroInfo
                description="yagrrusso@gmail.com"
                icon={<EnvelopeIcon />}
                title={t("infos.email")}
              />
              <IntroInfo
                description="Gravataí RS, Brasil"
                icon={<MapPinAreaIcon />}
                title={t("infos.address")}
              />
            </AnimateOnScroll>
          </div>
        </div>
      </div>
      <Separator />
      <div className="container relative flex w-full flex-col items-center justify-center gap-16">
        <DotPattern className="mask-[radial-gradient(36rem_circle_at_center,white,transparent)] -z-10 opacity-50" />
        <SectionTitle
          description={t("sections.myPortfolio.description")}
          id="my-portfolio"
          title={t("sections.myPortfolio.title")}
        />
        <div className="grid w-full grid-cols-2 gap-6 max-lg:grid-cols-1">
          <AnimateOnScroll
            className="flex h-64 items-center justify-center rounded bg-primary p-4"
            y={16}
          />
          <AnimateOnScroll
            className="flex h-64 items-center justify-center rounded bg-primary p-4"
            y={16}
          />
          <AnimateOnScroll
            className="flex h-64 items-center justify-center rounded bg-primary p-4"
            y={16}
          />
          <AnimateOnScroll
            className="flex h-64 items-center justify-center rounded bg-primary p-4"
            y={16}
          />
          <div className="col-span-full flex items-center justify-center">
            <Button
              asChild
              className="w-full max-w-70"
              size="sm"
              variant="outline"
            >
              <Link href="/portfolio">{t("viewAll")}</Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className="w-full bg-alternative">
        <div className="container relative flex w-full flex-col items-center justify-center gap-16">
          <SectionTitle
            description={t("sections.myQualifications.description")}
            id="my-qualifications"
            title={t("sections.myQualifications.title")}
          />
          <div className="flex items-center gap-x-24 gap-y-16 max-lg:flex-col">
            <AnimateOnScroll x={-16}>
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
      </div>
      <div className="container relative flex w-full flex-col items-center justify-center gap-16">
        <SectionTitle
          description={t("sections.getInTouch.description")}
          id="get-in-touch"
          title={t("sections.getInTouch.title")}
        />
        <div className="flex w-full gap-x-24 gap-y-16 max-lg:flex-col">
          <AnimateOnScroll className="flex flex-1 flex-col gap-6" x={-16}>
            <div className="flex items-center gap-8 max-sm:flex-col max-sm:justify-start">
              <Image
                alt="portrait"
                className="rounded-3xl"
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
            <div className="flex items-center gap-4 max-sm:justify-center max-sm:gap-2">
              <Button asChild size="auto" variant="ghost">
                <a
                  className="hover:text-foreground"
                  href="https://github.com/yagrrusso"
                  rel="noopener"
                  target="_blank"
                >
                  <GithubLogoIcon className="size-7" />
                </a>
              </Button>
              <Button asChild size="auto" variant="ghost">
                <a
                  className="hover:text-foreground"
                  href="https://www.linkedin.com/in/yago-russo/"
                  rel="noopener"
                  target="_blank"
                >
                  <LinkedinLogoIcon className="size-7" />
                </a>
              </Button>
              <Button asChild size="auto" variant="ghost">
                <a
                  className="hover:text-foreground"
                  href="https://wa.me/5551986824203"
                  rel="noopener"
                  target="_blank"
                >
                  <WhatsappLogoIcon className="size-7" />
                </a>
              </Button>
              <Button asChild size="auto" variant="ghost">
                <a
                  className="hover:text-foreground"
                  href="mailto:yagrrusso@gmail.com"
                  rel="noopener"
                  target="_blank"
                >
                  <EnvelopeIcon className="size-7" />
                </a>
              </Button>
            </div>
            <Separator />
            <span className="text-center text-muted-foreground text-sm">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </span>
          </AnimateOnScroll>
          <AnimateOnScroll className="flex-1" x={16}>
            <ContactForm onSub={handleSendMail} />
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  );
}
