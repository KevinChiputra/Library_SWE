import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Box, Card, Chip } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import UpdateButton from '@components/button/update-btn';
import { CardContent, CardMedia, Grid, Typography } from '@mui/material';

const DetailBook: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const navigate = useNavigate()

  const books = useMemo(() => state?.books, [state]);

  const book = useMemo(
    () => state?.books?.find((o) => o.id.toString() === id),
    [state, id]
  );

  useEffect(() => {
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.books.clear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recommendationBook = useMemo(() => {
    return books?.slice(-4) || [];
  }, [books]);

  const handleDetail = (id: number) => {
    navigate(`/books/${id}`);
  };

  console.log(recommendationBook);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
          alignItems: 'start',
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: {
              xs: '50%',
              sm: '25%',
            },
            height: {
              xs: '50%',
              sm: '100%',
            },
          }}
        >
          <img
            src={book?.cover_image}
            alt="Foto Buku"
            css={{ width: '100%', borderRadius: '4px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <h1
            css={{
              alignItems: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {book?.title}
            <Box>
              <Chip label={book?.genre.join(', ') ?? '...'} />
            </Box>
          </h1>

          <div>{book?.description}</div>
          {/* Ini tombol buat update, tinggal tambahkan onClick */}
          <UpdateButton />
        </Box>
        {/* ini berisi isi dari data dalam .json */}
        {/* <pre>{book ? JSON.stringify(book, null, 2) : null}</pre> */}
      </Box>
      <Box>
        <h1>Recommendation Book</h1>
        <Grid container spacing={4}>
          {recommendationBook.map((book) => (
            <Grid item sm={6} onClick={() => handleDetail(book.id)}>
              <Card sx={{ width: '100%', height: '100%' }}>
                <CardMedia
                  alt="pic"
                  component="img"
                  image={book?.cover_image}
                  sx={{ height: '9.375rem' }}
                  title="Picture"
                />
                <CardContent>
                  <Typography sx={{ mb: 2 }} variant="h5">
                    {book?.title}
                  </Typography>
                  <Typography sx={{ mb: 2 }}>by : {book?.author}</Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    {book?.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

DetailBook.displayName = 'DetailBook';

export default DetailBook;
