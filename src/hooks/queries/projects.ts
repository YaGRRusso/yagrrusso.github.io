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
`);

export const { prefetch: prefetchFindAllProjects, use: useFindAllProjects } =
  defineQuery<FindAllProjectsQuery, FindAllProjectsQueryVariables>(
    "findAllProjects",
    async () => await execute(findAllProjects).then((data) => data.data!)
  );
