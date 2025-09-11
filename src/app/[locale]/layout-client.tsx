"use client";

import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { type HTMLAttributes, useEffect, useMemo } from "react";
import { Select } from "@/components/ui/select";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Link, redirect, usePathname } from "@/i18n/navigation";
import { localeNames, routing } from "@/i18n/routing";
import { useThemeStore } from "@/stores/theme";

interface Props extends HTMLAttributes<HTMLBodyElement> {
  locale: string;
}

export function ClientRootLayout({ locale, children, ...rest }: Props) {
  const pathname = usePathname();
  const { theme, setTheme } = useThemeStore();

  const logo = useMemo(() => {
    switch (theme) {
      case "dark":
        return "/favicon-white.svg";
      case "light":
        return "/favicon-black.svg";
      default:
        return "/favicon.svg";
    }
  }, [theme]);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        break;
      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        break;
    }
  }, [theme]);

  return (
    <body className="flex min-h-screen flex-col" {...rest}>
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop:blur-2xl">
        <div className="container flex items-center justify-between space-x-2">
          <Link className="flex items-center justify-center space-x-2" href="/">
            <Image alt="Logo" className="h-10 w-10" height={32} src={logo} width={32} />
            <h1 className="font-semibold text-3xl tracking-wide">Yago Russo</h1>
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <Select.Root onValueChange={(ev) => redirect({ href: pathname, locale: ev })} value={locale}>
              <Select.Trigger>
                <Select.Value placeholder="Language" />
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  {routing.locales.map((lang) => (
                    <Select.Item key={lang} value={lang}>
                      {localeNames[lang]}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <ToggleGroup.Root
              onValueChange={(value) => setTheme(value as any)}
              type="single"
              value={theme}
              variant="outline"
            >
              <ToggleGroup.Item value="light">
                <SunIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="dark">
                <MoonIcon />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="system">
                <DesktopIcon />
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
        </div>
      </header>
      <main className="container flex flex-1 flex-col">{children}</main>
    </body>
  );
}
