import { IGithubDataProvider, GithubRepoData, GithubEvent, GithubSummary } from "./IGithubDataProvider";
import axios, { AxiosRequestConfig } from 'axios';

interface GithubAPIIdentity {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
}

interface GithubAPIRepo {
  id: number;
  name: string;
  full_name: string;
  owner: GithubAPIIdentity;
  url: string;
  html_url: string;
  description: string;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  archived: boolean;
  open_issues_count: number;
  license: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

interface GitHubAPIRepoHeader {
  id: number;
  name: string;
  url: string;
}

interface GithubAPIPayload {
  action? : string;
}

interface GithubAPIEvent {
  id: string;
  type: string;
  actor: GithubAPIIdentity;
  repo: GitHubAPIRepoHeader;
  payload: GithubAPIPayload;
  created_at: string;
}

export class GithubAPIProvider implements IGithubDataProvider {
  
  private config: AxiosRequestConfig;

  constructor() {
    this.config = {
      headers: { Authorization: 'Token 2bbb035e31b353ca7f0773186a44c7d534fd3238' }
    };          
  }

  public UserData(githubUser: string): Promise<GithubSummary> {
    return new Promise<GithubSummary>((resolve, reject) => {
      let result = {events: [], repos: null};
      this.ReposForUser(githubUser).then((repos) => {
        result.repos = repos;        
        this.CommitHistory(githubUser).then((commits) => {
          result.events = commits;
          resolve(result);
        }).catch((error) => reject(error));
      }).catch((error) => reject(error));
    });
  }

  private CommitHistory(githubUser: string): Promise<GithubEvent[]> {
    return new Promise<GithubEvent[]>((resolve, reject) => {
      axios.get('https://api.github.com/users/' + githubUser + '/events', this.config).then((response) => {
        let events: GithubAPIEvent[] = response.data;
        resolve(events.map((evt) => 
        {
          return {
            eventDate: evt.created_at,
            eventRepo: evt.repo.name,
            eventType: evt.type
          };
        }));
      }).catch((error) => error.response && error.response.status == 404 ? resolve([]) : reject(error));
    });
  }

  private ReposForUser(githubUser: string): Promise<GithubRepoData[]> {
    return new Promise<GithubRepoData[]>((resolve, reject) => {
      axios.get('https://api.github.com/users/' + githubUser + '/repos', this.config).then((response) => {
        let repos: GithubAPIRepo[] = response.data;        
        resolve(repos.map((gar) => 
        {
          return {repoName: gar.name, isForked: gar.fork, lastCommit: gar.pushed_at, language: gar.language};
        }));
      }).catch((error) => error.response && error.response.status == 404 ? resolve([]) : reject(error));
    });
  }

}