"use client";

import {
  type DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ThemeProvider } from "next-themes";
import { type ComponentProps, type ReactNode, useState } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Toaster } from "@/components/ui/sonner";
import { useIsMounted } from "@/hooks/reactive/use-is-mounted";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { env } from "@/lib/env";
import { getQueryClient } from "@/lib/get-query-client";
import { LayoutMenu } from "./_components/layout-menu";
import { LayoutSidebar } from "./_components/layout-sidebar";

const Leva = dynamic(() => import("leva").then((module) => module.Leva), {
  ssr: false,
});

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
  const isMounted = useIsMounted();

  return (
    <body
      className="flex min-h-screen flex-col bg-background text-foreground"
      {...rest}
    >
      <ThemeProvider attribute="class">
        <Toaster />
        <Leva hidden={!env.NEXT_PUBLIC_DEBUG} />
        <header className="sticky top-0 z-10 flex h-(--layout-header-height) w-full items-center border-b bg-background text-foreground">
          <div className="container flex items-center justify-between gap-4 py-4">
            <Link className="flex items-center justify-center gap-x-2" href="/">
              <Image
                alt=""
                className="logo-adaptive size-6"
                height={24}
                src="/favicon-black.svg"
                width={24}
              />
              <h2 className="font-semibold text-2xl tracking-wide">
                Yago Russo
              </h2>
            </Link>
            <LayoutMenu locale={locale} />
          </div>
          <ScrollProgress />
        </header>
        <LayoutSidebar locale={locale} />
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <main className="flex flex-1 flex-col">{children}</main>
          </HydrationBoundary>
        </QueryClientProvider>
        <footer className="border-t">
          <div className="container flex items-center justify-between gap-2 py-2 text-center text-muted-foreground text-xs max-sm:flex-col">
            <span>
              {t("rightsReserved", { year: new Date().getFullYear() })}
            </span>

            <span>
              {isMounted &&
                t("updatedAt", {
                  date: new Date(
                    process.env.NEXT_PUBLIC_BUILD_DATE ?? new Date()
                  ).toLocaleDateString(locale, {
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "long",
                    year: "numeric",
                  }),
                })}
            </span>
          </div>
        </footer>
      </ThemeProvider>
    </body>
  );
}
