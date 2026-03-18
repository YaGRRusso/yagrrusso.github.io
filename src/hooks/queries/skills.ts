import { graphql } from "@/graphql";
import type {
  FindManySkillsQuery,
  FindManySkillsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManySkills = graphql(`
  query FindManySkills($skillFilters: FilterSkillInput) {
    findManySkills(SkillFilters: $skillFilters) {
      category
      id
      name
      slug
    }
  }
`);

export const { prefetch: prefetchFindManySkills, use: useFindManySkills } =
  defineQuery<FindManySkillsQuery, FindManySkillsQueryVariables>(
    "findManySkills",
    async (params?: FindManySkillsQueryVariables) => {
      // if (!params) throw new Error("insufficient parameters");
      return await execute(findManySkills, params ?? {}).then(
        (data) => data.data!
      );
    }
  );
