import { graphql } from "@/graphql";
import type {
  FindManyExperiencesQuery,
  FindManyExperiencesQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyExperiences = graphql(`
  query FindManyExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortExperienceInput) {
    findManyExperiences(experienceFilters: $experienceFilters, experiencePagination: $experiencePagination, experienceSort: $experienceSort) {
      found
      nodes {
        category
        id
        organization {
          category
          id
          logo
          name
          slug
          website
        }
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
          category
          id
          slug
          i18n {
            locale
            messages {
              title
            }
          }
        }
        slug
      }
    }
  }
`);

export const {
  prefetch: prefetchFindManyExperiences,
  use: useFindManyExperiences,
} = defineQuery<FindManyExperiencesQuery, FindManyExperiencesQueryVariables>(
  "findManyExperiences",
  async (params: FindManyExperiencesQueryVariables = {}) => {
    // if (!params) throw new Error("insufficient parameters");
    return await execute(findManyExperiences, params).then(
      (data) => data.data!
    );
  }
);
