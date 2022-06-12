import type { NextApiRequest, NextApiResponse } from 'next';
import { getPopularRepos } from '@/services/githubService';
import { FormattedRepositoryDetails } from '@/types/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormattedRepositoryDetails[]>,
) {
  const { language }: any = req.query;

  const repos = await getPopularRepos(language);

  res.status(200).json(repos);
}
