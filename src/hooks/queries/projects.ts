import { graphql } from "@/graphql";
import type {
  FindManyProjectsQuery,
  FindManyProjectsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyProjects = graphql(`
  query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {
    findManyProjects(projectFilters: $projectFilters, projectPagination: $projectPagination, projectSort: $projectSort) {
      nodes {
        id
        slug
        images
        i18n {
          locale
          messages {
            description
            title
          }
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
        urls {
          title
          value
        }
      }
    }
  }
`);

export const { prefetch: prefetchFindManyProjects, use: useFindManyProjects } =
  defineQuery<FindManyProjectsQuery, FindManyProjectsQueryVariables>(
    "findManyProjects",
    async (params: FindManyProjectsQueryVariables = {}) =>
      await execute(findManyProjects, params).then((data) => data.data!)
  );
