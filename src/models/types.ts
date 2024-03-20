import type { BooksModel } from './books/types';
import type { CartModel } from './cart/types';
import type { ProductsAction, ProductsModel } from './products/types';

export interface RootModel {
  books?: BooksModel;
  products?: ProductsModel;
  cart?: CartModel;
}

export type RootAction = ProductsAction;
