import { GithubRepoData, GithubEvent } from "../../../integration/IGithubDataProvider";

export interface IGithubProfileState {  
  fullName: string;
  githubUserName: string;
  repos: GithubRepoData[];
  events: GithubEvent[];
  loading: boolean;
} 