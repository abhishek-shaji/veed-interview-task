import React from 'react';
import Link from 'next/link';

const Header = () => (
  <header className="fixed top-0 left-0 border-b border-slate-200 w-full bg-white z-50">
    <div className="container mx-auto">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center">
          <Link href="/" passHref>
            <a className="text-2xl font-bold text-gray-900">Veed.io</a>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/favourites" passHref>
            <a className="text-gray-700 py-2 px-6">Favourites</a>
          </Link>
          <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full">
            Sign in
          </button>
          <button className="bg-gray-200 text-gray-700 py-2 px-6 ml-4 rounded-full">
            Sign up
          </button>
        </div>
      </div>
    </div>
  </header>
);

export { Header };
