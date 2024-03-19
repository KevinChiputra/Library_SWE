import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import { Book } from '@models/books/types';

import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';

const tableHeader = ['Image', 'Number', 'Name', 'Description', 'Delete'];

const Books: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const handleDetail = (id: number) => {
    navigate(`/books/${id}`);
  };

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.books.clear());
    };
  }, []);

  // Set Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const indexOfLastProduct = currentPage * booksPerPage;
  const indexOfFirstProduct = indexOfLastProduct - booksPerPage;
  const currentbooks = state?.books?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleDelete = (event: React.MouseEvent, book: Book) => {
    event.stopPropagation();
    dispatch(command.books.remove(book));
  };

  return (
    <>
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
            {currentbooks?.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  cursor: 'pointer',
                  // backgroundColor:
                  //   row.id % 2 === 0
                  //     ? 'rgba(47, 51, 73, 0.95)'
                  //     : theme.palette.action.hover,
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
        {state?.books && ( // Penambahan pengecekan
          <Pagination
            sx={{ marginY: '1rem' }}
            count={Math.ceil(state.books.length / booksPerPage)}
            color="primary"
            onChange={(_, page) => setCurrentPage(page)}
          />
        )}
      </TableContainer>
    </>
  );
};

export default Books;
