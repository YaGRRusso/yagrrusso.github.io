"use client";

import { CircleNotchIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
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
import { useFindManySkills } from "@/hooks/queries/skills";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const t = useTranslations("skillsPage");
  const tCommon = useTranslations("common");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const findManySkills = useFindManySkills();

  const filteredList = useMemo(() => {
    if (!findManySkills.data?.findManySkills) return [];
    return new QueryHelper(findManySkills.data.findManySkills)
      .filter("SOFT", "category", "!==")
      .filter(category, "category")
      .query(query, ["name"])
      .sort("name")
      .exec();
  }, [findManySkills.data, query, category]);

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
        isFetching={findManySkills.isFetching}
        isLoading={findManySkills.isLoading}
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
                  y={16}
                >
                  <Avatar.Root>
                    <Avatar.Image
                      alt={skill.name}
                      src={simpleIconsCdn(skill.slug)}
                    />
                    <Avatar.Fallback />
                  </Avatar.Root>
                  <span>{skill.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {skill.category}
                  </span>
                </AnimateOnScroll>
              </li>
            ))}
          </ul>
        </Request.Content>
        <div className="inline-flex items-center gap-1 py-3 text-muted-foreground text-xs">
          <time dateTime={new Date(findManySkills.dataUpdatedAt).toISOString()}>
            {findManySkills.dataUpdatedAt &&
              tCommon("updatedAtTitle", {
                date: new Date(findManySkills.dataUpdatedAt).toLocaleString(),
              })}
          </time>
          <CircleNotchIcon className="animate-spin group-data-[fetching=false]:hidden" />
        </div>
      </Request.Root>
    </div>
  );
}
