import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useCommand, useStore } from '@models/store';

import Header from './header';
import toast from 'react-hot-toast';

const booksPerPage = 6;

const BookList: React.FC = () => {
  const [recommendedPage, setRecommendedPage] = useState(1);

  const handleRecommendedPageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setRecommendedPage(value);
  };

  const recommendedStartIndex = (recommendedPage - 1) * booksPerPage;
  const recommendedLastIndex = recommendedStartIndex + booksPerPage;

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const books = useMemo(() => state?.books, [state]);

  useEffect(() => {
    if (!books?.length) {
      dispatch(command.books.load()).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, []);

  const recommendedBooks = useMemo(() => {
    return books || [];
  }, [books]);

  const handleAddToCart = (book: any) => {
    dispatch(command.cart.addToCart(book));
    toast.success('Successfully added to cart');
  };

  return (
    <div style={{ marginTop: '12px' }}>
      <Grid container={true} spacing={3}>
        <Grid item xs={12}>
          <Header title="Recommended Books" />
        </Grid>

        {recommendedBooks
          .slice(recommendedStartIndex, recommendedLastIndex)
          .map((book, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Card style={{ height: '100%' }}>
                <CardMedia
                  alt="pic"
                  component="img"
                  image={book.cover_image}
                  sx={{ height: '9.375rem' }}
                  title="Picture"
                />
                <CardContent
                  sx={{
                    p: (theme) => `${theme.spacing(3, 5.25, 4)} !important`,
                    height: '10rem',
                  }}
                >
                  <Typography sx={{ mb: 2 }} variant="h5">
                    {book.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>by : {book.author}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {book.description}
                  </Typography>
                </CardContent>
                <Button
                  sx={{
                    py: 2.5,
                    width: '100%',
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  }}
                  onClick={() => handleAddToCart(book)}
                  variant="contained"
                >
                  Add To Cart
                </Button>
              </Card>
            </Grid>
          ))}

        <Grid item xs={12}>
          <div
            style={{
              marginTop: '1em',
              marginBottom: '1em',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              color="primary"
              count={Math.ceil(recommendedBooks.length / booksPerPage)}
              page={recommendedPage}
              onChange={handleRecommendedPageChange}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

BookList.displayName = 'BookList';
export default BookList;
