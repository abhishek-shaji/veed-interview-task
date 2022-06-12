import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepositoriesByNames } from '@/services/githubService';
import { FormattedRepositoryDetails } from '@/types/github';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormattedRepositoryDetails[]>,
) {
  const { names }: any = req.query;

  const repos = await getRepositoriesByNames(
    typeof names === 'string' ? [names] : names,
  );

  res.status(200).json(repos);
}
