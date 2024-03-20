import type { PageComponent } from '@nxweb/react';

import BookList from '@components/home/book-list';
import Carousel from '@components/home/carousel';

const Home: PageComponent = () => {
  return (
    <div>
      <Carousel direction={'ltr'} />
      <BookList />
    </div>
  );
};

export default Home;
