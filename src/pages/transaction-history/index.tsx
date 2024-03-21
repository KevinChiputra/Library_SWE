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
  useTheme,
} from '@components/material.js';

interface TransactionItem {
  cover_image: string;
  title: string;
  qty: number;
}

interface TransactionRow {
  cart?: TransactionItem[];
  totalProduct: number;
}

const tableHeader = ['Number', 'Image', 'Name', 'Quantity', 'Total Product'];

const TransactionHistory = () => {
  const theme = useTheme();

  const [state, dispatch] = useStore((store) => store.transactionHistory);
  const command = useCommand((cmd) => cmd);
  const transactionHistory: TransactionRow[] | undefined = useMemo(
    () => state?.transactionHistory,
    [state]
  );

  return (
    <>
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
                  width={header === 'Image' ? 200 : undefined}
                  align="center"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* TABLE CONTENT / BODY */}
          <TableBody>
            {transactionHistory?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell align="center">{rowIndex + 1}</TableCell>
                <TableCell align="center">
                  {row.cart?.map((item, itemIndex) => (
                    <Box key={itemIndex}>
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        css={{
                          width: '50px',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {row.cart?.map((item, itemIndex) => (
                    <Box key={itemIndex}>{item.title}</Box>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {row.cart?.map((item, itemIndex) => (
                    <Box key={itemIndex}>{item.qty}</Box>
                  ))}
                </TableCell>
                <TableCell align="center">{row.totalProduct}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionHistory;
