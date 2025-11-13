import { graphql } from "@/graphql";
import type {
  FindAllSkillsQuery,
  FindAllSkillsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findAllSkills = graphql(`
  query findAllSkills {
    findAllSkills {
      id
      name
      category
      slug
      color
    }
  }
`);

export const { prefetch: prefetchFindAllSkills, use: useFindAllSkills } =
  defineQuery<FindAllSkillsQuery, FindAllSkillsQueryVariables>(
    "findAllSkills",
    async () => await execute(findAllSkills).then((data) => data.data!)
  );
