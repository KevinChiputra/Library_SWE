import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface Book {
  title: string;
  description: string;
  price: number;
  image: string;
}

const books: Book[] = [
  {
    title: 'HarryPotter',
    description:
      'Buku HarryPotter ga ngerti ceritanya gimana, pokok tentang sulap',
    price: 500000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
  {
    title: 'Another Book',
    description: 'Description of another book',
    price: 200000,
    image: 'image/book1.png',
  },
];

const itemsPerPage = 6; // Jumlah item per halaman

const BookList: React.FC = () => {
  const [page, setPage] = useState(1); // State untuk halaman aktif

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Menghitung indeks awal dan akhir untuk item yang akan ditampilkan pada halaman saat ini
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div style={{ marginTop: '12px' }}>
      <Grid container spacing={3}>
        {books.slice(startIndex, endIndex).map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ height: '100%' }}>
              <CardMedia sx={{ height: '9.375rem' }} image={book.image} />
              <CardContent
                sx={{
                  p: (theme) => `${theme.spacing(3, 5.25, 4)} !important`,
                  height: '10rem',
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  {book.title}
                </Typography>
                <Typography sx={{ mb: 2 }}>Rp{book.price}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {book.description}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  py: 2.5,
                  width: '100%',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                }}
              >
                Add To Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Pagination */}
      <div
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      >
        <Pagination
          count={Math.ceil(books.length / itemsPerPage)} // Jumlah halaman dihitung berdasarkan jumlah total buku dan item per halaman
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default BookList;
