"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { getRepos } from "@/services/repos";

export function ClientPage() {
  const t = useTranslations("reposPage");

  const useGetRepos = useQuery({
    queryKey: ["getRepos"],
    queryFn: () => getRepos(),
  });

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Title className="w-full" description={t("description")} title={t("title")} />
      {useGetRepos.isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <ul className="grid w-full grid-cols-1 gap-2 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {useGetRepos.data?.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank">
                <Button className="w-full justify-between" variant="ghost">
                  {repo.name}
                </Button>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
