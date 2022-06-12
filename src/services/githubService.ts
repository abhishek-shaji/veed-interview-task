import axios from 'axios';
import { AxiosResponse } from 'axios';
import qs from 'qs';
import { FormattedRepositoryDetails, GithubApiResponse } from '@/types/github';
import { subDays } from 'date-fns';

import { formatRepoDetails } from '@/formatters/formatRepoDetails';

export const axiosClient = axios.create({
  baseURL: 'https://api.github.com',
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat', encode: false }),
});

export const getPopularRepos = async (
  language?: string,
  dateFrom: Date = subDays(new Date(), 7),
): Promise<FormattedRepositoryDetails[]> => {
  const { data }: AxiosResponse<GithubApiResponse> = await axiosClient.get(
    '/search/repositories',
    {
      params: {
        sort: 'stars',
        order: 'desc',
        type: 'Repositories',
        q: `stars:>1${
          language ? `+language:${language}` : ''
        }+created:>=${dateFrom.toISOString()}`,
      },
    },
  );

  return data.items.map(formatRepoDetails);
};

export const getRepositoriesByNames = async (
  repoNames: string[] = [],
): Promise<FormattedRepositoryDetails[]> => {
  console.log(repoNames);
  if (!repoNames.length) {
    return [];
  }

  const { data }: AxiosResponse<GithubApiResponse> = await axiosClient.get(
    '/search/repositories',
    {
      params: {
        sort: 'stars',
        order: 'desc',
        type: 'Repositories',
        q: `repo:${repoNames
          .map((name: string) => `+repo:${encodeURIComponent(name)}`)
          .join('')}`,
      },
    },
  );

  return data.items.map(formatRepoDetails);
};
