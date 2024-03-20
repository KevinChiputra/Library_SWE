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

const booksPerPage = 6;

const BookList: React.FC = () => {
  const [recommendedPage, setRecommendedPage] = useState(1);

  // Fungsi untuk menangani perubahan halaman pada recommended books
  const handleRecommendedPageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setRecommendedPage(value);
  };

  // Menghitung indeks awal dan akhir untuk item yang akan ditampilkan saat ini pada halaman recommended books
  const recommendedStartIndex = (recommendedPage - 1) * booksPerPage;
  const recommendedLastIndex = recommendedStartIndex + booksPerPage;

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const books = useMemo(() => state?.books, [state]);

  //cek kondisi ketika search kosong setelah setiap karakter dihapus
  // useEffect(() => {
  //   if (filteredBooks.length === 0 && page !== 1) {
  //     setPage(1);
  //   }
  // }, [filteredBooks, page]);
  // ===================================

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.books.clear());
    };
  }, []);

  // Recommended Books
  const recommendedBooks = useMemo(() => {
    // Ambil 24 buku pertama dari data yang ada di API
    return books?.slice(0, 24) || [];
  }, [books]);

  return (
    <div style={{ marginTop: '12px' }}>
      <Grid container={true} spacing={3}>
        {/* HEADER */}
        <Grid item md={12}>
          <Header title="Recommended Books" />
        </Grid>

        {/* BOOKS MAPPING */}
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
                  variant="contained"
                >
                  Add To Cart
                </Button>
              </Card>
            </Grid>
          ))}

        {/* PAGINATION */}
        <Grid item md={12}>
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
