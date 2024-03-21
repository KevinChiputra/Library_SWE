import type { MouseEvent, ReactEventHandler } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import { Book } from '@models/books/types';

import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
import { toast } from 'react-hot-toast';

const Books: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [id, setId] = useState<number | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };

  const handleClose = () => {
    setId(null);
    setAnchorEl(null);
  };

  const handleDetail = (id: number) => {
    navigate(`/products/${id}`);
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
    toast.error('Item Deleted!');
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
          alignItems: 'center',
          paddingBottom: '1rem',
        }}
      >
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={200}>
                Image
              </TableCell>
              <TableCell align="center">Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentbooks?.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                  backgroundColor:
                    id === row.id ? theme.palette.divider : 'inherit',
                }}
                onClick={() => handleDetail(row.id)}
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
                  <DeleteIcon
                    sx={{
                      color: 'grey',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#E3242B',
                      },
                    }}
                    onClick={(event) => handleDelete(event, row)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {state?.books && ( // Penambahan pengecekan
          <Pagination
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
