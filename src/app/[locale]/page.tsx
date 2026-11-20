import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { prefetchGetMe } from "@/hooks/queries/auth";
import { prefetchFindManyCourses } from "@/hooks/queries/courses";
import { prefetchFindManyEducations } from "@/hooks/queries/educations";
import { prefetchFindManyGroupedExperiences } from "@/hooks/queries/experiences";
import { prefetchFindManyProjects } from "@/hooks/queries/projects";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { getOrThrow } from "@/lib/get-or-throw";
import { generateSEO } from "@/lib/seo";
import { ClientPage } from "./page-client";
import {
  HOME_COURSES_VARS,
  HOME_EDUCATIONS_VARS,
  HOME_EXPERIENCES_VARS,
  HOME_PROJECTS_VARS,
} from "./queries";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<ReturnType<typeof generateStaticParams>[number]>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return await generateSEO({
    locale,
    namespace: "homePage",
    path: "/",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = new QueryClient();
  await prefetchGetMe(queryClient);
  await prefetchFindManyProjects(queryClient, HOME_PROJECTS_VARS);
  await prefetchFindManyGroupedExperiences(queryClient, HOME_EXPERIENCES_VARS);
  await prefetchFindManyEducations(queryClient, HOME_EDUCATIONS_VARS);
  await prefetchFindManyCourses(queryClient, HOME_COURSES_VARS);

  const siteUrl = getOrThrow(
    process.env.NEXT_PUBLIC_SITE_URL,
    "NEXT_PUBLIC_SITE_URL environment variable"
  );

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yago Russo",
    sameAs: [
      "https://github.com/yagrrusso",
      "https://instagram.com/yagrrusso",
      "https://linkedin.com/in/yago-russo",
    ],
    url: `${siteUrl}/${locale}/`,
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        type="application/ld+json"
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientPage />
      </HydrationBoundary>
    </>
  );
}
