"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Repo } from "@/services/repos";

type Props = {
  initialData: {
    getReposInit: Repo[];
  };
};

export function ClientPage({ initialData }: Props) {
  const t = useTranslations("ReposPage");
  const tRoutes = useTranslations("Routes");

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <strong className="text-5xl">{t("title")}</strong>
      <p>{t("description")}</p>
      <Link className="underline" href="/">
        {tRoutes("home")}
      </Link>
      <ul>
        {initialData.getReposInit?.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} rel="noopener noreferrer" target="_blank">
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
