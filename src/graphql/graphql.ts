/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AiEntity = {
  __typename?: 'AiEntity';
  messages: Array<ChoiceEntity>;
  usage?: Maybe<UsageEntity>;
};

export type ApiTokenEntity = {
  __typename?: 'ApiTokenEntity';
  createdAt: Scalars['DateTime']['output'];
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: UserEntity;
  ownerId: Scalars['String']['output'];
  permissions: Array<ApiTokenPermission>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ApiTokenPermission {
  Mutate = 'MUTATE',
  Query = 'QUERY'
}

export type AtsSummarizeInput = {
  details?: InputMaybe<Array<DetailInput>>;
  raw: Scalars['String']['input'];
  skills: Array<Scalars['String']['input']>;
  type: ResourceType;
};

export type BatchEntity = {
  __typename?: 'BatchEntity';
  failed: Scalars['Int']['output'];
  succeeded: Scalars['Int']['output'];
};

export enum CatalogPartition {
  Global = 'GLOBAL',
  Local = 'LOCAL'
}

export enum ChatFinishReason {
  ContentFilter = 'CONTENT_FILTER',
  Error = 'ERROR',
  Length = 'LENGTH',
  Stop = 'STOP',
  ToolCalls = 'TOOL_CALLS'
}

export enum ChatRole {
  Assistant = 'ASSISTANT',
  Developer = 'DEVELOPER',
  System = 'SYSTEM',
  Tool = 'TOOL',
  User = 'USER'
}

export type ChoiceEntity = {
  __typename?: 'ChoiceEntity';
  finishReason?: Maybe<ChatFinishReason>;
  message: MessageEntity;
};

export enum ContextMode {
  PageExtract = 'PAGE_EXTRACT',
  WebSearch = 'WEB_SEARCH'
}

export type CourseEntity = {
  __typename?: 'CourseEntity';
  createdAt: Scalars['DateTime']['output'];
  hours?: Maybe<Scalars['Int']['output']>;
  i18n: Array<CourseTranslationLocale>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<OrganizationEntity>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  relevance: Scalars['Float']['output'];
  skillIds?: Maybe<Array<Scalars['ID']['output']>>;
  skills?: Maybe<Array<SkillEntity>>;
  slug?: Maybe<Scalars['String']['output']>;
  status: CourseStatus;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type CourseMessages = {
  __typename?: 'CourseMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum CourseStatus {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS'
}

export type CourseTranslationLocale = {
  __typename?: 'CourseTranslationLocale';
  locale: Scalars['String']['output'];
  messages: CourseMessages;
};

export type CreateApiTokenInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  permissions: Array<ApiTokenPermission>;
};

export type CreateCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n: Array<CreateCourseMessagesInputTranslationInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['String']['input'];
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status: CourseStatus;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCourseMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateCourseMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateCourseMessagesInput;
};

export type CreateEducationInput = {
  i18n: Array<CreateEducationMessagesInputTranslationInput>;
  image?: InputMaybe<Scalars['String']['input']>;
  level: EducationLevel;
  organizationId: Scalars['String']['input'];
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status: EducationStatus;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEducationMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateEducationMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateEducationMessagesInput;
};

export type CreateExperienceInput = {
  category: ExperienceCategory;
  i18n: Array<CreateExperienceMessagesInputTranslationInput>;
  organizationId: Scalars['String']['input'];
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateExperienceMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateExperienceMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateExperienceMessagesInput;
};

export type CreateOrganizationInput = {
  category: OrganizationCategory;
  i18n: Array<CreateOrganizationMessagesInputTranslationInput>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganizationMessagesInput = {
  description: Scalars['String']['input'];
};

export type CreateOrganizationMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateOrganizationMessagesInput;
};

export type CreateProjectInput = {
  i18n: Array<CreateProjectMessagesInputTranslationInput>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type CreateProjectMessagesInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProjectMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateProjectMessagesInput;
};

export type CreateSkillInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  i18n: Array<CreateSkillMessagesInputTranslationInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSkillMessagesInput = {
  title: Scalars['String']['input'];
};

export type CreateSkillMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateSkillMessagesInput;
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  i18n?: InputMaybe<Array<CreateUserMessagesInputTranslationInput>>;
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type CreateUserMessagesInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserMessagesInputTranslationInput = {
  locale: Scalars['String']['input'];
  messages: CreateUserMessagesInput;
};

export type DashboardActivityItem = {
  __typename?: 'DashboardActivityItem';
  i18n: Array<DashboardActivityTranslationLocale>;
  slug?: Maybe<Scalars['String']['output']>;
  type: DashboardActivityType;
  updatedAt: Scalars['DateTime']['output'];
};

export type DashboardActivityMessages = {
  __typename?: 'DashboardActivityMessages';
  title: Scalars['String']['output'];
};

export type DashboardActivityTranslationLocale = {
  __typename?: 'DashboardActivityTranslationLocale';
  locale: Scalars['String']['output'];
  messages: DashboardActivityMessages;
};

