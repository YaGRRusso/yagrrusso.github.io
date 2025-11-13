"use client";

import { motion } from "motion/react";
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
      <div className="flex w-full items-center justify-center gap-8 max-md:flex-col-reverse">
        <div className="flex max-w-lg flex-1 flex-col gap-2">
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
        <div className="max-md:-mb-32 -z-10 relative flex flex-1 items-center justify-center">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-60% via-transparent to-transparent md:hidden" />
          <motion.div
            animate={{
              y: ["0", "-0.25rem", "0"],
              x: ["0", "-0.25rem", "0"],
              rotate: [0, 2, -1, 0],
            }}
            transition={{
              duration: 14,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              repeatDelay: 1,
            }}
          >
            <Image
              alt="Sticker"
              className="size-[32rem] bg-cover object-contain object-center drop-shadow-primary/25 drop-shadow-xl"
              height={64}
              src="/images/sticker.png"
              width={64}
            />
          </motion.div>
          <motion.div className="-z-10 absolute size-52 rotate-45 rounded-4xl bg-accent/75 sm:size-64" />
        </div>
      </div>
    </div>
  );
}
