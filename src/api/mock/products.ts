import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpointBook } from '../clients/products.js';

export const products: FetchMockInitializer = (
  adapter: Readonly<FetchMockAdapter>
) => {
  const url = createMockURL(endpointBook, window.NX.env.apiURL);

  adapter.onPost(url).reply(200, {
    output: {
      limit: 10,
      products: [
        {
          description: 'A good soccer ball for playing',
          id: 1,
          title: 'Soccer Ball'
        },
        {
          description: 'A Basketball',
          id: 2,
          title: 'Basketball'
        },
        {
          description: 'Shoes that can make you fly',
          id: 3,
          title: 'Running Shoes'
        }
      ],
      skip: 0,
      total: 10
    }
  });
};
