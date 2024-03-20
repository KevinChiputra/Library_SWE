import type { PageComponent } from '@nxweb/react';
import { Toaster } from 'react-hot-toast';
import BookList from '@components/home/book-list';
import Carousel from '@components/home/carousel';

const Home: PageComponent = () => {
  return (
    <div>
      <Carousel direction={'ltr'} />
      <Toaster position="top-right" />
      <BookList />
    </div>
  );
};

export default Home;
