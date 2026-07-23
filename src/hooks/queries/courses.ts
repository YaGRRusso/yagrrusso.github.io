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
      nodes {
        id
        hours
        url
        status
        image
        i18n {
          locale
          messages {
            description
            title
          }
        }
        organization {
          logo
          name
          website
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
