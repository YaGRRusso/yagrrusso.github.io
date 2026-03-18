import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { prefetchFindManyEducations } from "@/hooks/queries/educations";
import { prefetchFindManyExperiences } from "@/hooks/queries/experiences";
import { prefetchFindManyProjects } from "@/hooks/queries/projects";
import { prefetchFindManySkills } from "@/hooks/queries/skills";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { generateSEO } from "@/lib/seo";
import { ClientPage } from "./page-client";

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
  await prefetchFindManySkills(queryClient);
  await prefetchFindManyProjects(queryClient);
  await prefetchFindManyExperiences(queryClient);
  await prefetchFindManyEducations(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
