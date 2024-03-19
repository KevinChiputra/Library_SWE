import { useEffect, useMemo, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';

import { useCommand, useStore } from '@models/store';

import AddButton from './add-book';
import { Search, SearchIconWrapper, StyledInputBase } from './search-bar';
import { Book } from '@models/books/types';

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

  // ===== SEARCHING BOOKS by TITLE =====
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books!);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    filterItems(query);
  };

  const filterItems = (query: string) => {
    const filtered = books?.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    setFilteredBooks(filtered!);
  };
  // ===================================

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.books.clear());
    };
  }, []);

  console.log('ini books', books);
  return (
    <div style={{ marginTop: '12px' }}>
      {/* SEARCH BAR */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginY: '1rem',
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            onChange={handleSearchChange}
            inputProps={{ 'aria-label': 'search' }}
            placeholder="Find your book here…"
          />
        </Search>
        <AddButton />
      </Stack>

      {/* BOOK LIST */}
      <Grid container={true} spacing={3}>
        {/*
          // ! Menampilkan pesan jika tidak ada buku yang ditemukan
        */}
        {filteredBooks?.length === 0 && (
          <Grid item={true}>
            <Typography color="red" variant="h5">
              No books found
            </Typography>
          </Grid>
        )}

        {/* MAPPING BOOKS */}
        {(filteredBooks === undefined ? books : filteredBooks)
          ?.slice(startIndex, endIndex)
          .map((book, index) => (
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
      </Grid>

      {/* PAGINATION */}
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
          // Jumlah halaman dihitung berdasarkan jumlah total filteredBooks dan item per halaman
          /*
           * Jika filteredBooks tidak ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total books
           * Jika books tidak ditemukan, maka jumlah halaman dihitung berdasarkan 0
           * Jika filteredBooks ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total filteredBooks
           */
          count={Math.ceil(
            (filteredBooks === undefined
              ? books?.length!
              : books === undefined
              ? 0
              : filteredBooks.length) / itemsPerPage
          )}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

BookList.displayName = 'BookList';
export default BookList;
