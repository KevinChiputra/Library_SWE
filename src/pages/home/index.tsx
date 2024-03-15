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
import { useCommand, useStore } from '@models/store';

const Home: PageComponent = () => {
  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);
  const books = useMemo(() => state?.books, [state]);

  const book = {
    author: 'Book Tambahan',
    cover_image: 'string',
    description: 'string',
    genre: [''],
    id: 1,
    publication_year: 1,
    title: 'string'
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

  const handleClick = () => {
    // * EXAMPLE USAGE OF "ADD" COMMANDS
    dispatch(command.books.add(book));
  };

  return (
    <Grid container={true} spacing={6}>
      <Grid item={true} xs={12}>
        <Card>
          <CardHeader title="Kick start your project 🚀" />
          <CardContent>
            <Button onClick={handleClick}>Add Book</Button>
            {books?.map((book) => (
              <p key={book.id}>{book.title}</p>
            ))}
            <Typography>
              Please make sure to read our Template Documentation to understand
              where to go from here and how to use our template.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

Home.displayName = 'Home';

export default Home;
