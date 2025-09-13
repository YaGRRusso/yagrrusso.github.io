import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { dehydrate } from "@/lib/dehydrate";
import { generateSEO } from "@/lib/seo";
import { getRepos } from "@/services/repos";
import { ClientPage } from "./page-client";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  params: Promise<ReturnType<typeof generateStaticParams>[number]>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  return generateSEO({
    namespace: "ReposPage",
    path: "/repos",
    locale,
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getRepos"],
    queryFn: () => getRepos(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientPage />
    </HydrationBoundary>
  );
}
