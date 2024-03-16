import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DotsVertical } from '@nxweb/icons/tabler';
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
  useTheme
} from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import { Book } from '@models/books/types';

import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';

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

  const handleDetail = () => {
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

  const handleDelete = (book: Book) => {
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
          paddingBottom: '1rem'
        }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={200}>
                Image
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center" width={40}>
                Action
              </TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentbooks?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0
                  },
                  backgroundColor:
                    id === row.id ? theme.palette.divider : 'inherit'
                }}>
                <TableCell component="th" scope="row">
                  <img
                    src={row.cover_image}
                    alt=""
                    css={{ width: '100% ', borderRadius: '4px' }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={(e) => handleClick(e, row.id)}>
                    <DotsVertical />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    sx={{
                      color: 'grey',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#E3242B'
                      }
                    }}
                    onClick={() => handleDelete(row)}
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
      <Menu
        anchorEl={anchorEl}
        id="basic-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default Books;
