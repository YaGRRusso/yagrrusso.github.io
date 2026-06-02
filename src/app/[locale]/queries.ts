import {
  type FindManyCoursesQueryVariables,
  type FindManyEducationsQueryVariables,
  type FindManyExperiencesQueryVariables,
  type FindManyProjectsQueryVariables,
  type FindManySkillsQueryVariables,
  SortEnum,
} from "@/graphql/graphql";

export const HOME_SKILLS_VARS: FindManySkillsQueryVariables = {
  skillFilters: {},
  skillPagination: { limit: 50, skip: 0 },
  skillSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
};

export const HOME_PROJECTS_VARS: FindManyProjectsQueryVariables = {
  projectSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  projectPagination: { limit: 3 },
};

export const HOME_EXPERIENCES_VARS: FindManyExperiencesQueryVariables = {
  experienceSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  experiencePagination: { limit: 3 },
};

export const HOME_EDUCATIONS_VARS: FindManyEducationsQueryVariables = {
  educationSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  educationPagination: { limit: 3 },
};

export const HOME_COURSES_VARS: FindManyCoursesQueryVariables = {
  courseSort: { relevance: SortEnum.Desc, updatedAt: SortEnum.Desc },
  coursePagination: { limit: 6 },
};
