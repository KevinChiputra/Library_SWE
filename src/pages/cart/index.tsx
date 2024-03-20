import { useMemo } from 'react';
import { useCommand, useStore } from '@models/store';

import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@components/material.js';

const tableHeader = ['Image', 'Name', 'Description', 'Quantity'];

const Cart = () => {
  const theme = useTheme();

  const [state, dispatch] = useStore((store) => store.cart);
  const command = useCommand((cmd) => cmd);
  const cart = useMemo(() => state?.cart, [state]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          display: 'block',
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
            {cart?.map((row) => (
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
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row',
                      },
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '4px',
                      height: '100%',
                    }}
                  >
                    <Button
                      sx={{ paddingX: '4px' }}
                      onClick={() => {
                        dispatch(command.cart.removeFromCart(row));
                      }}
                    >
                      -
                    </Button>
                    {row.qty}
                    <Button
                      sx={{ paddingX: '4px' }}
                      onClick={() => {
                        dispatch(command.cart.addToCart(row));
                      }}
                    >
                      +
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {state?.cart?.length !== 0 && (
        <Box sx={{ display: 'flex', marginTop: '16px', justifyContent: 'end' }}>
          <Button
            sx={{ alignItems: 'flex-end' }}
            variant="contained"
            onClick={() => {
              dispatch(
                command.transactionHistory.addToTransactionHistory({
                  cart: state?.cart,
                  totalProduct:
                    state?.cart?.reduce((acc, curr) => {
                      return acc + curr.qty;
                    }, 0) || 0,
                })
              );

              dispatch(command.cart.clearCart());
            }}
          >
            Checkout
          </Button>
        </Box>
      )}
    </>
  );
};

export default Cart;
