import React, { useEffect, useMemo, useState } from 'react';
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
import Filter from './filter';

const itemsPerPage = 6; // Jumlah item per halaman

const BookList: React.FC = () => {
  const [page, setPage] = useState(1); // State untuk halaman aktif
  const [recommendedPage, setRecommendedPage] = useState(1);

  // Fungsi untuk menangani perubahan halaman pada books
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Fungsi untuk menangani perubahan halaman pada recommended books
  const handleRecommendedPageChange = (
    _: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setRecommendedPage(value);
  };

  // Menghitung indeks awal dan akhir untuk item yang akan ditampilkan pada halaman saat ini pada books
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Menghitung indeks awal dan akhir untuk item yang akan ditampilkan saat ini pada halaman recommended books
  const recommendedStartIndex = (recommendedPage - 1) * itemsPerPage;
  const recommendedEndIndex = recommendedStartIndex + itemsPerPage;

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const books = useMemo(() => state?.books, [state]);

  // ===== SEARCHING BOOKS by TITLE =====
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books || []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.trim() === '') {
      setFilteredBooks([]);
    } else {
      filterItems(query);
    }
  };

  const filterItems = (query: string) => {
    const filtered = books?.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    setFilteredBooks(filtered!);
  };

  //cek kondisi ketika search kosong setelah setiap karakter dihapus
  useEffect(() => {
    if (filteredBooks.length === 0 && page !== 1) {
      setPage(1);
    }
  }, [filteredBooks, page]);
  // ===================================

  // ==========FILTER GENRE=============
  const [filteredBooksByGenre, setFilteredBooksByGenre] = useState<Book[]>([]);

  const handleFilterChange = (newFilter: string) => {
    if (!newFilter) {
      setFilteredBooksByGenre([]);
    } else {
      const filtered = books?.filter((book) =>
        book.genre.includes(newFilter.toLocaleLowerCase())
      );
      setFilteredBooksByGenre(filtered || []);
    }
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

  // Recommended Books
  const recommendedBooks = useMemo(() => {
    // Ambil 24 buku pertama dari data yang ada di API
    return books?.slice(0, 24) || [];
  }, [books]);

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
            placeholder="Search title here…"
            sx={{
              '& ::placeholder': {
                fontSize: '12px',
              },
            }}
          />
        </Search>
        <Filter books={books || []} onFilterChange={handleFilterChange} />
        <AddButton />
      </Stack>

      {/* SHOW SEARCH ITEM */}
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

      {/* SHOW RECOMMENDED BOOKS */}
      {recommendedBooks.length > 0 && (
        <>
          <Grid container={true} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h5" gutterBottom>
                Recommended Books
              </Typography>
            </Grid>
            {recommendedBooks
              .slice(recommendedStartIndex, recommendedEndIndex)
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
                  count={Math.ceil(recommendedBooks.length / itemsPerPage)}
                  page={recommendedPage}
                  onChange={handleRecommendedPageChange}
                />
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

BookList.displayName = 'BookList';
export default BookList;
