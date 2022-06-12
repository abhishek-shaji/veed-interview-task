import React from 'react';

import { FormattedRepositoryDetails } from '@/types/github';
import { DatabaseIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { LoadingSpinner } from '@/components/Icons/LoadingSpinner';

interface CompanyListPropType {
  items: FormattedRepositoryDetails[];
  isLoading?: boolean;
  toggleFavourite: (id: string) => any;
  favourites: string[];
}

const RepositoryList = ({
  items,
  isLoading,
  favourites,
  toggleFavourite,
}: CompanyListPropType) => {
  if (isLoading) {
    return (
      <div className="container flex justify-center py-12 mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between my-5 py-3 mb-10 border-b border-slate-200">
        <h2 className="text-lg font-semibold">{items.length} Repositories</h2>
      </div>
      {items.map(
        ({
          id,
          name,
          full_name,
          url,
          description,
          stars,
          forks,
        }: FormattedRepositoryDetails) => (
          <a
            href={url}
            className="block border-b border-slate-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all"
            key={id}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center my-5">
                <DatabaseIcon
                  className="w-20 h-20 rounded object-cover text-slate-600"
                  strokeWidth={1}
                />
                <div className="ml-2">
                  <div className="font-bold capitalize">{name}</div>
                  <div className="opacity-75 text-sm capitalize mb-1">
                    {description || 'No description'}
                  </div>
                  <div className="opacity-75 text-xs capitalize">
                    Stars: {stars}
                  </div>
                  <div className="opacity-75 text-xs capitalize">
                    Forks: {forks}
                  </div>
                </div>
              </div>
              <button
                className="text-sm text-slate-500 mr-6"
                onClick={(e) => {
                  e.preventDefault();

                  toggleFavourite(full_name);
                }}
              >
                <StarIcon
                  className={`h-8 w-8 rounded object-cover ${
                    favourites.includes(full_name)
                      ? 'text-amber-500 hover:text-amber-600'
                      : 'text-slate-300 hover:text-slate-600'
                  }`}
                />
              </button>
            </div>
          </a>
        ),
      )}
    </div>
  );
};

export { RepositoryList };
