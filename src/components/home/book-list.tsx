/* eslint-disable sort-keys */
import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

import { useCommand, useStore } from '@models/store';

const itemsPerPage = 6; // Jumlah item per halaman

const BookList: React.FC = () => {
  const [page, setPage] = useState(1); // State untuk halaman aktif

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Menghitung indeks awal dan akhir untuk item yang akan ditampilkan pada halaman saat ini
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const books = useMemo(() => state?.books, [state]);

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.books.clear());
    };
  }, []);

  return (
    <div style={{ marginTop: '12px' }}>
      <Grid container={true} spacing={3}>
        {books?.slice(startIndex, endIndex).map((book, index) => (
          <Grid item={true} key={index} md={4} sm={6} xs={12}>
            <Card style={{ height: '  100%' }}>
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
                  height: '10rem'
                }}>
                <Typography sx={{ mb: 2 }} variant="h5">
                  {book.title}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Rp {book.publication_year}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {book.description}
                </Typography>
              </CardContent>
              <Button
                sx={{
                  py: 2.5,
                  width: '100%',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0
                }}
                variant="contained">
                Add To Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Pagination
          color="primary"
          count={Math.ceil((books ? books.length : 0) / itemsPerPage)} // Jumlah halaman dihitung berdasarkan jumlah total buku dan item per halaman
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

BookList.displayName = 'BookList';
export default BookList;
