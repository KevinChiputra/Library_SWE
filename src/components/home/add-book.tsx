import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useCommand, useStore } from '@models/store';
import { Book } from '@models/books/types';
import { setValue } from '@nxweb/core';

const AddBook = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const [additionalBook, setAdditionalBook] = useState<Book>({
    author: '',
    cover_image: 'https://fakeimg.pl/667x1000/cc6600',
    description: '',
    genre: [],
    id: 0,
    publication_year: '',
    title: '',
  });

  // INI UNTUK MENDAPATKAN INDEX TERAKHIR DARI OBJECT
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    if (state && state.books) {
      setLastIndex(state.books.length + 1);
    }
  }, [state]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined && file !== null) {
      const reader = new FileReader()

      reader.onload = () => {
        const urlImgData = reader.result as string
        setAdditionalBook({...additionalBook, cover_image: urlImgData})
        localStorage.setItem('new-image-book', urlImgData)
      }

      reader.readAsDataURL(file)
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenre = (input: string) => {
    const newGenreToAdd = input.split(' ').filter(Boolean);
    setAdditionalBook({
      ...additionalBook,
      genre: { ...additionalBook.genre, ...newGenreToAdd },
    });
  };

  const handleSubmit = () => {
    const newBook: Book = { ...additionalBook, id: lastIndex };
    dispatch(command.books.add(newBook));


    handleClose();
  };

  console.log(additionalBook);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent
          sx={{
            width: {
              sm: '500px',
            },
          }}
        >
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12}>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Author"
                  placeholder="Author"
                  variant="outlined"
                  onChange={(e) =>
                    setAdditionalBook({
                      ...additionalBook,
                      author: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Publication Year"
                  placeholder="Publication Year"
                  variant="outlined"
                  onChange={(e) =>
                    setAdditionalBook({
                      ...additionalBook,
                      publication_year: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Title"
                  placeholder="Title"
                  variant="outlined"
                  onChange={(e) =>
                    setAdditionalBook({
                      ...additionalBook,
                      title: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Genre"
                  placeholder="Genre"
                  variant="outlined"
                  onChange={(e) => handleGenre(e.target.value)}
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Description"
                  placeholder="Description"
                  variant="outlined"
                  onChange={(e) =>
                    setAdditionalBook({
                      ...additionalBook,
                      description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type="file"
                  onChange={handleImageChange}
                />
                <Button variant="contained" onClick={handleUploadButtonClick}>
                  Upload Book Cover
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddBook.displayName = 'FormAddBook';

export default AddBook;
