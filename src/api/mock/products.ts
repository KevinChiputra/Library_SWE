import type { FetchMockAdapter, FetchMockInitializer } from '@nxweb/core';
import { createMockURL } from '@nxweb/core';

import { endpoint } from '../clients/products.js';

export const products: FetchMockInitializer = (adapter: Readonly<FetchMockAdapter>) => {
  const url = createMockURL(endpoint, window.NX.env.apiURL);

  adapter.onPost(url).reply(200, {
    output: {
      limit: 10,
      products: [
        {
          id: 1,
          description: 'A good soccer ball for playing',
          title: 'Soccer Ball'
        },
        {
          id: 2,
          description: 'A Basketball',
          title: 'Basketball'
        },
        {
          id: 3,
          description: 'Shoes that can make you fly',
          title: 'Running Shoes'
        }
      ],
      skip: 0,
      total: 10
    }
  });
};
