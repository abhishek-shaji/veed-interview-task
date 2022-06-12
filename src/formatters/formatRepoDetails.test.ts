import { GithubRepositoryDetails } from '@/types/github';
import { formatRepoDetails } from './formatRepoDetails';

describe('formatRepoDetails', () => {
  it('should return a formatted repository details', () => {
    const githubRepositoryDetails: GithubRepositoryDetails = {
      id: 1234,
      name: 'test',
      full_name: 'test/test',
      html_url: 'https://example.com',
      description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      forks_count: 1,
      stargazers_count: 2,
      watchers_count: 3,
    };

    expect(formatRepoDetails(githubRepositoryDetails)).toEqual({
      id: 1234,
      name: 'test',
      description: 'lorem ipsum dolor sit amet consectetur adipiscing elit',
      full_name: 'test/test',
      url: 'https://example.com',
      stars: 2,
      watchers: 3,
      forks: 1,
    });
  });
});
