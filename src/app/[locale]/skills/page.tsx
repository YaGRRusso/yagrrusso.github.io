import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { prefetchFindOneUserById } from "@/hooks/queries/auth";
import { prefetchFindManySkills } from "@/hooks/queries/skills";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { generateSEO } from "@/lib/seo";
import { PROFILE_USER_VARS } from "../queries";
import { ClientPage } from "./page-client";
import { SKILL_SKILLS_VARS } from "./queries";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<ReturnType<typeof generateStaticParams>[number]>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return await generateSEO({
    namespace: "skillsPage",
    path: "/skills",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = new QueryClient();
  await prefetchFindOneUserById(queryClient, PROFILE_USER_VARS);
  await prefetchFindManySkills(queryClient, SKILL_SKILLS_VARS);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
