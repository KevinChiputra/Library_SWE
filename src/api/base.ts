import { compact, createFetch, createFetchURL } from '@nxweb/core';
import type { FetchURLOptions } from '@nxweb/core';

import { apiMock } from './mock.js';

export const testApiUrlBook = (
  endpoint: string,
  options: Readonly<FetchURLOptions> = {}
) =>
  createFetchURL(endpoint, {
    baseURL: window.NX?.env?.apiBook,
    ...options,
  });

export const testAPIBook = () =>
  createFetch({
    baseURL: window.NX?.env?.apiBook,
    header: {
      Authorization: 'Bearer random',
    },
  });
