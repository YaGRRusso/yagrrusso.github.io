import { graphql } from "@/graphql";
import type {
  FindManySkillsQuery,
  FindManySkillsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManySkills = graphql(`
  query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {
    findManySkills(skillFilters: $skillFilters, skillPagination: $skillPagination, skillSort: $skillSort) {
      nodes {
        id
        slug
        category
        i18n {
          locale
          messages {
            title
          }
        }
      }
      found
    }
  }
`);

export const { prefetch: prefetchFindManySkills, use: useFindManySkills } =
  defineQuery<FindManySkillsQuery, FindManySkillsQueryVariables>(
    "findManySkills",
    async (params?: FindManySkillsQueryVariables) =>
      await execute(findManySkills, params ?? {}).then((data) => data.data!)
  );
