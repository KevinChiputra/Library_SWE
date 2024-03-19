import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Box, Chip } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import UpdateButton from '@components/button/update-btn';

const DetailBook: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

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

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            sm: 'row'
          },
          alignItems: 'start',
          gap: 4
        }}>
        <Box
          sx={{
            width: {
              xs: '50%',
              sm: '25%'
            },
            height: {
              xs: '50%',
              sm: '100%'
            }
          }}>
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
            gap: 4
          }}>
          <h1
            css={{
              alignItems: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
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
    </>
  );
};

DetailBook.displayName = 'DetailBook';

export default DetailBook;
