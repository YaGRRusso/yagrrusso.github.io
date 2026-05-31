"use client";

import {
  CaretLeftIcon,
  CaretRightIcon,
  CircleNotchIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DevicesIcon,
  PackageIcon,
  RobotIcon,
} from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { PageTitle } from "@/components/page-title";
import { Alert } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Pagination } from "@/components/ui/pagination";
import { Request } from "@/components/ui/request";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillCategory, SortEnum } from "@/graphql/graphql";
import { useFindManySkills } from "@/hooks/queries/skills";
import { simpleIconsCdn } from "@/lib/cdn";
import { getPagination } from "@/lib/pagination";

export function ClientPage() {
  const t = useTranslations("skillsPage");
  const tCommon = useTranslations("common");

  const categoryIcons: Record<SkillCategory, React.ElementType> = {
    [SkillCategory.Backend]: CodeIcon,
    [SkillCategory.Data]: DatabaseIcon,
    [SkillCategory.Devops]: CloudIcon,
    [SkillCategory.Frontend]: DevicesIcon,
    [SkillCategory.Language]: RobotIcon,
  };

  // const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SkillCategory | "ALL">("ALL");
  const [page, setPage] = useState(1);

  const limit = 50;
  const skip = (page - 1) * limit;

  const findManySkills = useFindManySkills({
    skillFilters: {
      // name: query === "" ? undefined : query,
      category: category === "ALL" ? undefined : category,
    },
    skillPagination: { limit, skip },
    skillSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  });

  const pagination = getPagination(
    limit,
    skip,
    findManySkills.data?.findManySkills.found
  );

  return (
    <div className="container flex flex-1 flex-col gap-4">
      <AnimateOnScroll y={16}>
        <PageTitle className="w-full" title={t("title")} />
        <div className="flex w-full items-center justify-end gap-2">
          {/* <Input
            className="flex-1"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Query"
            value={query}
          /> */}
          <Select.Root
            onValueChange={(value) =>
              setCategory(value as SkillCategory | "ALL")
            }
            value={category}
          >
            <Select.Trigger className="max-w-64 flex-1">
              <Select.Value placeholder="Category" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="ALL">
                <PackageIcon />
                {tCommon("categories.ALL")}
              </Select.Item>
              {Object.values(SkillCategory).map((skillCategory) => {
                const CategoryIcon = categoryIcons[skillCategory];

                return (
                  <Select.Item key={skillCategory} value={skillCategory}>
                    <CategoryIcon />
                    {tCommon(`categories.${skillCategory}`)}
                  </Select.Item>
                );
              })}
            </Select.Content>
          </Select.Root>
        </div>
      </AnimateOnScroll>

      <Request.Root
        isEmpty={findManySkills.data?.findManySkills.found === 0}
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
            {findManySkills.data?.findManySkills.nodes.map((skill) => (
              <li id={skill.slug} key={skill.id}>
                <AnimateOnScroll
                  className="flex flex-col items-center justify-center gap-2 rounded border p-4 transition-colors"
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
        <div className="flex flex-wrap items-center justify-center gap-x-4">
          <div className="inline-flex flex-1 items-center gap-1 py-3 text-muted-foreground text-xs">
            <time
              dateTime={new Date(findManySkills.dataUpdatedAt).toISOString()}
            >
              {findManySkills.dataUpdatedAt &&
                tCommon("updatedAtTitle", {
                  date: new Date(findManySkills.dataUpdatedAt).toLocaleString(),
                })}
            </time>
            <CircleNotchIcon className="animate-spin group-data-[fetching=false]:hidden" />
          </div>
          <Pagination.Root>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Button
                  disabled={!pagination.hasPreviousPage}
                  onClick={() => setPage(pagination.previousPage ?? 1)}
                >
                  <CaretLeftIcon />
                </Pagination.Button>
              </Pagination.Item>
              <Pagination.Item>
                <span>
                  {tCommon("page", {
                    current: pagination.currentPage,
                    total: pagination.totalPages || 1,
                  })}
                </span>
              </Pagination.Item>
              <Pagination.Item>
                <Pagination.Button
                  disabled={!pagination.hasNextPage}
                  onClick={() => setPage(pagination.nextPage ?? page)}
                >
                  <CaretRightIcon />
                </Pagination.Button>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination.Root>
        </div>
      </Request.Root>
    </div>
  );
}
