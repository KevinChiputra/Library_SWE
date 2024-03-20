import { Book } from '@models/books/types';

interface Cart extends Book {
  qty: number;
}

interface CartModel {
  cart?: Cart[];
}

enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART'
}

type CartAction =
  | { type: CartActionType.ADD_TO_CART; value: Book }
  | { type: CartActionType.REMOVE_FROM_CART; value: Book };

export { CartActionType };
export type { CartAction, Cart, CartModel };
