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
  useTheme
} from '@components/material.js';

import { useCommand, useStore } from '@models/store.js';
import { Book } from '@models/books/types';

import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';

import AddButton from '@components/button/add-btn';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase
} from '@components/home/search-bar';
import Filter from '@components/home/filter';

const tableHeader = ['Image', 'Number', 'Name', 'Description', 'Delete'];
const booksPerPage = 10;

const Books: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const books = useMemo(() => state?.books, [state]);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books!);

  const handleDetail = (id: number) => {
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });
  }, []);

  // ===== SET PAGINATION =====
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * booksPerPage;
  const startIndex = lastIndex - booksPerPage;

  // ===== HANDLE DELETE BOOK =====
  const handleDelete = (event: React.MouseEvent, book: Book) => {
    event.stopPropagation();
    dispatch(command.books.remove(book));
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
      {/* SEARCH BAR */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginY: '1rem'
        }}>
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
                fontSize: '12px'
              }
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
            alignItems: 'center'
          }}>
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
                    }>
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
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover
                      }
                    }}
                    onClick={() => handleDetail(row.id)}>
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
                      <DeleteIcon
                        sx={{
                          color: 'grey',
                          cursor: 'pointer',
                          '&:hover': {
                            color: '#B90E0A'
                          }
                        }}
                        onClick={(event) => handleDelete(event, row)}
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
             * Jika filteredBooks tidak ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total books
             * Jika books tidak ditemukan, maka jumlah halaman dihitung berdasarkan 0
             * Jika filteredBooks ditemukan, maka jumlah halaman dihitung berdasarkan jumlah total filteredBooks
             */
            count={Math.ceil(
              (filteredBooks === undefined
                ? books?.length!
                : books === undefined
                ? 0
                : filteredBooks.length) / booksPerPage
            )}
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
