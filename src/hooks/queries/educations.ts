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
      found
      nodes {
        level
        url
        status
        i18n {
          locale
          messages {
            description
            title
            }
        }
        id
        image
        organization {
          category
          id
          logo
          name
          slug
          website
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
  prefetch: prefetchFindManyEducations,
  use: useFindManyEducations,
} = defineQuery<FindManyEducationsQuery, FindManyEducationsQueryVariables>(
  "findManyEducations",
  async (params: FindManyEducationsQueryVariables = {}) => {
    // if (!params) throw new Error("insufficient parameters");
    return await execute(findManyEducations, params).then((data) => data.data!);
  }
);
