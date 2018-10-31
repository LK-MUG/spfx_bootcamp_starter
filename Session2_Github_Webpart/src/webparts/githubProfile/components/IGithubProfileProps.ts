import { IGithubDataProvider } from "../../../integration/IGithubDataProvider";

export interface IGithubProfileProps {
  githubUserName: string;
  userFullName: string;
  githubDataProvider: IGithubDataProvider;
}
