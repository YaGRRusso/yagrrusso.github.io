"use client";

import {
  CalendarIcon,
  EnvelopeIcon,
  ImageBrokenIcon,
  MagnifyingGlassIcon,
  MapPinAreaIcon,
  PhoneIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
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
import { Tooltip } from "@/components/ui/tooltip";
import { isDarkColor } from "@/helpers/color";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { Link } from "@/i18n/navigation";
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

export function ClientPage() {
  const t = useTranslations("homePage");

  const birth = useMemo(() => {
    const birthDate = new Date(2001, 10, 30);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
    return age;
  }, []);

  const findAllSkills = useFindAllSkills();
  // const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="container relative flex min-h-[80vh] w-full items-center justify-center gap-8 max-md:flex-col-reverse">
        <div className="-z-10 absolute inset-0 overflow-hidden">
          <InteractiveGridPattern className="-skew-y-7 mask-[radial-gradient(24rem_circle_at_center,white,transparent)] max-md:mask-[radial-gradient(50vw_circle_at_center,white,transparent)] max-md:h-1/2 md:ml-64" />
        </div>
        <div className="flex max-w-lg flex-1 flex-col gap-2">
          <span>Yago Russo</span>
          <h1 className="font-jetbrains-mono text-5xl">
            <Highlighter action="underline">{t("title")}</Highlighter>
          </h1>
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="mt-6 flex justify-between gap-2">
            <div className="flex items-center gap-2 max-sm:flex-col-reverse max-sm:text-center">
              <strong className="text-5xl">
                5<span className="text-primary-foreground">+</span>
              </strong>
              <span className="max-w-28 text-sm">{t("yearsOfExperience")}</span>
            </div>
            <div className="flex items-center gap-2 max-sm:flex-col-reverse max-sm:text-center">
              <strong className="text-5xl">
                {findAllSkills.data?.findAllSkills?.length}
                <span className="text-primary-foreground">+</span>
              </strong>
              <span className="max-w-28 text-sm">{t("technologiesUsed")}</span>
            </div>
          </div>
        </div>
        <div className="max-md:-mb-16 relative flex flex-1 items-center justify-center max-md:justify-center">
          <Image
            alt="Sticker"
            className="max-md:mask-[linear-gradient(to_bottom,black_70%,transparent_100%)] object-contain object-center drop-shadow-primary/25 drop-shadow-xl saturate-75"
            height={512}
            priority={true}
            src="/images/sticker.png"
            width={512}
          />
        </div>
      </div>
      <Separator />
      <div className="group relative flex w-full flex-col items-center justify-center">
        <Marquee className="w-full gap-0" pauseOnHover>
          <div className="flex items-center gap-16 p-8">
            {findAllSkills.data?.findAllSkills?.map((skill) => (
              <Tooltip.Root key={skill.id}>
                <Tooltip.Trigger asChild>
                  <Avatar.Root
                    className={cn(
                      "size-6 opacity-75 hover:opacity-100",
                      isDarkColor(skill.color) &&
                        "drop-shadow drop-shadow-primary/25"
                    )}
                  >
                    <Avatar.Image
                      alt={skill.name}
                      src={simpleIconsCdn(skill.slug)}
                    />
                    <Avatar.Fallback>
                      <ImageBrokenIcon />
                    </Avatar.Fallback>
                  </Avatar.Root>
                </Tooltip.Trigger>
                <Tooltip.Content>{skill.name}</Tooltip.Content>
              </Tooltip.Root>
            ))}
          </div>
        </Marquee>
        <Button
          asChild
          className="absolute w-fit text-xs opacity-0 group-hover:opacity-100"
          size="sm"
          variant="outline"
        >
          <Link href="/skills">
            {t("viewAll")}
            <MagnifyingGlassIcon />
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="container relative flex w-full flex-col items-center justify-center gap-16">
        <SectionTitle
          description={t("sections.aboutMe.description")}
          id="my-intro"
          title={t("sections.aboutMe.title")}
        />
        <div className="flex items-center gap-x-24 gap-y-16 max-lg:flex-col">
          <p className="w-full text-center text-muted-foreground">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
          <div className="flex w-full flex-col gap-2">
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
        <div className="grid w-full grid-cols-3 gap-6 max-md:grid-cols-1 max-lg:grid-cols-2">
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <div className="flex h-64 items-center justify-center rounded bg-primary p-4" />
          <Button asChild className="col-span-full" size="sm" variant="outline">
            <Link href="/portfolio">{t("viewAll")}</Link>
          </Button>
        </div>
      </div>
      <Separator />
      <div className="container relative flex w-full flex-col items-center justify-center gap-16">
        <SectionTitle
          description={t("sections.myQualifications.description")}
          id="my-qualifications"
          title={t("sections.myQualifications.title")}
        />
        <div className="flex items-center gap-x-24 gap-y-16 max-lg:flex-col">
          <Timeline.Root scrollProgress scrollReveal>
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
          <Timeline.Root scrollProgress scrollReveal>
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
        </div>
      </div>
    </div>
  );
}
