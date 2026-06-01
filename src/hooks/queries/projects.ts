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
      found
      nodes{
        id
        i18n {
          locale
          messages {
            description
            title
          }
        }
        images
        skills {
          category
          id
          name
          slug
        }
        slug
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
    async (params: FindManyProjectsQueryVariables = {}) => {
      // if (!params) throw new Error("insufficient parameters");
      return await execute(findManyProjects, params).then((data) => data.data!);
    }
  );
