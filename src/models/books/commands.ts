import type { Command, FetchURLOptions } from '@nxweb/core';

import { getBooks, getOneBook } from '@api/clients/books.js';
import type { RootModel } from '@models/types.js';

import { BooksActionType } from './types.js';

import type { Book, BooksAction, BooksModel } from './types.js';

const booksCommand = {
  add: (book: Book): BooksAction => {
    return {
      type: BooksActionType.ADD,
      value: book
    };
  },
  clear: (): BooksAction => {
    return {
      type: BooksActionType.CLEAR
    };
  },
  load: (options?: Readonly<FetchURLOptions>) => {
    return async (dispatch) => {
      try {
        const res = await getBooks(options);

        if (res) {
          const value: BooksModel = {
            books: res as Book[]
          };

          dispatch({
            type: BooksActionType.GET,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  },
  loadOne: (id: number, options?: Readonly<FetchURLOptions>) => {
    return async (dispatch) => {
      try {
        const res = await getOneBook(id, options);
        const value = { book: res as Book };

        if (res) {
          dispatch({
            type: BooksActionType.GET_ONE,
            value
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
  }
} satisfies Command<RootModel, BooksAction>;

export { booksCommand };
