import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { prefetchGetMe } from "@/hooks/queries/auth";
import { prefetchFindManySkills } from "@/hooks/queries/skills";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { generateSEO } from "@/lib/seo";
import { ClientPage } from "./page-client";
import { getSkillSkillsVars } from "./queries";

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
    namespace: "skillsPage",
    path: "/skills",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = new QueryClient();
  await prefetchGetMe(queryClient);
  await prefetchFindManySkills(queryClient, getSkillSkillsVars());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
