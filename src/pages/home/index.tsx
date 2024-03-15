import React from 'react';

import BookList from '@components/home/bookList';
import SearchBar from '@components/home/searchBar';
import Header from '@components/home/header';
const index: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    console.log('Searching for: ', searchTerm);
  };

  return (
    <div>
      <SearchBar />
      <Header />
      <BookList />
    </div>
  );
};

export default index;
