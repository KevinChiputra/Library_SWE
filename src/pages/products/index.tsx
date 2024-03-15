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
  useTheme,
} from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

const Products: PageComponent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [state, dispatch] = useStore((store) => store.products);
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
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    dispatch(command.products.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.products.clear());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center" width={40}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state?.products?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': {
                    border: 0,
                  },
                  backgroundColor:
                    id === row.id ? theme.palette.divider : 'inherit',
                }}
              >
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        id="basic-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDetail}>Detail</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </>
  );
};

Products.displayName = 'Products';

export default Products;
