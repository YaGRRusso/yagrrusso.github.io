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
      <div className="container relative flex min-h-[80vh] w-full items-center justify-center gap-8 max-md:flex-col-reverse">
        {/* <InteractiveGridPattern
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
          )}
        /> */}
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
          <div className="-z-10 absolute top-0 aspect-square h-3/5 rotate-45 rounded-4xl bg-accent/75" />
        </div>
        <div className="absolute bottom-2 flex flex-col items-center justify-center gap-1 text-muted-foreground text-xs opacity-75">
          <span>{t("getToKnowMe")}</span>
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
          className="absolute w-fit text-xs opacity-0 group-hover:opacity-100"
          size="sm"
          variant="outline"
        >
          {t("viewAll")}
          <MagnifyingGlassIcon />
        </Button>
      </div>
      {/* <div className="container">
        <strong>Portfolio</strong>
      </div> */}
    </div>
  );
}
