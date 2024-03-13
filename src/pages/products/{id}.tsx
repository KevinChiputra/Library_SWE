import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import type { PageComponent } from '@nxweb/react';

import { Chip } from '@components/material.js';
import { useCommand, useStore } from '@models/store.js';

const Product: PageComponent = () => {
  const { id } = useParams();
  const [state, dispatch] = useStore((store) => store.products);
  const command = useCommand((cmd) => cmd);

  const product = useMemo(() => state?.products?.find((o) => o.id.toString() === id), [state, id]);

  useEffect(() => {
    dispatch(command.products.load(''))
      .catch((err: unknown) => {
        console.error(err);
      });

    return () => {
      dispatch(command.products.clear());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 css={{ alignItems: 'center', display: 'flex', gap: '1rem' }}>
        {product?.title}
        <Chip label={product?.title ?? '...'} />
      </h1>

      <div>{product?.description}</div>
      <pre>
        {product ? JSON.stringify(product, null, 2) : null}
      </pre>
    </>
  );
};

Product.displayName = 'Product';

export default Product;
