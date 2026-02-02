"use client";

import { CircleNotchIcon, ImageBrokenIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { type CSSProperties, useMemo, useState } from "react";
import { QueryHelper } from "@/classes/query";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { PageTitle } from "@/components/page-title";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Request } from "@/components/ui/request";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Categories } from "@/consts/categories";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const t = useTranslations("skillsPage");
  const tCommon = useTranslations("common");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const findAllSkills = useFindAllSkills();

  const filteredList = useMemo(() => {
    if (!findAllSkills.data?.findAllSkills) return [];
    return new QueryHelper(findAllSkills.data.findAllSkills)
      .filter("SOFT", "category", "!==")
      .filter(category, "category")
      .query(query, ["title"])
      .sort("title")
      .exec();
  }, [findAllSkills.data, query, category]);

  return (
    <div className="container flex flex-1 flex-col gap-4">
      <AnimateOnScroll y={16}>
        <PageTitle className="w-full" title={t("title")} />
        <div className="flex w-full items-center gap-2">
          <Input
            className="flex-1"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query"
            value={query}
          />
          <Select.Root
            onValueChange={(value) => setCategory(value === "ALL" ? "" : value)}
            value={category}
          >
            <Select.Trigger className="max-w-52 flex-1">
              <Select.Value placeholder="Category" />
            </Select.Trigger>
            <Select.Content>
              {Object.values(Categories).map((cat) => (
                <Select.Item key={cat.value} value={cat.value}>
                  {cat.icon} {tCommon(cat.key as any)}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </AnimateOnScroll>

      <Request.Root
        isEmpty={!filteredList?.length}
        isFetching={findAllSkills.isFetching}
        isLoading={findAllSkills.isLoading}
      >
        <Request.Loading>
          <Skeleton className="h-64 w-full" />
        </Request.Loading>
        <Request.Empty>
          <Alert.Root>
            <Alert.Title>{tCommon("emptyTitle")}</Alert.Title>
            <Alert.Description>{tCommon("emptyDescription")}</Alert.Description>
          </Alert.Root>
        </Request.Empty>
        <Request.Content>
          <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredList?.map((skill) => (
              <li id={skill.slug} key={skill.id}>
                <AnimateOnScroll
                  className="flex flex-col items-center justify-center gap-2 rounded border p-4 transition-colors hover:border-(--skill-color)"
                  style={
                    {
                      "--skill-color": skill.color ?? "transparent",
                    } as CSSProperties
                  }
                  y={16}
                >
                  <Avatar.Root>
                    <Avatar.Image
                      alt={skill.title}
                      src={simpleIconsCdn(skill.slug)}
                    />
                    <Avatar.Fallback>
                      <ImageBrokenIcon />
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <span>{skill.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {skill.category}
                  </span>
                </AnimateOnScroll>
              </li>
            ))}
          </ul>
        </Request.Content>
        <div className="inline-flex items-center gap-1 py-3 text-muted-foreground text-xs">
          <time dateTime={new Date(findAllSkills.dataUpdatedAt).toISOString()}>
            {findAllSkills.dataUpdatedAt &&
              tCommon("updatedAtTitle", {
                date: new Date(findAllSkills.dataUpdatedAt).toLocaleString(),
              })}
          </time>
          <CircleNotchIcon className="animate-spin group-data-[fetching=false]:hidden" />
        </div>
      </Request.Root>
    </div>
  );
}
