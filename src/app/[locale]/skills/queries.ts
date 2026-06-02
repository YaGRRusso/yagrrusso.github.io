import { type FindManySkillsQueryVariables, SortEnum } from "@/graphql/graphql";

export const SKILL_SKILLS_VARS: FindManySkillsQueryVariables = {
  skillFilters: {},
  skillPagination: { limit: 50, skip: 0 },
  skillSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};
