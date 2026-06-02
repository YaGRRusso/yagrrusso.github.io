import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { prefetchFindManyCourses } from "@/hooks/queries/courses";
import { prefetchFindManyEducations } from "@/hooks/queries/educations";
import { prefetchFindManyExperiences } from "@/hooks/queries/experiences";
import { prefetchFindManyProjects } from "@/hooks/queries/projects";
import { prefetchFindManySkills } from "@/hooks/queries/skills";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { generateSEO } from "@/lib/seo";
import { ClientPage } from "./page-client";
import {
  HOME_COURSES_VARS,
  HOME_EDUCATIONS_VARS,
  HOME_EXPERIENCES_VARS,
  HOME_PROJECTS_VARS,
  HOME_SKILLS_VARS,
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
    namespace: "homePage",
    path: "/",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = new QueryClient();
  await prefetchFindManySkills(queryClient, HOME_SKILLS_VARS);
  await prefetchFindManyProjects(queryClient, HOME_PROJECTS_VARS);
  await prefetchFindManyExperiences(queryClient, HOME_EXPERIENCES_VARS);
  await prefetchFindManyEducations(queryClient, HOME_EDUCATIONS_VARS);
  await prefetchFindManyCourses(queryClient, HOME_COURSES_VARS);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
