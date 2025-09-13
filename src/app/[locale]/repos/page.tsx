import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
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

  const getReposInit = await getRepos();

  return <ClientPage initialData={{ getReposInit }} />;
}
