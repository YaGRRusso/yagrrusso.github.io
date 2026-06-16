"use client";

import {
  type DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type ComponentProps, type ReactNode, useState } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/contexts/theme";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getQueryClient } from "@/lib/get-query-client";
import { LayoutLoading } from "./_components/layout-loading";
import { LayoutMenu } from "./_components/layout-menu";

interface Props extends ComponentProps<"body"> {
  children: ReactNode;
  dehydratedState: DehydratedState;
  locale: Locale;
}

export function ClientLayout({
  locale,
  dehydratedState,
  children,
  ...rest
}: Props) {
  const [queryClient] = useState(() => getQueryClient());
  const t = useTranslations("layout");

  return (
    <body
      className="flex min-h-screen flex-col bg-background font-space-grotesk text-foreground"
      {...rest}
    >
      <LayoutLoading />
      <Toaster />
      <header className="sticky top-0 z-10 flex h-[8vh] w-full items-center border-b bg-background text-foreground">
        <div className="container flex items-center justify-between gap-4 py-4">
          <Link className="flex items-center justify-center gap-x-2" href="/">
            <Image
              alt="Logo"
              className="block size-6 dark:hidden"
              height={24}
              src="/favicon-black.svg"
              width={24}
            />
            <Image
              alt="Logo"
              className="hidden size-6 dark:block"
              height={24}
              src="/favicon-white.svg"
              width={24}
            />
            <h2 className="font-semibold text-2xl tracking-wide">Yago Russo</h2>
          </Link>
          <LayoutMenu locale={locale} />
        </div>
        <ScrollProgress />
      </header>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <ThemeProvider>
            <main className="flex flex-1 flex-col">{children}</main>
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
      <footer className="border-t">
        <div className="container flex items-center justify-between gap-2 py-2 text-center text-muted-foreground text-xs max-sm:flex-col">
          <span>{t("rightsReserved", { year: new Date().getFullYear() })}</span>

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
