import {
  ArrowUpRightIcon,
  DiamondIcon,
  GithubLogoIcon,
  HashIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import type { ComponentProps } from "react";
import { simpleIconsCdn } from "@/lib/cdn";
import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props extends ComponentProps<"div"> {
  direction?: "left" | "right";
  slug: string;
  name: string;
  description: string;
  skills?:
    | {
        id: string;
        name: string;
        slug: string;
      }[]
    | null;
  repositoryUrl?: string | null;
  demoUrl?: string | null;
  images?: string[] | null;
}

export function ProjectCard({
  className,
  direction = "left",
  slug,
  name,
  description,
  skills,
  repositoryUrl,
  demoUrl,
  images,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded border bg-alternative max-lg:flex-col-reverse lg:h-128",
        direction === "left" ? "flex-row" : "flex-row-reverse"
      )}
      {...props}
    >
      <div className="h-full w-full min-w-0 flex-1">
        <div className="flex h-full flex-col justify-between gap-4 p-8 max-md:p-6">
          <strong className="flex items-center font-jetbrains-mono text-primary text-sm uppercase tracking-wide">
            <HashIcon weight="bold" />
            <span>{slug}</span>
          </strong>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-6xl max-md:text-5xl">{name}</h3>
            <p className="text-muted-foreground">{description}</p>
            {skills && skills.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                {skills.map((skill) => (
                  <Badge
                    className="uppercase"
                    key={skill.id}
                    variant="secondary"
                  >
                    <Avatar.Root className="size-3 brightness-0 invert">
                      <Avatar.Image
                        alt={skill.name}
                        src={simpleIconsCdn(skill.slug)}
                      />
                      <Avatar.Fallback className="bg-transparent">
                        <DiamondIcon className="size-4" weight="fill" />
                      </Avatar.Fallback>
                    </Avatar.Root>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          {(repositoryUrl || demoUrl) && (
            <div className="flex items-center gap-2 max-lg:mt-4 lg:max-w-96">
              {repositoryUrl && (
                <Button asChild className="flex-1" size="sm" variant="outline">
                  <a
                    href={repositoryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubLogoIcon />
                    Repo
                  </a>
                </Button>
              )}
              {demoUrl && (
                <Button asChild className="flex-1" size="sm" variant="outline">
                  <a href={demoUrl} rel="noopener noreferrer" target="_blank">
                    Demo
                    <ArrowUpRightIcon />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="h-full w-full min-w-0 flex-1">
        <Image
          alt={slug}
          className={cn(
            "max-lg:mask-b-from-75% max-lg:mask-b-to-100% h-full w-full rounded object-cover object-center",
            direction === "left"
              ? "lg:mask-l-from-75% lg:mask-l-to-100%"
              : "lg:mask-r-from-75% lg:mask-r-to-100%"
          )}
          height={720}
          src={images ? images[0] : "https://picsum.photos/1280/720"}
          width={720}
        />
      </div>
    </div>
  );
}
