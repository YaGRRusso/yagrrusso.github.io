import { graphql } from "@/graphql";
import type {
  FindManySkillsQuery,
  FindManySkillsQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineInfiniteQuery, defineQuery } from "../factories/query";

const findManySkills = graphql(`
  query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {
    findManySkills(skillFilters: $skillFilters, skillPagination: $skillPagination, skillSort: $skillSort) {
      found
      nodes {
        category
        id
        name
        slug
      }
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

export const {
  prefetch: prefetchFindManySkillsInfinite,
  use: useFindManySkillsInfinite,
} = defineInfiniteQuery<FindManySkillsQuery, FindManySkillsQueryVariables>(
  "findManySkillsInfinite",
  async (params?: FindManySkillsQueryVariables, pageParam?: number) => {
    // if (!params) throw new Error("insufficient parameters");
    return await execute(findManySkills, {
      ...params,
      skillPagination: { ...params?.skillPagination, skip: pageParam },
    }).then((data) => data.data!);
  },
  (params?: FindManySkillsQueryVariables) => {
    const limit = params?.skillPagination?.limit ?? 50;
    return {
      initialPageParam: 0,
      getNextPageParam: (lastPage, _allPages, lastPageParam) =>
        lastPage.findManySkills.nodes.length === limit
          ? lastPageParam + limit
          : undefined,
    };
  }
);
