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
      category
      id
      name
      slug
    }
  }
`);

export const { prefetch: prefetchFindAllSkills, use: useFindAllSkills } =
  defineQuery<FindAllSkillsQuery, FindAllSkillsQueryVariables>(
    "findAllSkills",
    async () => await execute(findAllSkills).then((data) => data.data!)
  );
