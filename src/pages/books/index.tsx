import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@components/material.js';

import { useCommand, useStore } from '@models/store.js';
import { Book } from '@models/books/types';

import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

import Pagination from '@mui/material/Pagination';

import AddButton from '@components/button/add-btn';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '@components/home/search-bar';
import Filter from '@components/home/filter';
import toast, { Toaster } from 'react-hot-toast';

const tableHeader = [
  'Image',
  'Number',
  'Name',
  'Description',
  'Detail',
  'Delete',
];
const booksPerPage = 10;

const Books: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const books = useMemo(() => state?.books, [state]);

  const [filteredBooks, setFilteredBooks] = useState<Book[] | undefined>(
    books!
  );

  const handleDetail = (id: number) => {
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    if (!books?.length) {
      dispatch(command.books.load()).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, []);

  // ===== SET PAGINATION =====
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * booksPerPage;
  const startIndex = lastIndex - booksPerPage;

  // ===== HANDLE DELETE BOOK =====
  const handleDelete = (book: Book) => {
    dispatch(command.books.remove(book));
    setFilteredBooks(undefined);
    toast.error('Data Deleted!');
  };

  // ===== SEARCHING BOOKS BY TITLE =====
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (query.trim() === '') {
      setFilteredBooks(books!);
    } else {
      filterItems(query, 'title');
    }
  };

  // ========== FILTER BY GENRE =============
  const handleFilterChange = (newFilter: string) => {
    if (!newFilter) {
      setFilteredBooks(books!);
    } else {
      filterItems(newFilter, 'genre');
      toast.success('Filter Applied!');
    }
  };

  const filterItems = (query: string, property: string) => {
    const filtered = books?.filter((book: Book) =>
      book[property].toString().toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered!);
  };

  return (
    <>
      <Toaster position="top-right" />
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

      {filteredBooks?.length === 0 ? (
        // ! Menampilkan pesan jika tidak ada buku yang ditemukan
        <Grid item={true}>
          <Typography color="red" variant="h5">
            No books found
          </Typography>
        </Grid>
      ) : (
        // {/* TABLE DATA */}
        <TableContainer
          component={Paper}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Table sx={{ minWidth: 500 }}>
            {/* TABLE HEADER */}
            <TableHead>
              <TableRow>
                {tableHeader.map((header, index) => (
                  <TableCell
                    key={index}
                    width={header == 'Image' ? 200 : undefined}
                    align={
                      header == ('Description' || 'Delete') ? 'left' : 'center'
                    }
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* TABLE CONTENT / BODY */}
            <TableBody>
              {(filteredBooks === undefined ? books : filteredBooks)
                ?.slice(startIndex, lastIndex)
                .map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <img
                        src={row.cover_image}
                        alt=""
                        css={{ width: '100% ', borderRadius: '4px' }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {index + (currentPage - 1) * 10 + 1}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="center">
                      <VisibilityRoundedIcon
                        sx={{
                          color: 'grey',
                          cursor: 'pointer',
                          '&:hover': {
                            color: theme.palette.primary.main,
                          },
                        }}
                        onClick={() => handleDetail(row.id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{
                          color: 'grey',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#B90E0A',
                          },
                        }}
                        onClick={() => handleDelete(row)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <Pagination
            sx={{ marginY: '1rem' }}
            // Jumlah halaman dihitung berdasarkan jumlah total filteredBooks dan item per halaman
            /*
             * Jika books tidak ditemukan, maka jumlah halaman dihitung 0
             * Jika filteredBooks tidak ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total books
             * Jika filteredBooks ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total filteredBooks
             */
            count={
              books !== undefined
                ? Math.ceil(
                    (filteredBooks === undefined
                      ? books?.length!
                      : filteredBooks.length) / booksPerPage
                  )
                : 0
            }
            color="primary"
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
          />
        </TableContainer>
      )}
    </>
  );
};

export default Books;
