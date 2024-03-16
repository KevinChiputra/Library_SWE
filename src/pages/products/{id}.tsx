import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';
import Button from '@mui/material/Button';

import { Box, Chip } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';
import UpdateButton from '@components/UpdateButton';

const Product: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.products);
  const command = useCommand((cmd) => cmd);

  const product = useMemo(
    () => state?.products?.find((o) => o.id.toString() === id),
    [state, id]
  );

  useEffect(() => {
    dispatch(command.products.load()).catch((err: unknown) => {
      console.error(err);
    });

    return () => {
      dispatch(command.products.clear());
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
            src={product?.cover_image}
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
            {product?.title}
            <Box>
              <Chip label={product?.genre.join(', ') ?? '...'} />
            </Box>
          </h1>

          <div>{product?.description}</div>
          {/* Ini tombol buat update, tinggal tambahkan onClick */}
          <UpdateButton />
        </Box>

        {/* ini berisi isi dari data dalam .json */}
        {/* <pre>{product ? JSON.stringify(product, null, 2) : null}</pre> */}
      </Box>
    </>
  );
};

Product.displayName = 'Product';

export default Product;
