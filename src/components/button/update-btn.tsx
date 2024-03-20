import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCommand, useStore } from '@models/store';
import { Book } from '@models/books/types';

const UpdateButton = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();

  const [state, dispatch] = useStore((store) => store.books);
  const command = useCommand((cmd) => cmd);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = useMemo(
    () => state?.books?.find((o) => o.id.toString() === id),
    [state, id]
  );

  const [value, setValue] = useState<Book>({
    title: '',
    author: '',
    cover_image: '',
    description: '',
    genre: [''],
    id: 0,
    publication_year: 0
  });

  useEffect(() => {
    if (product) {
      setValue(product);
    }
  }, [product]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setValue({ ...value, cover_image: imageDataUrl });
        localStorage.setItem('recent-image', imageDataUrl);
        // console.log('imageDataURL', imageDataUrl);
      };

      reader.readAsDataURL(file); // Membaca file sebagai URL data
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleChangeGenre = (index: number, newValue: string) => {
    const newGenre: string[] = [...value.genre]; // Make a copy of the genre array
    newGenre[index] = newValue; // Update the value at the specified index
    setValue({ ...value, genre: newGenre }); // Update the state with the new genre array
  };

  const handleSubmit = () => {
    dispatch(command.books.update(value));
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={handleOpen}>
          Update
        </Button>
      </Box>

      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent sx={{ width: { sm: '500px' } }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  placeholder="Title"
                  value={value.title}
                  onChange={(e) =>
                    setValue({ ...value, title: e.target.value })
                  }
                />
              </Grid>

              {value.genre.map((genreItem, index) => (
                <Grid item xs={12} style={{ marginBottom: '1rem' }} key={index}>
                  <TextField
                    fullWidth
                    label={`Genre ${index + 1}`}
                    variant="outlined"
                    placeholder={`Genre ${index + 1}`}
                    value={genreItem}
                    onChange={(e) => handleChangeGenre(index, e.target.value)}
                  />
                </Grid>
              ))}

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Author"
                  variant="outlined"
                  placeholder="Author"
                  value={value.author}
                  onChange={(e) =>
                    setValue({ ...value, author: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  placeholder="Description"
                  value={value.description}
                  onChange={(e) =>
                    setValue({ ...value, description: e.target.value })
                  }
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Publication Year"
                  variant="outlined"
                  placeholder="Publication Year"
                  value={value.publication_year}
                  onChange={(e) =>
                    setValue({
                      ...value,
                      publication_year: parseInt(e.target.value)
                    })
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                {value.cover_image && (
                  <img
                    src={value.cover_image}
                    alt="Foto Buku"
                    css={{ width: '50%', borderRadius: '4px' }}
                  />
                )}
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Button
                  variant="contained"
                  color="info"
                  sx={{
                    width: '50%',
                    fontSize: {
                      xs: '0.75rem',
                      sm: '1rem'
                    }
                  }}
                  onClick={handleUploadButtonClick}>
                  Upload Book Cover
                </Button>
              </Grid>

              <DialogActions>
                <Button
                  onClick={handleOpen}
                  color="secondary"
                  variant="contained">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    handleSubmit(), handleOpen();
                  }}>
                  Update
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateButton;
