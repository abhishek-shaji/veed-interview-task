import { NextPageContext } from 'next';
import { Component } from 'react';

import { Layout } from '@/components/Layout';
import { Banner } from '@/partials/Banner';
import { PageError } from '@/partials/PageError';
import { RepositoryList } from '@/components/RepositoryList';
import { api } from '@/utils/api';
import { FormattedRepositoryDetails } from '@/types/github';

interface FavouritesStateType {
  query: string;
  isLoading: boolean;
  repositories: FormattedRepositoryDetails[];
  error?: string;
  favourites: string[];
}

class Favourites extends Component<NextPageContext, FavouritesStateType> {
  state: FavouritesStateType = {
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
      this.fetchFavouriteRepositories,
    );
  };

  fetchFavouriteRepositories = async () => {
    try {
      this.setState({
        isLoading: true,
      });

      const response = await api.get('/favourites', {
        params: { names: this.state.favourites },
      });

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
  };

  removeFromFavourite = (id: string) => {
    const { favourites } = this.state;

    return this.setState(
      {
        favourites: favourites.filter(
          (favourite) => favourite !== id.toString(),
        ),
      },
      () => {
        this.saveFavouritesToLocalStorage();
        this.fetchFavouriteRepositories();
      },
    );
  };

  saveFavouritesToLocalStorage = () => {
    localStorage.setItem('favourites', JSON.stringify(this.state.favourites));
  };

  render() {
    const { isLoading, repositories, error, favourites } = this.state;

    return (
      <Layout>
        {error && <PageError message={error} />}
        {repositories && !error && (
          <>
            <Banner
              title="Your favourite repositories"
              description="List of your favourite repositories"
            />
            <RepositoryList
              items={repositories}
              isLoading={isLoading}
              toggleFavourite={this.removeFromFavourite}
              favourites={favourites}
            />
          </>
        )}
      </Layout>
    );
  }
}

export default Favourites;
