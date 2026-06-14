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
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { Request } from "@/components/ui/request";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getSlug } from "@/consts/slugs";
import { SkillCategory } from "@/graphql/graphql";
import { useFindManySkills } from "@/hooks/queries/skills";
import { getPagination } from "@/lib/pagination";
import { SKILL_SKILLS_VARS } from "./queries";

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

  const findManySkills = useFindManySkills(SKILL_SKILLS_VARS);

  const pagination = getPagination(
    limit,
    skip,
    findManySkills.data?.findManySkills.found
  );

  return (
    <div className="container flex flex-1 flex-col gap-4">
      <AnimateOnScroll y={16}>
        <PageTitle className="w-full" title={t("title")} />
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <span className="-mt-0.5 flex-1 text-muted-foreground text-xs md:max-w-xl">
            {t("stackNote")}
          </span>
          <Select.Root
            onValueChange={(value) =>
              setCategory(value as SkillCategory | "ALL")
            }
            value={category}
          >
            <Select.Trigger className="w-full flex-1 md:max-w-64">
              <Select.Value placeholder={tCommon("category")} />
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
          <ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {findManySkills.data?.findManySkills.nodes.map((skill) => (
              <li id={skill.slug} key={skill.id}>
                <AnimateOnScroll
                  className="relative flex h-full flex-col items-center justify-center rounded border p-4 text-center transition-colors"
                  y={16}
                >
                  <div className="mb-2 text-3xl">
                    {getSlug(skill.slug).icon}
                  </div>
                  <span>{skill.name}</span>
                  <Badge variant="outline">{skill.category}</Badge>
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
