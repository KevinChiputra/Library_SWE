import type { FetchURLOptions } from '@nxweb/core';

import type { Product } from '@models/products/types.js';

import { testAPIBook, testApiUrlBook } from '../base.js';
import { options } from '@config/theme.js';

interface productsAPIResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const endpointBook = '/api/v1/books';

export const getBooks = async (options?: Readonly<FetchURLOptions>) => {
  const url = testApiUrlBook(endpointBook, options);
  const { data } = await testAPIBook().get(url.toString());
  const response = data as productsAPIResponse['products'];

  return response;
};
