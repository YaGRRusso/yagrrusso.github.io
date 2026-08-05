"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { HOME_SECTIONS } from "@/consts/home-sections";
import { useActiveSection } from "@/hooks/reactive/use-active-section";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const SECTION_IDS = HOME_SECTIONS.map((section) => section.id);

export function LayoutSidebar({ locale }: { locale: Locale }) {
  const t = useTranslations("homePage");
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Sections"
      className="fixed top-(--layout-header-height) left-0 z-100 3xl:flex hidden h-[calc(100vh-var(--layout-header-height))] flex-col justify-center gap-1 px-2"
    >
      {HOME_SECTIONS.map((section) => (
        <Tooltip.Root key={section.id}>
          <Tooltip.Trigger asChild>
            <Button
              asChild
              className={cn(
                "opacity-40 transition-all hover:opacity-100",
                activeId === section.id && "opacity-100"
              )}
              size="icon-sm"
              variant="ghost"
            >
              <a href={`/${locale}/#${section.id}`}>
                <div
                  className={cn(
                    activeId === section.id
                      ? "h-0.5 w-6 bg-primary"
                      : "h-px w-4 bg-muted-foreground"
                  )}
                />
              </a>
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content align="center" side="right">
            <p>{t(`sections.${section.titleKey}.title`)}</p>
          </Tooltip.Content>
        </Tooltip.Root>
      ))}
    </nav>
  );
}
