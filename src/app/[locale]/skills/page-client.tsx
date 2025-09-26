"use client";

import { ImageBrokenIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Title } from "@/components/title";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const t = useTranslations("skillsPage");

  const findAllSkills = useFindAllSkills();

  return (
    <div className="flex flex-1 flex-col gap-y-8">
      <Title className="w-full" description={t("description")} title={t("title")} />
      {/* <Input onChange={(e) => setQ(e.target.value)} placeholder="search repositories" value={q} /> */}
      {findAllSkills.isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {findAllSkills.data?.findAllSkills?.map((skill) => (
            <li
              className="flex flex-col items-center justify-center gap-2 rounded border p-4"
              id={skill.name}
              key={skill.id}
            >
              <Avatar.Root>
                <Avatar.Image alt={skill.name} src={simpleIconsCdn(skill.slug)} />
                <Avatar.Fallback>
                  <ImageBrokenIcon />
                </Avatar.Fallback>
              </Avatar.Root>
              <span>{skill.name}</span>
              <span className="text-muted-foreground text-xs">{skill.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
