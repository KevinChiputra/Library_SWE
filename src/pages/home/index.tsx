import { useEffect, useMemo } from 'react';

import type { PageComponent } from '@nxweb/react';
import { Button } from '@nxweb/react-bootstrap';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography
} from '@components/material.js';
import type { Book } from '@models/books/types';
import { useCommand, useStore } from '@models/store';

const Home: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const books = useMemo(() => state?.books, [state]);

  const book = {
    author: 'Book"s Author',
    cover_image: 'Book"s Cover Image URL',
    description: 'Book"s Description',
    genre: [''],
    id: 1000,
    publication_year: 1,
    title: 'Additional Book'
  };

  const updatedBook = {
    author: 'Updated Book"s Author',
    cover_image: 'Updated Book"s Cover Image URL',
    description: 'Updated Book"s Description',
    genre: [''],
    id: 1000,
    publication_year: 1,
    title: 'Additional Updated Book'
  };

  useEffect(() => {
    // * EXAMPLE USAGE OF "GET" COMMANDS
    dispatch(command.books.load()).catch((err: unknown) => {
      console.error(err);
    });

    // * EXAMPLE USAGE OF "GET_ONE" COMMANDS
    dispatch(command.books.loadOne(1)).catch((err: unknown) => {
      console.error(err);
    });

    // * CLEARING STATE AFTER LEAVING THE PAGE
    return () => {
      dispatch(command.books.clear());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = () => {
    // * EXAMPLE USAGE OF "ADD" COMMANDS
    dispatch(command.books.add(book));
  };

  const removeBook = () => {
    // * EXAMPLE USAGE OF "REMOVE" COMMANDS
    dispatch(command.books.remove(book));
  };

  const updateBook = (updatedBook: Book) => {
    // * EXAMPLE USAGE OF "UPDATE" COMMANDS
    for (const book of books || []) {
      if (
        book.id === updatedBook.id // Nanti bisa direplace sama id book yang mau diupdate
      ) {
        dispatch(command.books.update(updatedBook));
      }
    }
  };

  return (
    <Grid container={true} spacing={6}>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="Kick start your project 🚀" />
          <CardContent>
            <Typography>
              Please make sure to read our Template Documentation to understand
              where to go from here and how to use our template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item={true} xs={12}>
        <Card>
          <CardContent>
            {books?.map((book) => (
              <p key={book.id}>{book.title}</p>
            ))}
            <Button onClick={addBook}>Add Book</Button>
            <Button onClick={removeBook}>Remove Book</Button>
            <Button
              onClick={() => {
                updateBook(updatedBook);
              }}>
              Update Book
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;
