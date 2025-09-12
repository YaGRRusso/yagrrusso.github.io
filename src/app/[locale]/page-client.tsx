"use client";

import { useTranslations } from "next-intl";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Link } from "@/i18n/navigation";

export function ClientPage() {
  const t = useTranslations("HomePage");
  const tRoutes = useTranslations("Routes");

  return (
    <div className="flex flex-1 flex-col items-center justify-center space-y-2">
      <BackgroundBeams />
      <strong className="text-5xl">{t("title")}</strong>
      <p>{t("description")}</p>
      <Link className="underline" href="/repos">
        {tRoutes("repos")}
      </Link>
    </div>
  );
}
