"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import type { ComponentProps } from "react";
import { Select } from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ThemeProvider } from "@/contexts/theme";
import { Link, redirect, usePathname } from "@/i18n/navigation";
import { type Locale, localeNames, routing } from "@/i18n/routing";
import { usePreferencesStore } from "@/stores/theme";

interface Props extends ComponentProps<"body"> {
  locale: Locale;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 600_000, // 10 minutes
      retryDelay: 10_000, // 10 seconds
      retry: 3,
    },
    mutations: {
      retryDelay: 10_000, // 10 seconds
      retry: 3,
    },
  },
});

export function ClientLayout({ locale, children, ...rest }: Props) {
  const pathname = usePathname();
  const { theme: preferredTheme, setTheme: setPreferredTheme } = usePreferencesStore();

  return (
    <body className="flex min-h-screen flex-col" {...rest}>
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 py-2 backdrop:blur-2xl">
        <div className="container flex items-center justify-between gap-x-2">
          <Link className="flex items-center justify-center gap-x-2" href="/">
            <Image alt="Logo" className="block h-10 w-10 dark:hidden" height={32} src="/favicon-black.svg" width={32} />
            <Image alt="Logo" className="hidden h-10 w-10 dark:block" height={32} src="/favicon-white.svg" width={32} />
            <h2 className="font-semibold text-3xl tracking-wide">Yago Russo</h2>
          </Link>
          <div className="flex items-center justify-center gap-x-2">
            <Select.Root onValueChange={(ev) => redirect({ href: pathname, locale: ev })} value={locale}>
              <Select.Trigger aria-label="language">
                <Select.Value placeholder="Language" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {routing.locales.map((lang) => (
                    <Select.Item aria-label={localeNames[lang]} key={lang} value={lang}>
                      {localeNames[lang]}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <ToggleGroup.Root
              onValueChange={(value) => setPreferredTheme(value as any)}
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
      </header>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <main className="container flex flex-1 flex-col py-16">{children}</main>
        </ThemeProvider>
      </QueryClientProvider>
    </body>
  );
}
