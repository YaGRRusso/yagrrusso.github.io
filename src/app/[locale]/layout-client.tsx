"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import { Select } from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ThemeProvider } from "@/contexts/theme";
import { Link, redirect, usePathname } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";
import { usePreferencesStore } from "@/stores/theme";

interface Props extends HTMLAttributes<HTMLBodyElement> {
  locale: string;
}

export function ClientLayout({ locale, children, ...rest }: Props) {
  const pathname = usePathname();
  const { theme: preferredTheme, setTheme: setPreferredTheme } = usePreferencesStore();

  return (
    <body className="flex min-h-screen flex-col" {...rest}>
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop:blur-2xl">
        <div className="container flex items-center justify-between space-x-2">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <Image alt="Logo" className="block h-10 w-10 dark:hidden" height={32} src="/favicon-black.svg" width={32} />
            <Image alt="Logo" className="hidden h-10 w-10 dark:block" height={32} src="/favicon-white.svg" width={32} />
            <h1 className="font-semibold text-3xl tracking-wide">Yago Russo</h1>
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <Select.Root onValueChange={(ev) => redirect({ href: pathname, locale: ev as any })} value={locale}>
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
      <ThemeProvider>
        <main className="container flex flex-1 flex-col">{children}</main>
      </ThemeProvider>
    </body>
  );
}
