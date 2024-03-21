import type { BooksModel } from './books/types';
import type { CartModel } from './cart/types';
import type { ProductsAction, ProductsModel } from './products/types';
import type { TransactionHistoryModel } from './transaction-history/types';

export interface RootModel {
  books?: BooksModel;
  products?: ProductsModel;
  cart?: CartModel;
  transactionHistory?: TransactionHistoryModel;
}

export type RootAction = ProductsAction;
