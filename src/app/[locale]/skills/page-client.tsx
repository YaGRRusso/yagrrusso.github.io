"use client";

import { ImageBrokenIcon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { type CSSProperties, useMemo, useState } from "react";
import { QueryHelper } from "@/classes/query";
import { Title } from "@/components/title";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { List } from "@/components/ui/list";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Categories } from "@/consts/categories";
import { useFindAllSkills } from "@/hooks/queries/skills";
import { useDebounce } from "@/hooks/reactive/useDebounce";
import { simpleIconsCdn } from "@/lib/cdn";

export function ClientPage() {
  const t = useTranslations("skillsPage");
  const tCommon = useTranslations("common");

  const [q, setQ] = useState("");
  const [tempQ, setTempQ] = useState("");
  const [category, setCategory] = useState<string>("");

  const findAllSkills = useFindAllSkills();

  const filteredList = useMemo(() => {
    if (!findAllSkills.data?.findAllSkills) return [];
    return new QueryHelper(findAllSkills.data.findAllSkills)
      .filter("SOFT", "category", "!==")
      .filter(category, "category")
      .query(q, ["name"])
      .sort("name")
      .exec();
  }, [findAllSkills.data, q, category]);

  useDebounce(() => setQ(tempQ), [tempQ], 500);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Title className="w-full" description={t("description")} title={t("title")} />
      <div className="flex w-full items-center gap-2">
        <Input className="flex-1" onChange={(e) => setTempQ(e.target.value)} placeholder="Query" value={tempQ} />
        <Select.Root onValueChange={(value) => setCategory(value === "ALL" ? "" : value)} value={category}>
          <Select.Trigger className="max-w-52 flex-1">
            <Select.Value placeholder="Category" />
          </Select.Trigger>
          <Select.Content>
            {Categories.map((cat) => (
              <Select.Item key={cat.value} value={cat.value}>
                {cat.icon} {cat.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      <List.Root
        isEmpty={!filteredList?.length}
        isFetching={findAllSkills.isFetching}
        isLoading={findAllSkills.isLoading}
      >
        <List.Loading>
          <Skeleton className="h-64 w-full" />
        </List.Loading>
        <List.Empty>
          <Alert.Root>
            <Alert.Title>{tCommon("emptyTitle")}</Alert.Title>
            <Alert.Description>{tCommon("emptyDescription")}</Alert.Description>
          </Alert.Root>
        </List.Empty>
        <List.Content>
          <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredList?.map((skill) => (
              <li
                className="flex flex-col items-center justify-center gap-2 rounded border p-4 transition-colors hover:border-[var(--skill-color)]"
                key={skill.id}
                style={{ "--skill-color": skill.color ?? "transparent" } as CSSProperties}
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
        </List.Content>
        <List.Info updatedAt={findAllSkills.dataUpdatedAt} />
      </List.Root>
    </div>
  );
}
