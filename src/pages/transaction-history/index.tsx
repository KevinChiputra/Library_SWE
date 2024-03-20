import { useCommand, useStore } from '@models/store';
import { useMemo } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme
} from '@components/material.js';

const tableHeader = ['Number', 'Image', 'Name', 'Quantity', 'Total Product'];

const TransactionHistory = () => {
  const theme = useTheme();

  const [state, dispatch] = useStore((store) => store.transactionHistory);
  const command = useCommand((cmd) => cmd);
  const transactionHistory = useMemo(() => state?.transactionHistory, [state]);

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
                  align="center">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* TABLE CONTENT / BODY */}
          <TableBody>
            {transactionHistory?.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}>
                <TableCell align="center">{index + 1}</TableCell>
                {row.cart?.map((item, index) => (
                  <TableRow sx={{ width: '100%' }} key={index}>
                    <TableCell>
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        css={{ width: '150px', borderRadius: '4px' }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.qty}</TableCell>
                  </TableRow>
                ))}
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: {
                        xs: 'column',
                        sm: 'row'
                      },
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '4px',
                      height: '100%'
                    }}>
                    {row.totalProduct}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionHistory;
