"use client";

import {
  DesktopIcon,
  EnvelopeIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MoonIcon,
  SunIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ComponentProps, useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Select } from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ThemeProvider } from "@/contexts/theme";
import { Link, redirect, usePathname } from "@/i18n/navigation";
import { type Locale, localeNames, routing } from "@/i18n/routing";
import { type ThemePreference, usePreferencesStore } from "@/stores/theme";

interface Props extends ComponentProps<"body"> {
  locale: Locale;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 600_000, // 10 minutes
      retryDelay: 30_000, // 30 seconds
      retry: 5,
    },
    mutations: {
      retryDelay: 30_000, // 30 seconds
      retry: 5,
    },
  },
});

export function ClientLayout({ locale, children, ...rest }: Props) {
  const t = useTranslations("layout");
  const pathname = usePathname();
  const { theme: preferredTheme, setTheme: setPreferredTheme } =
    usePreferencesStore();

  const lastInteractionRef = useRef<{ x: number; y: number } | null>(null);

  const changeTheme = useCallback(
    async (preference: ThemePreference) => {
      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setPreferredTheme(preference);
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setPreferredTheme(preference);
        });
      });

      const x = lastInteractionRef.current?.x ?? window.innerWidth / 2;
      const y = lastInteractionRef.current?.y ?? window.innerHeight / 2;

      const right = window.innerWidth - x;
      const bottom = window.innerHeight - y;

      const maxRadius = Math.hypot(Math.max(x, right), Math.max(y, bottom));

      await transition.ready;

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    },
    [setPreferredTheme]
  );

  return (
    <body className="flex min-h-screen flex-col font-inter" {...rest}>
      <header className="sticky top-0 z-10 w-full border-b bg-background py-2">
        <div className="container flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-4">
          <Link className="flex items-center justify-center gap-x-2" href="/">
            <Image
              alt="Logo"
              className="block size-8 dark:hidden"
              height={32}
              src="/favicon-black.svg"
              width={32}
            />
            <Image
              alt="Logo"
              className="hidden size-8 dark:block"
              height={32}
              src="/favicon-white.svg"
              width={32}
            />
            <h2 className="font-semibold text-3xl tracking-wide">Yago Russo</h2>
          </Link>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:max-w-80">
            <Select.Root
              onValueChange={(ev) => redirect({ href: pathname, locale: ev })}
              value={locale}
            >
              <Select.Trigger aria-label="language" className="flex-1">
                <Select.Value placeholder="Language" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {routing.locales.map((lang) => (
                    <Select.Item
                      aria-label={localeNames[lang]}
                      key={lang}
                      value={lang}
                    >
                      {localeNames[lang]}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <ToggleGroup.Root
              className="flex-1"
              onPointerDown={(e) => {
                lastInteractionRef.current = { x: e.clientX, y: e.clientY };
              }}
              onValueChange={(value) => changeTheme(value as ThemePreference)}
              type="single"
              value={preferredTheme}
              variant="outline"
            >
              <ToggleGroup.Item aria-label="light" value="light">
                <SunIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item aria-label="dark" value="dark">
                <MoonIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item aria-label="system" value="system">
                <DesktopIcon />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>
        <ScrollProgress />
      </header>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <main className="flex flex-1 flex-col">{children}</main>
        </ThemeProvider>
      </QueryClientProvider>
      <footer className="border-t bg-background">
        <div className="container flex items-center justify-between gap-2 py-2 text-center text-muted-foreground text-xs max-sm:flex-col">
          <span>{t("rightsReserved", { year: new Date().getFullYear() })}</span>
          <div className="flex items-center gap-2 text-base">
            <a
              className="hover:text-foreground"
              href="https://github.com/yagrrusso"
              rel="noopener"
              target="_blank"
            >
              <GithubLogoIcon />
            </a>
            <a
              className="hover:text-foreground"
              href="https://www.linkedin.com/in/yago-russo/"
              rel="noopener"
              target="_blank"
            >
              <LinkedinLogoIcon />
            </a>
            <a
              className="hover:text-foreground"
              href="https://wa.me/5551986824203"
              rel="noopener"
              target="_blank"
            >
              <WhatsappLogoIcon />
            </a>
            <a
              className="hover:text-foreground"
              href="mailto:yagrrusso@gmail.com"
              rel="noopener"
              target="_blank"
            >
              <EnvelopeIcon />
            </a>
          </div>
          <span>
            {t("updatedAt", {
              date: new Date(
                process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date()
              ).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })}
          </span>
        </div>
      </footer>
    </body>
  );
}
