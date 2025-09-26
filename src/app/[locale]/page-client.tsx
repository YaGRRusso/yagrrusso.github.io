"use client";

import { useTranslations } from "next-intl";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { useFindOneUserById } from "@/hooks/queries/auth";
import { Link } from "@/i18n/navigation";

export function ClientPage() {
  const t = useTranslations("homePage");
  const tRoutes = useTranslations("routes");
  const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <BackgroundBeams />
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-5xl">{findOneUserById.data?.findOneUserById.name ?? t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>
      <Link href="/skills">
        <Button variant="outline">{tRoutes("skillsPage.title")}</Button>
      </Link>
    </div>
  );
}
