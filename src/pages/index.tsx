import { NextPageContext } from 'next';
import { Component } from 'react';
import debounce from 'lodash/debounce';

import { Layout } from '@/components/Layout';
import { Banner } from '@/partials/Banner';
import { PageError } from '@/partials/PageError';
import { RepositoryList } from '@/components/RepositoryList';
import { api } from '@/utils/api';
import { FormattedRepositoryDetails } from '@/types/github';

interface HomeStateType {
  query: string;
  isLoading: boolean;
  repositories: FormattedRepositoryDetails[];
  error?: string;
  favourites: string[];
}

class Home extends Component<NextPageContext, HomeStateType> {
  state: HomeStateType = {
    isLoading: true,
    repositories: [],
    query: '',
    favourites: [],
  };

  async componentDidMount() {
    await this.initialize();
  }

  initialize = async () => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    this.setState(
      {
        favourites,
      },
      this.fetchRepositories,
    );
  };

  fetchRepositories = debounce(async (language?: string) => {
    try {
      this.setState({
        isLoading: true,
      });

      const response = await api.get(
        `/popular-repositories${language ? `?language=${language}` : ''}`,
      );

      this.setState({
        isLoading: false,
        repositories: response.data,
      });
    } catch (error) {
      console.log(error);

      this.setState({
        isLoading: false,
        repositories: [],
        error: 'Failed to load repositories',
      });
    }
  }, 1000);

  handleQueryChange = (query: string) => {
    this.setState(
      {
        query,
      },
      () => this.fetchRepositories(this.state.query),
    );
  };

  toggleFavourite = (id: string) => {
    const { favourites } = this.state;

    if (favourites.includes(id)) {
      return this.setState(
        {
          favourites: favourites.filter(
            (favourite) => favourite !== id.toString(),
          ),
        },
        this.saveFavouritesToLocalStorage,
      );
    }

    return this.setState(
      {
        favourites: [...favourites, id.toString()],
      },
      this.saveFavouritesToLocalStorage,
    );
  };

  saveFavouritesToLocalStorage = () => {
    localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
  };

  render() {
    const { query, isLoading, repositories, error, favourites } = this.state;

    return (
      <Layout>
        {error && <PageError message={error} />}
        {repositories && !error && (
          <>
            <Banner
              title="Popular Github Repositories"
              description="Popular github repositories created in the last 7 days"
              query={query}
              onQueryChange={this.handleQueryChange}
            />
            <RepositoryList
              items={repositories}
              isLoading={isLoading}
              toggleFavourite={this.toggleFavourite}
              favourites={favourites}
            />
          </>
        )}
      </Layout>
    );
  }
}

export default Home;
