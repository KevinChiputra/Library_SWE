interface Book {
  author: string;
  cover_image: string;
  description: string;
  genre: string[];
  id: number;
  publication_year: number | string;
  title: string;
}

// Page Model
interface BooksModel {
  books?: Book[];
}

enum BooksActionType {
  ADD = 'ADD_BOOK',
  CLEAR = 'CLEAR_BOOKS',
  GET = 'GET_BOOKS',
  GET_ONE = 'GET_ONE_BOOK',
  REMOVE = 'REMOVE_BOOK',
  UPDATE = 'UPDATE_BOOK'
}

type BooksAction =
  | {
      type: BooksActionType.CLEAR;
    }
  | {
      type: BooksActionType.GET;
      value?: BooksModel;
    }
  | {
      type: BooksActionType.GET_ONE;
      value?: { book: Book };
    }
  | {
      type: BooksActionType.ADD;
      value?: Book;
    }
  | {
      type: BooksActionType.REMOVE;
      value?: Book;
    }
  | {
      type: BooksActionType.UPDATE;
      value?: BooksModel;
    };

export { BooksActionType };
export type { BooksModel, BooksAction, Book };
