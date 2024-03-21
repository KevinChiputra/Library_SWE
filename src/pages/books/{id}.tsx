import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Box, Chip, Typography } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import UpdateButton from '@components/button/update-btn';
import { Toaster } from 'react-hot-toast';

const DetailBook: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const book = useMemo(
    () => state?.books?.find((o) => o.id.toString() === id),
    [state, id]
  );

  useEffect(() => {
    if (!state?.books?.length) {
      dispatch(command.books.load()).catch((err: unknown) => {
        console.error(err);
      });
    }
  }, []);

  return (
    <>
      <Toaster position="top-right" />
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
          <Typography
            sx={{
              alignItems: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {book?.title}
          </Typography>
          <Box>
            <Chip label={book?.genre.join(', ') ?? '...'} />
          </Box>
          <Typography>{book?.description}</Typography>
          <UpdateButton />
        </Box>
      </Box>
    </>
  );
};

DetailBook.displayName = 'DetailBook';

export default DetailBook;
