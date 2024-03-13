import type { Command, FetchURLOptions } from '@nxweb/core';

import { getProducts  } from '@api/clients/products.js';
import type { RootModel } from '@models/types.js';

import { ProductsActionType } from './types.js';

import type { ProductsAction, ProductsModel } from './types.js';

const productsCommand = {
  clear: (): ProductsAction => {
    return {
      type: ProductsActionType.Clear
    };
  },
  load: (token: string, options?: Readonly<FetchURLOptions>) => {
    return async (dispatch) => {
      try {
        const res = await getProducts(token, options);

        if (res) {
          const value: ProductsModel = {
            products: res
          };

          dispatch({
            type: ProductsActionType.Load,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, ProductsAction>;

export { productsCommand };
