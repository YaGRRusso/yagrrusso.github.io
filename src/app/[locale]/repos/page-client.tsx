"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { getRepos } from "@/services/repos";

export function ClientPage() {
  const t = useTranslations("ReposPage");

  const useGetRepos = useQuery({
    queryKey: ["getRepos"],
    queryFn: () => getRepos(),
  });

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <strong className="text-5xl">{t("title")}</strong>
      <p>{t("description")}</p>
      {useGetRepos.isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <ul className="grid w-full grid-cols-1 gap-2 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {useGetRepos.data?.map((repo) => (
            <li key={repo.id}>
              <a
                className="group flex items-center justify-between space-x-2 rounded-md px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                href={repo.html_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>{repo.name}</span>
                <ArrowUpRightIcon className="opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
