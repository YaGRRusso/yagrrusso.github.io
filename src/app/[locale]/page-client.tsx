"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/queries/auth";
import { Link } from "@/i18n/navigation";

export function ClientPage() {
  const t = useTranslations("homePage");
  const tRoutes = useTranslations("routes");
  const getMe = useGetMe();

  useEffect(() => {
    console.log(getMe.data);
  }, [getMe.data]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <BackgroundBeams />
      <div className="flex flex-col gap-2">
        <h1 className="text-5xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <Link href="/repos">
        <Button variant="outline">{tRoutes("reposPage.title")}</Button>
      </Link>
    </div>
  );
}
