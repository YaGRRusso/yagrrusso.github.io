"use client";

import { useTranslations } from "next-intl";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetRepos } from "@/hooks/queries/github";

export function ClientPage() {
  const t = useTranslations("reposPage");
  const getRepos = useGetRepos();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Title className="w-full" description={t("description")} title={t("title")} />
      {getRepos.isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <ul className="grid w-full grid-cols-1 gap-2 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {getRepos.data?.map((repo) => (
            <li id={repo.name} key={repo.id}>
              <Button asChild className="w-full justify-between" variant="ghost">
                <a href={repo.html_url} rel="noopener" target="_blank">
                  {repo.name}
                </a>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
