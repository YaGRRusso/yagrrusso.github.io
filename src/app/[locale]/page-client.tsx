"use client";

import {
  CaretDownIcon,
  ImageBrokenIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Marquee } from "@/components/ui/marquee";
import { Tooltip } from "@/components/ui/tooltip";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { Link } from "@/i18n/navigation";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const t = useTranslations("homePage");
  const tRoutes = useTranslations("routes");

  const findAllSkills = useFindAllSkills();
  // const findOneUserById = useFindOneUserById({ findOneUserByIdId: "68d5b5a2b16f9272f9d6f549" });

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex flex-col">
        <div className="container relative flex min-h-[80vh] w-full items-center justify-center gap-8 max-md:flex-col-reverse">
          <div className="-z-10 absolute inset-0 overflow-hidden">
            <InteractiveGridPattern className="-skew-y-7 [mask-image:radial-gradient(24rem_circle_at_center,white,transparent)] max-md:h-1/2 md:ml-64" />
          </div>
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
          <div className="max-md:-mb-16 relative flex flex-1 items-center justify-center max-md:justify-center">
            <Image
              alt="Sticker"
              className="object-contain object-center drop-shadow-primary/25 drop-shadow-xl saturate-[75%] max-md:[mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
              height={512}
              priority={true}
              src="/images/sticker.png"
              width={512}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-2 text-muted-foreground text-xs opacity-75">
          <span>{t("meetMe")}</span>
          <CaretDownIcon className="animate-bounce" />
        </div>
      </div>
      <div className="group relative flex w-full flex-col items-center justify-center border-y">
        <Marquee className="w-full gap-0" pauseOnHover>
          <div className="flex items-center gap-16 p-8">
            {findAllSkills.data?.findAllSkills?.map((skill) => (
              <Tooltip.Root key={skill.id}>
                <Tooltip.Trigger asChild>
                  <Avatar.Root className="size-6 opacity-50 hover:opacity-100">
                    <Avatar.Image
                      alt={skill.name}
                      src={simpleIconsCdn(skill.slug)}
                    />
                    <Avatar.Fallback>
                      <ImageBrokenIcon />
                    </Avatar.Fallback>
                  </Avatar.Root>
                </Tooltip.Trigger>
                <Tooltip.Content>{skill.name}</Tooltip.Content>
              </Tooltip.Root>
            ))}
          </div>
        </Marquee>
        <Button
          asChild
          className="absolute w-fit text-xs opacity-0 group-hover:opacity-100"
          size="sm"
          variant="outline"
        >
          <Link href="/skills">
            {t("viewAll")}
            <MagnifyingGlassIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}
