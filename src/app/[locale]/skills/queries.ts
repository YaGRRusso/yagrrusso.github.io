import { type FindManySkillsQueryVariables, SortEnum } from "@/graphql/graphql";
import { paginationInput } from "@/lib/pagination";
import { filterInput } from "@/lib/query-vars";

export const SKILL_SKILLS_VARS: FindManySkillsQueryVariables = {
  skillFilters: {},
  skillPagination: { limit: 50, skip: 0 },
  skillSort: { updatedAt: SortEnum.Desc },
};

export function getSkillSkillsVars(
  category?: string,
  page = 1
): FindManySkillsQueryVariables {
  const limit = SKILL_SKILLS_VARS.skillPagination?.limit ?? 50;

  return {
    ...SKILL_SKILLS_VARS,
    skillFilters: filterInput({ category }),
    skillPagination: paginationInput(page, limit),
  };
}
