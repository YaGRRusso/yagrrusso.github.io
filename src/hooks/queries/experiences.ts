import { graphql } from "@/graphql";
import type {
  FindManyGroupedExperiencesQuery,
  FindManyGroupedExperiencesQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyGroupedExperiences = graphql(`
  query FindManyGroupedExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortGroupedExperienceInput) {
    findManyGroupedExperiences(experienceFilters: $experienceFilters, experiencePagination: $experiencePagination, experienceSort: $experienceSort) {
      nodes {
        organization {
          id
          logo
          name
          website
        }
        experiences {
          i18n {
            locale
            messages {
              description
              title
            }
          }
          period {
            from
            to
          }
          skills {
            id
            slug
            i18n {
              locale
              messages {
                title
              }
            }
          }
        }
      }
    }
  }
`);

export const {
  prefetch: prefetchFindManyGroupedExperiences,
  use: useFindManyGroupedExperiences,
} = defineQuery<
  FindManyGroupedExperiencesQuery,
  FindManyGroupedExperiencesQueryVariables
>(
  "findManyGroupedExperiences",
  async (params = {}) =>
    await execute(findManyGroupedExperiences, params).then((data) => data.data!)
);
