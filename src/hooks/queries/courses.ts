import { graphql } from "@/graphql";
import type {
  FindManyCoursesQuery,
  FindManyCoursesQueryVariables,
} from "@/graphql/graphql";
import { execute } from "../factories/execute";
import { defineQuery } from "../factories/query";

const findManyCourses = graphql(`
  query FindManyCourses($courseFilters: FilterCourseInput, $coursePagination: PaginationInput, $courseSort: SortCourseInput) {
    findManyCourses(courseFilters: $courseFilters, coursePagination: $coursePagination, courseSort: $courseSort) {
      found
      nodes {
        hours
        relevance
        createdAt
        updatedAt
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
        skills {
          category
          id
          name
          slug
        }
        slug
      }
    }
  }
`);

export const { prefetch: prefetchFindManyCourses, use: useFindManyCourses } =
  defineQuery<FindManyCoursesQuery, FindManyCoursesQueryVariables>(
    "findManyCourses",
    async (params: FindManyCoursesQueryVariables = {}) =>
      await execute(findManyCourses, params).then((data) => data.data!)
  );
