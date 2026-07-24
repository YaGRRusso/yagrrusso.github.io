import {
  type FindManyCoursesQueryVariables,
  type FindManyEducationsQueryVariables,
  type FindManyGroupedExperiencesQueryVariables,
  type FindManyProjectsQueryVariables,
  SortEnum,
} from "@/graphql/graphql";

export const HOME_PROJECTS_VARS: FindManyProjectsQueryVariables = {
  projectPagination: { limit: 3 },
  projectSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};

export const HOME_EXPERIENCES_VARS: FindManyGroupedExperiencesQueryVariables = {
  experiencePagination: { limit: 3 },
  experienceSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};

export const HOME_EDUCATIONS_VARS: FindManyEducationsQueryVariables = {
  educationPagination: { limit: 3 },
  educationSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};

export const HOME_COURSES_VARS: FindManyCoursesQueryVariables = {
  coursePagination: { limit: 6 },
  courseSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};
