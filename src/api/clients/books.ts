import type { FetchURLOptions } from '@nxweb/core';

import { APIBooks, apiURLBooks } from '../base.js';

export const endpointBooks = '/api/v1/books';

export const getBooks = async (options?: Readonly<FetchURLOptions>) => {
  const url = apiURLBooks(endpointBooks, options);
  const { data } = await APIBooks().get(url.toString());

  return data;
};

export const getOneBook = async (
  id: number,
  options?: Readonly<FetchURLOptions>
) => {
  const url = apiURLBooks(`${endpointBooks}/${id}`, options);
  const { data } = await APIBooks().get(url.toString());

  return data;
};
