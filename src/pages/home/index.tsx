import React from 'react';

import BookList from '@components/home/book-list';
import Header from '@components/home/header';
import SearchBar from '@components/home/search-bar';

const index: React.FC = () => {
  return (
    <div>
      <SearchBar />
      <Header />
      <BookList />
    </div>
  );
};

export default index;
