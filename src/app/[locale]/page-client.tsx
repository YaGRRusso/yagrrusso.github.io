"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function ClientPage() {
  const t = useTranslations("homePage");
  const tRoutes = useTranslations("routes");
  // const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <div className="container flex min-h-[80vh] w-full items-center justify-center gap-8 border-b max-md:flex-col-reverse">
        <BackgroundBeams />
        <div className="flex max-w-lg flex-1 flex-col gap-2">
          <span>Yago Russo</span>
          <h1 className="font-jetbrains-mono text-5xl">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              asChild
              className="max-w-64 flex-1"
              size="sm"
              variant="outline"
            >
              <Link href="/skills">{tRoutes("skillsPage.title")}</Link>
            </Button>
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
        <div className="-z-10 max-md:-mb-16 relative flex flex-1 items-center justify-center max-md:justify-center">
          <Image
            alt="Sticker"
            className="object-contain object-center opacity-90 drop-shadow-primary/25 drop-shadow-xl saturate-[75%] max-md:[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
            height={512}
            priority={true}
            src="/images/sticker.png"
            width={512}
          />
          <motion.div
            animate={{
              scale: [0.8, 1, 1, 0.8, 0.8],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["5%", "5%", "50%", "50%", "5%"],
            }}
            className="-z-10 absolute top-0 aspect-square h-3/5 bg-accent/75"
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          />
        </div>
      </div>
      <div>xxx</div>
    </div>
  );
}
