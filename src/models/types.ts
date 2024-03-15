import type { BooksModel } from './books/types';
import type { ProductsAction, ProductsModel } from './products/types';

export interface RootModel {
  books?: BooksModel;
  products?: ProductsModel;
}

export type RootAction = ProductsAction;
