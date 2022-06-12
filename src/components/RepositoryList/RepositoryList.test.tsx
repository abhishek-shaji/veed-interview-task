import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepositoryList } from '@/components/RepositoryList/RepositoryList';
import { FormattedRepositoryDetails } from '@/types/github';

const mockRepository: FormattedRepositoryDetails = {
  id: 1,
  name: 'test',
  full_name: 'test',
  url: 'test',
  description: 'test',
  stars: 1,
  forks: 1,
  watchers: 1,
};

describe('RepositoryList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <RepositoryList
        items={[]}
        favourites={[]}
        toggleFavourite={() => {}}
        isLoading={false}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with loading', () => {
    const { container } = render(
      <RepositoryList
        items={[]}
        favourites={[]}
        toggleFavourite={() => {}}
        isLoading
      />,
    );

    const element = screen.getByTestId('loading-spinner');

    expect(container).toContainElement(element);

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with repositories', () => {
    const { container } = render(
      <RepositoryList
        items={[mockRepository]}
        favourites={[]}
        toggleFavourite={() => {}}
        isLoading={false}
      />,
    );

    const element = screen.getByTestId('repository-list-item');

    expect(container).toContainElement(element);

    expect(container).toMatchSnapshot();
  });
});
