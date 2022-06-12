import {
  FormattedRepositoryDetails,
  GithubRepositoryDetails,
} from '@/types/github';

export const formatRepoDetails = ({
  id,
  name,
  full_name,
  html_url,
  description,
  forks_count,
  stargazers_count,
  watchers_count,
}: GithubRepositoryDetails): FormattedRepositoryDetails => ({
  id,
  name,
  description,
  full_name,
  url: html_url,
  stars: stargazers_count,
  watchers: watchers_count,
  forks: forks_count,
});
