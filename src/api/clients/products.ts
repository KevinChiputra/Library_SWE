import type { FetchURLOptions } from '@nxweb/core';

import type { Product } from '@models/products/types.js';

import { testApiUrlBook, testAPIBook } from '../base.js';

interface productsAPIResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}

export const endpointBook = '/api/v1/books';

// export const getProducts = async (
//   token: string,
//   options?: Readonly<FetchURLOptions>
// ) => {
//   const url = apiURL(endpoint, options);
//   const { data } = await API(
//     token /* +uncomment to mock: , undefined, true */
//   ).get(url.toString());

//   const response = data as productsAPIResponse;

//   return response.products;
// };

export const getBooks = async (options?: Readonly<FetchURLOptions>) => {
  const url = testApiUrlBook(endpointBook, options);
  const { data } = await testAPIBook().get(url.toString());
  const response = data as productsAPIResponse['products'];

  console.log('buku');
  console.log(response);

  return response;
};
