import { Book } from '@models/books/types';
import { CartAction, CartActionType } from './types';

const cartCommands = {
  addToCart: (book: Book): CartAction => {
    return {
      type: CartActionType.ADD_TO_CART,
      value: book
    };
  },
  removeFromCart: (book: Book): CartAction => {
    return {
      type: CartActionType.REMOVE_FROM_CART,
      value: book
    };
  }
};

export { cartCommands };
