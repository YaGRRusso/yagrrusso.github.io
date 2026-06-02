import { FrameCornersIcon, HashIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { SkillBadge } from "@/components/skill-badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { getUrl } from "@/consts/urls";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"div"> {
  description: string;
  direction?: "left" | "right";
  images?: string[] | null;
  skills?: {
    id: string;
    name: string;
    slug: string;
  }[];
  slug: string;
  title: string;
  urls?: {
    title: string;
    value: string;
  }[];
}

export function ProjectCard({
  className,
  direction = "left",
  slug,
  title,
  description,
  skills,
  urls,
  images,
  ...props
}: Props) {
  const tCommon = useTranslations("common");

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded border max-lg:flex-col-reverse lg:h-128",
        direction === "left" ? "flex-row" : "flex-row-reverse"
      )}
      {...props}
    >
      <div className="h-full w-full min-w-0 flex-1">
        <div
          className={cn(
            "flex h-full flex-col justify-between gap-6 p-8 max-md:p-6",
            direction === "left" ? "lg:pr-16" : "lg:pl-16"
          )}
        >
          <div className="flex items-center font-jetbrains-mono text-primary text-sm uppercase tracking-wide max-lg:-mb-4">
            <HashIcon weight="bold" />
            <span className="line-clamp-1">{slug}</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-6xl max-md:text-5xl">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            {skills && skills.length > 0 && (
              <div className="mt-2 flex max-w-11/12 flex-wrap items-center gap-1 text-sm">
                {skills.map((skill) => (
                  <SkillBadge
                    key={skill.id}
                    name={skill.name}
                    slug={skill.slug}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {urls?.map((url) => (
              <Button
                asChild
                key={url.title + url.value}
                size="sm"
                variant="outline"
              >
                <a href={url.value} rel="noopener noreferrer" target="_blank">
                  {getUrl(url.title).icon}
                  {tCommon(getUrl(url.title).key)}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Dialog.Root>
        <div className="group relative h-full w-full min-w-0 flex-1">
          <Image
            alt={slug}
            className={cn(
              "max-lg:mask-b-from-75% max-lg:mask-b-to-100% h-full w-full rounded object-cover object-top max-lg:max-h-96",
              direction === "left"
                ? "lg:mask-l-from-75% lg:mask-l-to-100%"
                : "lg:mask-r-from-75% lg:mask-r-to-100%"
            )}
            height={720}
            src={images?.[0] ?? "https://picsum.photos/1280/720"}
            width={720}
          />
          <Dialog.Trigger className="absolute inset-0 flex cursor-pointer items-center justify-center bg-background/20 opacity-0 transition-opacity group-hover:opacity-100">
            <FrameCornersIcon className="size-8" />
          </Dialog.Trigger>
        </div>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Image
              alt={slug}
              className="h-full w-full object-cover object-top"
              height={720}
              src={images?.[0] ?? "https://picsum.photos/1280/720"}
              width={720}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
