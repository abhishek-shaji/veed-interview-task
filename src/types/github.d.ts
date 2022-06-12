export interface GithubRepositoryDetails {
  id: number;
  name: string;
  html_url: string;
  full_name: string;
  description: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}

export interface GithubApiResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepositoryDetails[];
}

export interface FormattedRepositoryDetails {
  id: number;
  name: string;
  description: string;
  full_name: string;
  url: string;
  stars: number;
  watchers: number;
  forks: number;
}
