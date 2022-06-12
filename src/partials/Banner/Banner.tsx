import React from 'react';

import { InputGroup } from '@/components/InputGroup/InputGroup';

interface BannerPropType {
  title: string;
  description: string;
  query?: string;
  onQueryChange?: (value: string) => void;
}

const Banner = ({
  title,
  description,
  onQueryChange,
  query = '',
}: BannerPropType) => (
  <div className="bg-slate-200 py-24">
    <div className="container mx-auto">
      <div>
        <h1 className="text-4xl font-bold mb-3 md:display-lg md:mb-5">
          {title}
        </h1>
        <p className="text-base text-gray-700 md:text-xl">{description}</p>
      </div>
      {onQueryChange && (
        <div className="flex items-end w-full pt-5">
          <div className="w-96">
            <InputGroup
              label="Search"
              placeholder="Search by language..."
              onChange={(e) => onQueryChange(e.target.value)}
              value={query}
            />
          </div>
        </div>
      )}
    </div>
  </div>
);

export { Banner };
