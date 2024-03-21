import { BooksActionType } from './types.js';

import type { Book, BooksAction, BooksModel } from './types.js';

const booksReducer = (
  state: BooksModel = {},
  action: Readonly<BooksAction>
): BooksModel => {
  switch (action.type) {
    case BooksActionType.GET:
      return { ...state, ...action.value };
    case BooksActionType.GET_ONE:
      return { ...state, ...action.value };
    case BooksActionType.ADD:
      if (state.books && action.value) {
        return { ...state, books: [...state.books, action.value] };
      }

      return state;
    case BooksActionType.REMOVE:
      if (state.books && action.value) {
        return {
          ...state,
          books: state.books.filter((book) => book.id !== action.value?.id)
        };
      }

      return state;
    case BooksActionType.UPDATE: {
      let restBooks = state.books?.filter(
        (book) => book.id !== action.value?.id
      );

      restBooks = restBooks as Book[];

      if (state.books && action.value) {
        return { ...state, books: [...restBooks, action.value] };
      }

      return state;
    }
    case BooksActionType.CLEAR:
      return {};

    default:
      return state;
  }
};

export { booksReducer };
