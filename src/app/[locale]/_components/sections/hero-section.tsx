import { CaretRightIcon, ReadCvLogoIcon } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { AvatarPoster } from "@/components/avatar/avatar-poster";
import { SkillIcon } from "@/components/skill-icon";
import { TitleLink } from "@/components/title-link";
import { Highlighter } from "@/components/ui/highlighter";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Tooltip } from "@/components/ui/tooltip";
import { HOME_HERO_SECTIONS } from "@/consts/home-sections";
import { MAIN_STACK, SECONDARY_STACK } from "@/consts/stack";
import { useGetMe } from "@/hooks/queries/auth";
import { useMessages } from "@/hooks/reactive/use-messages";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";

const PortfolioAvatar = dynamic(
  () =>
    import("@/components/avatar/portfolio-avatar").then(
      (module) => module.PortfolioAvatar
    ),
  { ssr: false }
);

export function HeroSection() {
  const [isAvatarReady, setIsAvatarReady] = useState(false);
  const handleAvatarReady = useCallback(() => setIsAvatarReady(true), []);
  const t = useTranslations("homePage");
  const getMe = useGetMe();
  const getMessages = useMessages();
  const locale = useLocale();

  return (
    <div className="container relative flex min-h-[calc(100vh-var(--layout-header-height))] w-full items-center gap-8 max-md:flex-col-reverse">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <InteractiveGridPattern className="mask-[radial-gradient(24rem_circle_at_center,white,transparent)] max-md:mask-[radial-gradient(50vw_circle_at_center,white,transparent)] -skew-y-7 max-md:h-1/2 md:ml-64" />
      </div>
      <AnimateOnScroll
        className="flex w-full min-w-0 flex-1 flex-col gap-4"
        y={16}
      >
        <div className="flex flex-col gap-2 tracking-wide">
          <div className="-ml-5 flex items-center gap-1 font-medium font-mono text-primary uppercase">
            <CaretRightIcon
              className="mb-0.5 animate-caret-blink"
              weight="bold"
            />
            <h2>Yago Russo</h2>
          </div>
          <Highlighter action="underline" padding={4}>
            <h1 className="line-clamp-2 font-semibold text-6xl max-md:text-5xl">
              {getMessages(getMe.data?.getMe.i18n)?.title}
            </h1>
          </Highlighter>
        </div>
        <p className="text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap items-center gap-2">
          <TitleLink
            href={`https://cdn.jsdelivr.net/gh/YaGRRusso/public-assets@main/documents/resume-${locale}.pdf`}
            icon={<ReadCvLogoIcon weight="bold" />}
            rel="noopener noreferrer"
            target="_blank"
            title={t("openCv")}
            variant="default"
          />
          {HOME_HERO_SECTIONS.map((section) => (
            <TitleLink
              href={`#${section.id}`}
              key={section.id}
              title={t(`sections.${section.titleKey}.title`)}
            />
          ))}
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll
        className="relative flex w-full flex-1 items-center justify-center max-md:-mb-16 max-md:justify-center"
        y={16}
      >
        <div className="absolute inset-0 -top-[40%]">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <OrbitingCircles
              className="size-8 border border-foreground/5 bg-foreground/3 p-1 shadow-lg backdrop-blur-lg"
              radius={200}
            >
              {SECONDARY_STACK.map((skill) => (
                <Tooltip.Root key={skill.name}>
                  <Tooltip.Trigger aria-label={skill.name}>
                    <SkillIcon slug={skill.slug} />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <p>{skill.name}</p>
                  </Tooltip.Content>
                </Tooltip.Root>
              ))}
            </OrbitingCircles>
            <OrbitingCircles
              className="size-8 border border-foreground/5 bg-foreground/3 p-1 shadow shadow-primary/20 backdrop-blur-lg"
              radius={135}
              reverse
            >
              {MAIN_STACK.map((skill) => (
                <Tooltip.Root key={skill.name}>
                  <Tooltip.Trigger aria-label={skill.name}>
                    <SkillIcon slug={skill.slug} />
                  </Tooltip.Trigger>
                  <Tooltip.Content>
                    <p>{skill.name}</p>
                  </Tooltip.Content>
                </Tooltip.Root>
              ))}
            </OrbitingCircles>
          </div>
        </div>
        <div className="mask-[linear-gradient(to_top,transparent_0%,white_10%)] relative aspect-square w-full">
          {!env.NEXT_PUBLIC_DISABLE_3D && (
            <ErrorBoundary fallback={null}>
              <PortfolioAvatar onReady={handleAvatarReady} sceneId="hero" />
            </ErrorBoundary>
          )}
          <AvatarPoster
            className={cn(
              "transition-opacity duration-500",
              isAvatarReady && "opacity-0"
            )}
            sceneId="hero"
          />
        </div>
      </AnimateOnScroll>
    </div>
  );
}
