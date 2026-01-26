import { graphql } from "@/graphql";
import type {
  FindAllProjectsQuery,
  FindAllProjectsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findAllProjects = graphql(`
  query findAllProjects {
    findAllProjects {
      demoUrl
      i18n {
        locale
        messages {
          description
          name
        }
      }
      id
      images
      repositoryUrl
      skills {
        id
        name
        category
        slug
        color
      }
      slug
    }
  }
`);

export const { prefetch: prefetchFindAllProjects, use: useFindAllProjects } =
  defineQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(
    "findAllProjects",
    async () => await execute(findAllProjects).then((data) => data.data!)
  );
