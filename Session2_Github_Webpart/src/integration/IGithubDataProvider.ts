
export interface GithubRepoData {
  repoName: string;
  isForked: boolean;
  lastCommit: string;
  language: string;
}

export interface GithubEvent {
  eventDate: string;
  eventRepo: string;
  eventType: string;
}

export interface GithubSummary {
  events: GithubEvent[];
  repos: GithubRepoData[];
}

export interface IGithubDataProvider {
  UserData(githubUser: string): Promise<GithubSummary>;  
}