export enum DashboardActivityType {
  Course = 'COURSE',
  Education = 'EDUCATION',
  Experience = 'EXPERIENCE',
  Organization = 'ORGANIZATION',
  Project = 'PROJECT',
  Skill = 'SKILL'
}

export type DashboardCount = {
  __typename?: 'DashboardCount';
  label: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type DashboardEntity = {
  __typename?: 'DashboardEntity';
  coursesByStatus: Array<DashboardCount>;
  experiencesByCategory: Array<DashboardCount>;
  recentActivity: Array<DashboardActivityItem>;
  totals: DashboardTotals;
};

export type DashboardTotals = {
  __typename?: 'DashboardTotals';
  courses: Scalars['Int']['output'];
  educations: Scalars['Int']['output'];
  experiences: Scalars['Int']['output'];
  organizations: Scalars['Int']['output'];
  ownedLocalOrganizations: Scalars['Int']['output'];
  ownedLocalSkills: Scalars['Int']['output'];
  projects: Scalars['Int']['output'];
  skills: Scalars['Int']['output'];
};

export type DateRangeEntity = {
  __typename?: 'DateRangeEntity';
  from?: Maybe<Scalars['DateTime']['output']>;
  to?: Maybe<Scalars['DateTime']['output']>;
};

export type DateRangeInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DetailInput = {
  contextMode?: InputMaybe<ContextMode>;
  key: Scalars['String']['input'];
  value: Array<Scalars['String']['input']>;
};

export type EducationEntity = {
  __typename?: 'EducationEntity';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<EducationTranslationLocale>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  level: EducationLevel;
  organization?: Maybe<OrganizationEntity>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  period?: Maybe<DateRangeEntity>;
  relevance: Scalars['Float']['output'];
  skillIds?: Maybe<Array<Scalars['ID']['output']>>;
  skills?: Maybe<Array<SkillEntity>>;
  slug?: Maybe<Scalars['String']['output']>;
  status: EducationStatus;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export enum EducationLevel {
  Bachelor = 'BACHELOR',
  Doctorate = 'DOCTORATE',
  HighSchool = 'HIGH_SCHOOL',
  Master = 'MASTER',
  Postgrad = 'POSTGRAD',
  Technical = 'TECHNICAL'
}

export type EducationMessages = {
  __typename?: 'EducationMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum EducationStatus {
  Complete = 'COMPLETE',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS'
}

export type EducationTranslationLocale = {
  __typename?: 'EducationTranslationLocale';
  locale: Scalars['String']['output'];
  messages: EducationMessages;
};

export enum ExperienceCategory {
  Freelance = 'FREELANCE',
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME',
  Volunteer = 'VOLUNTEER'
}

export type ExperienceEntity = {
  __typename?: 'ExperienceEntity';
  category: ExperienceCategory;
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<ExperienceTranslationLocale>;
  id: Scalars['ID']['output'];
  organization?: Maybe<OrganizationEntity>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  period?: Maybe<DateRangeEntity>;
  relevance: Scalars['Float']['output'];
  skillIds?: Maybe<Array<Scalars['ID']['output']>>;
  skills?: Maybe<Array<SkillEntity>>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ExperienceMessages = {
  __typename?: 'ExperienceMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ExperienceTranslationLocale = {
  __typename?: 'ExperienceTranslationLocale';
  locale: Scalars['String']['output'];
  messages: ExperienceMessages;
};

export type FilterApiTokenInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<ApiTokenPermission>>;
};

export type FilterCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n?: InputMaybe<Array<CreateCourseMessagesInputTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type FilterEducationInput = {
  i18n?: InputMaybe<Array<CreateEducationMessagesInputTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<EducationLevel>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EducationStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type FilterExperienceInput = {
  category?: InputMaybe<ExperienceCategory>;
  i18n?: InputMaybe<Array<CreateExperienceMessagesInputTranslationInput>>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FilterOrganizationInput = {
  category?: InputMaybe<OrganizationCategory>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  i18n?: InputMaybe<Array<CreateOrganizationMessagesInputTranslationInput>>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  partition?: InputMaybe<CatalogPartition>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type FilterProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectMessagesInputTranslationInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type FilterSkillInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  partition?: InputMaybe<CatalogPartition>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type FilterUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  i18n?: InputMaybe<Array<CreateUserMessagesInputTranslationInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type GroupedExperienceEntity = {
  __typename?: 'GroupedExperienceEntity';
  createdAt: Scalars['DateTime']['output'];
  experiences: Array<ExperienceEntity>;
  organization?: Maybe<OrganizationEntity>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  period?: Maybe<DateRangeEntity>;
  relevance: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  content: Scalars['String']['output'];
  reasoning?: Maybe<Scalars['String']['output']>;
  refusal?: Maybe<Scalars['String']['output']>;
  role: ChatRole;
};

export type Mutation = {
  __typename?: 'Mutation';
  atsSummarize: AiEntity;
  createManyCourses: BatchEntity;
  createManyEducations: BatchEntity;
  createManyExperiences: BatchEntity;
  createManyOrganizations: BatchEntity;
  createManyProjects: BatchEntity;
  createManySkills: BatchEntity;
  createManyUsers: BatchEntity;
  createOneApiToken: NewApiTokenEntity;
  createOneCourse: CourseEntity;
  createOneEducation: EducationEntity;
  createOneExperience: ExperienceEntity;
  createOneOrganization: OrganizationEntity;
  createOneProject: ProjectEntity;
  createOneSkill: SkillEntity;
  createOneUser: UserEntity;
  disableManyOrganizations: BatchEntity;
  disableManySkills: BatchEntity;
  disableOneOrganization: OrganizationEntity;
  disableOneSkill: SkillEntity;
  enableManyOrganizations: BatchEntity;
  enableManySkills: BatchEntity;
  enableOneOrganization: OrganizationEntity;
  enableOneSkill: SkillEntity;
  register: UserEntity;
  removeManyApiTokens: BatchEntity;
  removeManyCourses: BatchEntity;
  removeManyEducations: BatchEntity;
  removeManyExperiences: BatchEntity;
  removeManyOrganizations: BatchEntity;
  removeManyProjects: BatchEntity;
  removeManySkills: BatchEntity;
  removeManyUsers: BatchEntity;
  removeOneApiToken: ApiTokenEntity;
  removeOneCourse: CourseEntity;
  removeOneEducation: EducationEntity;
  removeOneExperience: ExperienceEntity;
  removeOneOrganization: OrganizationEntity;
  removeOneProject: ProjectEntity;
  removeOneSkill: SkillEntity;
  removeOneUser: UserEntity;
  signIn: Scalars['String']['output'];
  summarize: AiEntity;
  toggleStatusManyUsers: BatchEntity;
  toggleStatusOneUser: UserEntity;
  translate: AiEntity;
  updateManyApiTokens: BatchEntity;
  updateManyCourses: BatchEntity;
  updateManyEducations: BatchEntity;
  updateManyExperiences: BatchEntity;
  updateManyOrganizations: BatchEntity;
  updateManyProjects: BatchEntity;
  updateManySkills: BatchEntity;
  updateManyUsers: BatchEntity;
  updateMe: UserEntity;
  updateOneApiToken: ApiTokenEntity;
  updateOneCourse: CourseEntity;
  updateOneEducation: EducationEntity;
  updateOneExperience: ExperienceEntity;
  updateOneOrganization: OrganizationEntity;
  updateOneProject: ProjectEntity;
  updateOneSkill: SkillEntity;
  updateOneUser: UserEntity;
};


export type MutationAtsSummarizeArgs = {
  atsSummarizeInput: AtsSummarizeInput;
};


export type MutationCreateManyCoursesArgs = {
  createCourseInputs: Array<CreateCourseInput>;
};


export type MutationCreateManyEducationsArgs = {
  createEducationInputs: Array<CreateEducationInput>;
};


export type MutationCreateManyExperiencesArgs = {
  createExperienceInputs: Array<CreateExperienceInput>;
};


export type MutationCreateManyOrganizationsArgs = {
  createOrganizationInputs: Array<CreateOrganizationInput>;
};


export type MutationCreateManyProjectsArgs = {
  createProjectInputs: Array<CreateProjectInput>;
};


export type MutationCreateManySkillsArgs = {
  createSkillInputs: Array<CreateSkillInput>;
};


export type MutationCreateManyUsersArgs = {
  createUserInputs: Array<CreateUserInput>;
};


export type MutationCreateOneApiTokenArgs = {
  createApiTokenInput: CreateApiTokenInput;
};


export type MutationCreateOneCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateOneEducationArgs = {
  createEducationInput: CreateEducationInput;
};


export type MutationCreateOneExperienceArgs = {
  createExperienceInput: CreateExperienceInput;
};


export type MutationCreateOneOrganizationArgs = {
  createOrganizationInput: CreateOrganizationInput;
};


export type MutationCreateOneProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateOneSkillArgs = {
  createSkillInput: CreateSkillInput;
};


export type MutationCreateOneUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDisableManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type MutationDisableManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type MutationDisableOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type MutationDisableOneSkillArgs = {
  skillId: Scalars['ID']['input'];
};


export type MutationEnableManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type MutationEnableManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type MutationEnableOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type MutationEnableOneSkillArgs = {
  skillId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterUserInput;
};


export type MutationRemoveManyApiTokensArgs = {
  apiTokenIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyCoursesArgs = {
  courseIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyEducationsArgs = {
  educationIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyExperiencesArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyProjectsArgs = {
  projectIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveManyUsersArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveOneApiTokenArgs = {
  apiTokenId: Scalars['ID']['input'];
};


export type MutationRemoveOneCourseArgs = {
  courseId: Scalars['ID']['input'];
};


export type MutationRemoveOneEducationArgs = {
  educationId: Scalars['ID']['input'];
};


export type MutationRemoveOneExperienceArgs = {
  experienceId: Scalars['ID']['input'];
};


export type MutationRemoveOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type MutationRemoveOneProjectArgs = {
  projectId: Scalars['ID']['input'];
};


export type MutationRemoveOneSkillArgs = {
  skillId: Scalars['ID']['input'];
};


export type MutationRemoveOneUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationSummarizeArgs = {
  summarizeInput: SummarizeInput;
};


export type MutationToggleStatusManyUsersArgs = {
  disabled: Scalars['Boolean']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationToggleStatusOneUserArgs = {
  disabled: Scalars['Boolean']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationTranslateArgs = {
  translateInput: TranslateInput;
};


export type MutationUpdateManyApiTokensArgs = {
  apiTokenIds: Array<Scalars['ID']['input']>;
  updateApiTokenInput: UpdateApiTokenInput;
};


export type MutationUpdateManyCoursesArgs = {
  courseIds: Array<Scalars['ID']['input']>;
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateManyEducationsArgs = {
  educationIds: Array<Scalars['ID']['input']>;
  updateEducationInput: UpdateEducationInput;
};


export type MutationUpdateManyExperiencesArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
  updateExperienceInput: UpdateExperienceInput;
};


export type MutationUpdateManyOrganizationsArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateManyProjectsArgs = {
  projectIds: Array<Scalars['ID']['input']>;
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateManySkillsArgs = {
  skillIds: Array<Scalars['ID']['input']>;
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateManyUsersArgs = {
  updateUserInput: UpdateUserInput;
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateMeArgs = {
  updateMeInput: UpdateMeInput;
};


export type MutationUpdateOneApiTokenArgs = {
  apiTokenId: Scalars['ID']['input'];
  updateApiTokenInput: UpdateApiTokenInput;
};


export type MutationUpdateOneCourseArgs = {
  courseId: Scalars['ID']['input'];
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateOneEducationArgs = {
  educationId: Scalars['ID']['input'];
  updateEducationInput: UpdateEducationInput;
};


export type MutationUpdateOneExperienceArgs = {
  experienceId: Scalars['ID']['input'];
  updateExperienceInput: UpdateExperienceInput;
};


export type MutationUpdateOneOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
  updateOrganizationInput: UpdateOrganizationInput;
};


export type MutationUpdateOneProjectArgs = {
  projectId: Scalars['ID']['input'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateOneSkillArgs = {
  skillId: Scalars['ID']['input'];
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateOneUserArgs = {
  updateUserInput: UpdateUserInput;
  userId: Scalars['ID']['input'];
};

export type NewApiTokenEntity = {
  __typename?: 'NewApiTokenEntity';
  apiToken: ApiTokenEntity;
  token: Scalars['String']['output'];
};

export enum OrganizationCategory {
  Company = 'COMPANY',
  Other = 'OTHER',
  School = 'SCHOOL'
}

export type OrganizationEntity = {
  __typename?: 'OrganizationEntity';
  category: OrganizationCategory;
  createdAt: Scalars['DateTime']['output'];
  disabled: Scalars['Boolean']['output'];
  i18n: Array<OrganizationTranslationLocale>;
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  partition: CatalogPartition;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type OrganizationMessages = {
  __typename?: 'OrganizationMessages';
  description: Scalars['String']['output'];
};

export type OrganizationTranslationLocale = {
  __typename?: 'OrganizationTranslationLocale';
  locale: Scalars['String']['output'];
  messages: OrganizationMessages;
};

export type PaginatedApiTokenEntity = {
  __typename?: 'PaginatedApiTokenEntity';
  found: Scalars['Float']['output'];
  nodes: Array<ApiTokenEntity>;
};

export type PaginatedCourseEntity = {
  __typename?: 'PaginatedCourseEntity';
  found: Scalars['Float']['output'];
  nodes: Array<CourseEntity>;
};

export type PaginatedEducationEntity = {
  __typename?: 'PaginatedEducationEntity';
  found: Scalars['Float']['output'];
  nodes: Array<EducationEntity>;
};

export type PaginatedExperienceEntity = {
  __typename?: 'PaginatedExperienceEntity';
  found: Scalars['Float']['output'];
  nodes: Array<ExperienceEntity>;
};

export type PaginatedGroupedExperienceEntity = {
  __typename?: 'PaginatedGroupedExperienceEntity';
  found: Scalars['Float']['output'];
  nodes: Array<GroupedExperienceEntity>;
};

export type PaginatedOrganizationEntity = {
  __typename?: 'PaginatedOrganizationEntity';
  found: Scalars['Float']['output'];
  nodes: Array<OrganizationEntity>;
};

export type PaginatedProjectEntity = {
  __typename?: 'PaginatedProjectEntity';
  found: Scalars['Float']['output'];
  nodes: Array<ProjectEntity>;
};

export type PaginatedSkillEntity = {
  __typename?: 'PaginatedSkillEntity';
  found: Scalars['Float']['output'];
  nodes: Array<SkillEntity>;
};

export type PaginatedUserEntity = {
  __typename?: 'PaginatedUserEntity';
  found: Scalars['Float']['output'];
  nodes: Array<UserEntity>;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<ProjectMessagesTranslationEntity>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  relevance: Scalars['Float']['output'];
  skillIds?: Maybe<Array<Scalars['ID']['output']>>;
  skills?: Maybe<Array<SkillEntity>>;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<UrlEntity>>;
};

export type ProjectMessages = {
  __typename?: 'ProjectMessages';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProjectMessagesTranslationEntity = {
  __typename?: 'ProjectMessagesTranslationEntity';
  locale: Scalars['String']['output'];
  messages: ProjectMessages;
};

export type Query = {
  __typename?: 'Query';
  dashboard: DashboardEntity;
  findManyActiveOrganizations: PaginatedOrganizationEntity;
  findManyActiveSkills: PaginatedSkillEntity;
  findManyApiTokenById: Array<ApiTokenEntity>;
  findManyApiTokens: PaginatedApiTokenEntity;
  findManyCourseById: Array<CourseEntity>;
  findManyCourses: PaginatedCourseEntity;
  findManyEducationById: Array<EducationEntity>;
  findManyEducations: PaginatedEducationEntity;
  findManyExperienceById: Array<ExperienceEntity>;
  findManyExperiences: PaginatedExperienceEntity;
  findManyGroupedExperiences: PaginatedGroupedExperienceEntity;
  findManyOrganizationById: Array<OrganizationEntity>;
  findManyOrganizations: PaginatedOrganizationEntity;
  findManyProjectById: Array<ProjectEntity>;
  findManyProjects: PaginatedProjectEntity;
  findManySkillById: Array<SkillEntity>;
  findManySkills: PaginatedSkillEntity;
  findManyUserById: Array<UserEntity>;
  findManyUsers: PaginatedUserEntity;
  findOneActiveOrganization: OrganizationEntity;
  findOneActiveSkill: SkillEntity;
  findOneApiToken: ApiTokenEntity;
  findOneApiTokenById: ApiTokenEntity;
  findOneCourse: CourseEntity;
  findOneCourseById: CourseEntity;
  findOneEducation: EducationEntity;
  findOneEducationById: EducationEntity;
  findOneExperience: ExperienceEntity;
  findOneExperienceById: ExperienceEntity;
  findOneGroupedExperience: GroupedExperienceEntity;
  findOneOrganization: OrganizationEntity;
  findOneOrganizationById: OrganizationEntity;
  findOneProject: ProjectEntity;
  findOneProjectById: ProjectEntity;
  findOneSkill: SkillEntity;
  findOneSkillById: SkillEntity;
  findOneUser: UserEntity;
  findOneUserById: UserEntity;
  getMe: UserEntity;
};


export type QueryFindManyActiveOrganizationsArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
  organizationPagination?: InputMaybe<PaginationInput>;
  organizationSort?: InputMaybe<SortOrganizationInput>;
};


export type QueryFindManyActiveSkillsArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
  skillPagination?: InputMaybe<PaginationInput>;
  skillSort?: InputMaybe<SortSkillInput>;
};


export type QueryFindManyApiTokenByIdArgs = {
  apiTokenIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyApiTokensArgs = {
  apiTokenFilters?: InputMaybe<FilterApiTokenInput>;
  apiTokenPagination?: InputMaybe<PaginationInput>;
  apiTokenSort?: InputMaybe<SortApiTokenInput>;
};


export type QueryFindManyCourseByIdArgs = {
  courseIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyCoursesArgs = {
  courseFilters?: InputMaybe<FilterCourseInput>;
  coursePagination?: InputMaybe<PaginationInput>;
  courseSort?: InputMaybe<SortCourseInput>;
};


export type QueryFindManyEducationByIdArgs = {
  educationIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyEducationsArgs = {
  educationFilters?: InputMaybe<FilterEducationInput>;
  educationPagination?: InputMaybe<PaginationInput>;
  educationSort?: InputMaybe<SortEducationInput>;
};


export type QueryFindManyExperienceByIdArgs = {
  experienceIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyExperiencesArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experiencePagination?: InputMaybe<PaginationInput>;
  experienceSort?: InputMaybe<SortExperienceInput>;
};


export type QueryFindManyGroupedExperiencesArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experiencePagination?: InputMaybe<PaginationInput>;
  experienceSort?: InputMaybe<SortGroupedExperienceInput>;
};


export type QueryFindManyOrganizationByIdArgs = {
  organizationIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyOrganizationsArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
  organizationPagination?: InputMaybe<PaginationInput>;
  organizationSort?: InputMaybe<SortOrganizationInput>;
};


export type QueryFindManyProjectByIdArgs = {
  projectIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyProjectsArgs = {
  projectFilters?: InputMaybe<FilterProjectInput>;
  projectPagination?: InputMaybe<PaginationInput>;
  projectSort?: InputMaybe<SortProjectInput>;
};


export type QueryFindManySkillByIdArgs = {
  skillIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManySkillsArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
  skillPagination?: InputMaybe<PaginationInput>;
  skillSort?: InputMaybe<SortSkillInput>;
};


export type QueryFindManyUserByIdArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type QueryFindManyUsersArgs = {
  userFilters?: InputMaybe<FilterUserInput>;
  userPagination?: InputMaybe<PaginationInput>;
  userSort?: InputMaybe<SortUserInput>;
};


export type QueryFindOneActiveOrganizationArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
};


export type QueryFindOneActiveSkillArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
};


export type QueryFindOneApiTokenArgs = {
  apiTokenFilters?: InputMaybe<FilterApiTokenInput>;
};


export type QueryFindOneApiTokenByIdArgs = {
  apiTokenId: Scalars['ID']['input'];
};


export type QueryFindOneCourseArgs = {
  courseFilters?: InputMaybe<FilterCourseInput>;
};


export type QueryFindOneCourseByIdArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryFindOneEducationArgs = {
  educationFilters?: InputMaybe<FilterEducationInput>;
};


export type QueryFindOneEducationByIdArgs = {
  educationId: Scalars['ID']['input'];
};


export type QueryFindOneExperienceArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
};


export type QueryFindOneExperienceByIdArgs = {
  experienceId: Scalars['ID']['input'];
};


export type QueryFindOneGroupedExperienceArgs = {
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experienceSort?: InputMaybe<SortGroupedExperienceInput>;
};


export type QueryFindOneOrganizationArgs = {
  organizationFilters?: InputMaybe<FilterOrganizationInput>;
};


export type QueryFindOneOrganizationByIdArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryFindOneProjectArgs = {
  projectFilters?: InputMaybe<FilterProjectInput>;
};


export type QueryFindOneProjectByIdArgs = {
  projectId: Scalars['ID']['input'];
};


export type QueryFindOneSkillArgs = {
  skillFilters?: InputMaybe<FilterSkillInput>;
};


export type QueryFindOneSkillByIdArgs = {
  skillId: Scalars['ID']['input'];
};


export type QueryFindOneUserArgs = {
  userFilters?: InputMaybe<FilterUserInput>;
};


export type QueryFindOneUserByIdArgs = {
  userId: Scalars['ID']['input'];
};

export type RegisterUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum ResourceType {
  Course = 'COURSE',
  Education = 'EDUCATION',
  Experience = 'EXPERIENCE',
  Organization = 'ORGANIZATION',
  Project = 'PROJECT',
  User = 'USER'
}

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SkillEntity = {
  __typename?: 'SkillEntity';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  disabled: Scalars['Boolean']['output'];
  i18n: Array<SkillTranslationLocale>;
  id: Scalars['ID']['output'];
  owner: UserEntity;
  ownerId: Scalars['ID']['output'];
  partition: CatalogPartition;
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type SkillMessages = {
  __typename?: 'SkillMessages';
  title: Scalars['String']['output'];
};

export type SkillTranslationLocale = {
  __typename?: 'SkillTranslationLocale';
  locale: Scalars['String']['output'];
  messages: SkillMessages;
};

export type SortApiTokenInput = {
  createdAt?: InputMaybe<SortEnum>;
  expiresAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortCourseInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortEducationInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortExperienceInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortGroupedExperienceInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortOrganizationInput = {
  createdAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortProjectInput = {
  createdAt?: InputMaybe<SortEnum>;
  relevance?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortSkillInput = {
  createdAt?: InputMaybe<SortEnum>;
  slug?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SortUserInput = {
  createdAt?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type SummarizeInput = {
  details?: InputMaybe<Array<DetailInput>>;
  raw: Scalars['String']['input'];
  type: ResourceType;
};

export type TranslateInput = {
  raw: Scalars['String']['input'];
  sourceLanguage?: InputMaybe<Scalars['String']['input']>;
  targetLanguage: Scalars['String']['input'];
};

export type UpdateApiTokenInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<ApiTokenPermission>>;
};

export type UpdateCourseInput = {
  hours?: InputMaybe<Scalars['Int']['input']>;
  i18n?: InputMaybe<Array<CreateCourseMessagesInputTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CourseStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEducationInput = {
  i18n?: InputMaybe<Array<CreateEducationMessagesInputTranslationInput>>;
  image?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<EducationLevel>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EducationStatus>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateExperienceInput = {
  category?: InputMaybe<ExperienceCategory>;
  i18n?: InputMaybe<Array<CreateExperienceMessagesInputTranslationInput>>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  period?: InputMaybe<DateRangeInput>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  i18n?: InputMaybe<Array<CreateUserMessagesInputTranslationInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UpdateOrganizationInput = {
  category?: InputMaybe<OrganizationCategory>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  i18n?: InputMaybe<Array<CreateOrganizationMessagesInputTranslationInput>>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectMessagesInputTranslationInput>>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  relevance?: InputMaybe<Scalars['Float']['input']>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UpdateSkillInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  disabled?: InputMaybe<Scalars['Boolean']['input']>;
  i18n?: InputMaybe<Array<CreateSkillMessagesInputTranslationInput>>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  i18n?: InputMaybe<Array<CreateUserMessagesInputTranslationInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  skillIds?: InputMaybe<Array<Scalars['String']['input']>>;
  urls?: InputMaybe<Array<UrlInput>>;
};

export type UrlEntity = {
  __typename?: 'UrlEntity';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type UrlInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UsageEntity = {
  __typename?: 'UsageEntity';
  completionTokens?: Maybe<Scalars['Float']['output']>;
  cost?: Maybe<Scalars['Float']['output']>;
  promptTokens?: Maybe<Scalars['Float']['output']>;
  totalTokens?: Maybe<Scalars['Float']['output']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birth?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  disabled: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  i18n?: Maybe<Array<UserTranslationLocale>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  ownedCounts: UserOwnedCounts;
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  skillIds?: Maybe<Array<Scalars['ID']['output']>>;
  skills?: Maybe<Array<SkillEntity>>;
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<UrlEntity>>;
};

export type UserMessages = {
  __typename?: 'UserMessages';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type UserOwnedCounts = {
  __typename?: 'UserOwnedCounts';
  courses: Scalars['Int']['output'];
  educations: Scalars['Int']['output'];
  experiences: Scalars['Int']['output'];
  projects: Scalars['Int']['output'];
};

export enum UserRole {
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER'
}

export type UserTranslationLocale = {
  __typename?: 'UserTranslationLocale';
  locale: Scalars['String']['output'];
  messages: UserMessages;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserEntity', name: string, avatar?: string | null, i18n?: Array<{ __typename?: 'UserTranslationLocale', locale: string, messages: { __typename?: 'UserMessages', title?: string | null, description?: string | null } }> | null } };

export type FindManyCoursesQueryVariables = Exact<{
  courseFilters?: InputMaybe<FilterCourseInput>;
  coursePagination?: InputMaybe<PaginationInput>;
  courseSort?: InputMaybe<SortCourseInput>;
}>;


export type FindManyCoursesQuery = { __typename?: 'Query', findManyCourses: { __typename?: 'PaginatedCourseEntity', nodes: Array<{ __typename?: 'CourseEntity', id: string, hours?: number | null, url?: string | null, status: CourseStatus, image?: string | null, i18n: Array<{ __typename?: 'CourseTranslationLocale', locale: string, messages: { __typename?: 'CourseMessages', description: string, title: string } }>, organization?: { __typename?: 'OrganizationEntity', logo?: string | null, name: string, website?: string | null } | null, skills?: Array<{ __typename?: 'SkillEntity', id: string, slug?: string | null, i18n: Array<{ __typename?: 'SkillTranslationLocale', locale: string, messages: { __typename?: 'SkillMessages', title: string } }> }> | null }> } };

export type FindManyEducationsQueryVariables = Exact<{
  educationFilters?: InputMaybe<FilterEducationInput>;
  educationPagination?: InputMaybe<PaginationInput>;
  educationSort?: InputMaybe<SortEducationInput>;
}>;


export type FindManyEducationsQuery = { __typename?: 'Query', findManyEducations: { __typename?: 'PaginatedEducationEntity', nodes: Array<{ __typename?: 'EducationEntity', id: string, level: EducationLevel, url?: string | null, status: EducationStatus, image?: string | null, i18n: Array<{ __typename?: 'EducationTranslationLocale', locale: string, messages: { __typename?: 'EducationMessages', description: string, title: string } }>, organization?: { __typename?: 'OrganizationEntity', logo?: string | null, name: string, website?: string | null } | null, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'SkillEntity', id: string, slug?: string | null, i18n: Array<{ __typename?: 'SkillTranslationLocale', locale: string, messages: { __typename?: 'SkillMessages', title: string } }> }> | null }> } };

export type FindManyGroupedExperiencesQueryVariables = Exact<{
  experienceFilters?: InputMaybe<FilterExperienceInput>;
  experiencePagination?: InputMaybe<PaginationInput>;
  experienceSort?: InputMaybe<SortGroupedExperienceInput>;
}>;


export type FindManyGroupedExperiencesQuery = { __typename?: 'Query', findManyGroupedExperiences: { __typename?: 'PaginatedGroupedExperienceEntity', nodes: Array<{ __typename?: 'GroupedExperienceEntity', organization?: { __typename?: 'OrganizationEntity', id: string, logo?: string | null, name: string, website?: string | null } | null, experiences: Array<{ __typename?: 'ExperienceEntity', i18n: Array<{ __typename?: 'ExperienceTranslationLocale', locale: string, messages: { __typename?: 'ExperienceMessages', description: string, title: string } }>, period?: { __typename?: 'DateRangeEntity', from?: any | null, to?: any | null } | null, skills?: Array<{ __typename?: 'SkillEntity', id: string, slug?: string | null, i18n: Array<{ __typename?: 'SkillTranslationLocale', locale: string, messages: { __typename?: 'SkillMessages', title: string } }> }> | null }> }> } };

export type FindManyProjectsQueryVariables = Exact<{
  projectFilters?: InputMaybe<FilterProjectInput>;
  projectPagination?: InputMaybe<PaginationInput>;
  projectSort?: InputMaybe<SortProjectInput>;
}>;


export type FindManyProjectsQuery = { __typename?: 'Query', findManyProjects: { __typename?: 'PaginatedProjectEntity', nodes: Array<{ __typename?: 'ProjectEntity', id: string, slug?: string | null, images?: Array<string> | null, i18n: Array<{ __typename?: 'ProjectMessagesTranslationEntity', locale: string, messages: { __typename?: 'ProjectMessages', description: string, title: string } }>, skills?: Array<{ __typename?: 'SkillEntity', id: string, slug?: string | null, i18n: Array<{ __typename?: 'SkillTranslationLocale', locale: string, messages: { __typename?: 'SkillMessages', title: string } }> }> | null, urls?: Array<{ __typename?: 'UrlEntity', title: string, value: string }> | null }> } };

export type FindManySkillsQueryVariables = Exact<{
  skillFilters?: InputMaybe<FilterSkillInput>;
  skillPagination?: InputMaybe<PaginationInput>;
  skillSort?: InputMaybe<SortSkillInput>;
}>;


export type FindManySkillsQuery = { __typename?: 'Query', findManySkills: { __typename?: 'PaginatedSkillEntity', found: number, nodes: Array<{ __typename?: 'SkillEntity', id: string, slug?: string | null, category?: string | null, i18n: Array<{ __typename?: 'SkillTranslationLocale', locale: string, messages: { __typename?: 'SkillMessages', title: string } }> }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetMeDocument = new TypedDocumentString(`
    query GetMe {
  getMe {
    name
    avatar
    i18n {
      locale
      messages {
        title
        description
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetMeQuery, GetMeQueryVariables>;
export const FindManyCoursesDocument = new TypedDocumentString(`
    query FindManyCourses($courseFilters: FilterCourseInput, $coursePagination: PaginationInput, $courseSort: SortCourseInput) {
  findManyCourses(
    courseFilters: $courseFilters
    coursePagination: $coursePagination
    courseSort: $courseSort
  ) {
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
    `) as unknown as TypedDocumentString<FindManyCoursesQuery, FindManyCoursesQueryVariables>;
export const FindManyEducationsDocument = new TypedDocumentString(`
    query FindManyEducations($educationFilters: FilterEducationInput, $educationPagination: PaginationInput, $educationSort: SortEducationInput) {
  findManyEducations(
    educationFilters: $educationFilters
    educationPagination: $educationPagination
    educationSort: $educationSort
  ) {
    nodes {
      id
      level
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
      period {
        from
        to
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
    `) as unknown as TypedDocumentString<FindManyEducationsQuery, FindManyEducationsQueryVariables>;
export const FindManyGroupedExperiencesDocument = new TypedDocumentString(`
    query FindManyGroupedExperiences($experienceFilters: FilterExperienceInput, $experiencePagination: PaginationInput, $experienceSort: SortGroupedExperienceInput) {
  findManyGroupedExperiences(
    experienceFilters: $experienceFilters
    experiencePagination: $experiencePagination
    experienceSort: $experienceSort
  ) {
    nodes {
      organization {
        id
        logo
        name
        website
      }
      experiences {
        i18n {
          locale
          messages {
            description
            title
          }
        }
        period {
          from
          to
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
}
    `) as unknown as TypedDocumentString<FindManyGroupedExperiencesQuery, FindManyGroupedExperiencesQueryVariables>;
export const FindManyProjectsDocument = new TypedDocumentString(`
    query FindManyProjects($projectFilters: FilterProjectInput, $projectPagination: PaginationInput, $projectSort: SortProjectInput) {
  findManyProjects(
    projectFilters: $projectFilters
    projectPagination: $projectPagination
    projectSort: $projectSort
  ) {
    nodes {
      id
      slug
      images
      i18n {
        locale
        messages {
          description
          title
        }
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
      urls {
        title
        value
      }
    }
  }
}
    `) as unknown as TypedDocumentString<FindManyProjectsQuery, FindManyProjectsQueryVariables>;
export const FindManySkillsDocument = new TypedDocumentString(`
    query FindManySkills($skillFilters: FilterSkillInput, $skillPagination: PaginationInput, $skillSort: SortSkillInput) {
  findManySkills(
    skillFilters: $skillFilters
    skillPagination: $skillPagination
    skillSort: $skillSort
  ) {
    nodes {
      id
      slug
      category
      i18n {
        locale
        messages {
          title
        }
      }
    }
    found
  }
}
    `) as unknown as TypedDocumentString<FindManySkillsQuery, FindManySkillsQueryVariables>;