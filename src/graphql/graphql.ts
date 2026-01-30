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

export type CreateProjectInput = {
  i18n: Array<CreateProjectTranslationLocaleInput>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug: Scalars['String']['input'];
  urls?: InputMaybe<Array<CreateProjectUrlInput>>;
};

export type CreateProjectTranslationInput = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProjectTranslationLocaleInput = {
  locale: Scalars['String']['input'];
  messages: CreateProjectTranslationInput;
};

export type CreateProjectUrlInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateSkillInput = {
  category: Scalars['String']['input'];
  color?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<CreateUserUrlInput>>;
  work?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserUrlInput = {
  title: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Array<Project>;
  createSkill: Array<Skill>;
  createUser: User;
  removeProject: Array<Project>;
  removeSkill: Array<Skill>;
  removeUser: User;
  signIn: Scalars['String']['output'];
  updateProject: Project;
  updateSkill: Skill;
  updateUser: User;
};


export type MutationCreateProjectArgs = {
  createProjectInput: Array<CreateProjectInput>;
};


export type MutationCreateSkillArgs = {
  createSkillInput: Array<CreateSkillInput>;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationRemoveProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveSkillArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  signInInput: SignInInput;
};


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateSkillArgs = {
  updateSkillInput: UpdateSkillInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['DateTime']['output'];
  i18n: Array<ProjectTranslationLocale>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  skills?: Maybe<Array<Skill>>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<ProjectUrl>>;
};

export type ProjectTranslation = {
  __typename?: 'ProjectTranslation';
  description: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProjectTranslationLocale = {
  __typename?: 'ProjectTranslationLocale';
  locale: Scalars['String']['output'];
  messages: ProjectTranslation;
};

export type ProjectUrl = {
  __typename?: 'ProjectUrl';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllProjects: Array<Project>;
  findAllSkills: Array<Skill>;
  findAllUsers: Array<User>;
  findOneProjectById: Project;
  findOneSkillById: Skill;
  findOneUserById: User;
  getMe: User;
};


export type QueryFindOneProjectByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneSkillByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindOneUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Skill = {
  __typename?: 'Skill';
  category: Scalars['String']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateProjectInput = {
  i18n?: InputMaybe<Array<CreateProjectTranslationLocaleInput>>;
  id: Scalars['ID']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<CreateProjectUrlInput>>;
};

export type UpdateSkillInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  nickname?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  school?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  urls?: InputMaybe<Array<CreateUserUrlInput>>;
  work?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  birth?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  school?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  urls?: Maybe<Array<UserUrl>>;
  work?: Maybe<Scalars['String']['output']>;
};

export type UserUrl = {
  __typename?: 'UserUrl';
  title: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type FindOneUserByIdQueryVariables = Exact<{
  findOneUserByIdId: Scalars['ID']['input'];
}>;


export type FindOneUserByIdQuery = { __typename?: 'Query', findOneUserById: { __typename?: 'User', id: string, address?: string | null, school?: string | null, title?: string | null, updatedAt: any, work?: string | null, avatar?: string | null, birth?: string | null, email: string, name: string, nickname: string, phone?: string | null, role: string, urls?: Array<{ __typename?: 'UserUrl', title: string, value: string }> | null } };

export type FindAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProjectsQuery = { __typename?: 'Query', findAllProjects: Array<{ __typename?: 'Project', id: string, images?: Array<string> | null, slug: string, i18n: Array<{ __typename?: 'ProjectTranslationLocale', locale: string, messages: { __typename?: 'ProjectTranslation', description: string, title: string } }>, skills?: Array<{ __typename?: 'Skill', id: string, category: string, color?: string | null, slug: string, title: string }> | null, urls?: Array<{ __typename?: 'ProjectUrl', title: string, value: string }> | null }> };

export type FindAllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllSkillsQuery = { __typename?: 'Query', findAllSkills: Array<{ __typename?: 'Skill', id: string, category: string, color?: string | null, slug: string, title: string }> };

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

export const FindOneUserByIdDocument = new TypedDocumentString(`
    query findOneUserById($findOneUserByIdId: ID!) {
  findOneUserById(id: $findOneUserByIdId) {
    id
    address
    school
    title
    updatedAt
    urls {
      title
      value
    }
    work
    avatar
    birth
    email
    name
    nickname
    phone
    role
  }
}
    `) as unknown as TypedDocumentString<FindOneUserByIdQuery, FindOneUserByIdQueryVariables>;
export const FindAllProjectsDocument = new TypedDocumentString(`
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
      id
      category
      color
      slug
      title
    }
    slug
    urls {
      title
      value
    }
  }
}
    `) as unknown as TypedDocumentString<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export const FindAllSkillsDocument = new TypedDocumentString(`
    query findAllSkills {
  findAllSkills {
    id
    category
    color
    slug
    title
  }
}
    `) as unknown as TypedDocumentString<FindAllSkillsQuery, FindAllSkillsQueryVariables>;