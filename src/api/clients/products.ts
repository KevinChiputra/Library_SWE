import type { FetchURLOptions } from '@nxweb/core';

import type { Product } from '@models/products/types.js';

import { API, apiURL } from '../base.js';

interface productsAPIResponse {
  limit: number
  products: Product[]
  skip: number
  total: number
}

export const endpoint = 'products';

export const getProducts = async (token: string, options?: Readonly<FetchURLOptions>) => {
  const url = apiURL(endpoint, options);
  const { data } = await API(
    token /* +uncomment to mock: , undefined, true */
  ).get(url.toString());

  const response = data as productsAPIResponse;

  return response.products;
};
