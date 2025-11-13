"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";

export function ClientPage() {
  const t = useTranslations("homePage");
  const tRoutes = useTranslations("routes");
  // const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <BackgroundBeams />
      <div className="flex w-full items-center justify-between gap-32">
        <div className="flex max-w-lg flex-col gap-2">
          <span>Yago Russo</span>
          <h1 className="font-jetbrains-mono text-5xl">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="mt-4 flex items-center gap-4">
            <Button
              asChild
              className="max-w-64 flex-1"
              size="sm"
              variant="outline"
            >
              <Link href="/skills">{tRoutes("skillsPage.title")}</Link>
            </Button>
          </div>
        </div>
        <Image
          alt="Sticker"
          className="size-[32rem] animate-[float_7s_ease-in-out_infinite] [filter:drop-shadow(0_0_2rem_#38bdf833)_drop-shadow(0_0_4rem_#0284c777)]"
          height={64}
          src="/images/sticker.png"
          width={64}
        />
      </div>
    </div>
  );
}
