import type { PageComponent } from '@nxweb/react';
import { Toaster } from 'react-hot-toast';
import BookList from '@components/home/book-list';
import Carousel from '@components/home/carousel';

const Home: PageComponent = () => {
  return (
    <div>
      <Toaster position="top-right" />
      <Carousel direction={'ltr'} />
      <BookList />
    </div>
  );
};

export default Home;
