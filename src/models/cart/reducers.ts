import { CartActionType } from './types.js';

import type { CartAction, CartModel } from './types.js';

const cartReducer = (
  state: CartModel = { cart: [] },
  action: Readonly<CartAction>
): CartModel => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART:
      if (state.cart && action.value) {
        const book = state.cart.find((b) => b.id === action.value.id);
        if (book) {
          book.qty++;
        } else {
          state.cart.push({ ...action.value, qty: 1 });
        }
      }

      return { ...state };
    case CartActionType.REMOVE_FROM_CART:
      if (state.cart && action.value) {
        const book = state.cart.find((b) => b.id === action.value.id);
        if (book) {
          if (book.qty === 1) {
            return {
              ...state,
              cart: state.cart.filter((v) => v.id !== action.value.id)
            };
          }
          book.qty--;
        }
      }

      return { ...state };
    default:
      return state;
  }
};

export { cartReducer };
