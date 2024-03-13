import type { ProductsAction, ProductsModel } from './products/types';

export interface RootModel {
  products?: ProductsModel
}

export type RootAction = ProductsAction;
