import { graphql } from "@/graphql";
import type {
  FindManyEducationsQuery,
  FindManyEducationsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyEducations = graphql(`
  query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {
    findManyEducations(educationFilters: $educationFilters, educationPagination: $educationPagination, educationSort: $educationSort) {
      nodes {
        id
        level
        url
        status
        image
        i18n {
          locale
          messages {
            description
            title
          }
        }
        organization {
          logo
          name
          website
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
`);

export const {
  prefetch: prefetchFindManyEducations,
  use: useFindManyEducations,
} = defineQuery<FindManyEducationsQuery, FindManyEducationsQueryVariables>(
  "findManyEducations",
  async (params: FindManyEducationsQueryVariables = {}) =>
    await execute(findManyEducations, params).then((data) => data.data!)
);
