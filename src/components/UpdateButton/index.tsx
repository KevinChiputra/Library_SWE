import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useStore } from '@models/store';

const UpdateButton = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const [image, setImage] = useState<File | null>(null);
  const [state, dispatch] = useStore((store) => store.products);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const product = useMemo(
    () => state?.products?.find((o) => o.id.toString() === id),
    [state, id]
  );

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAddBook = () => {
    //logic untuk add book
    handleOpen();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file !== undefined && file !== null) {
      setImage(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
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
        <DialogContent sx={{ width: '500px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  placeholder="Title"
                  defaultValue={product?.title}
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Genre"
                  variant="outlined"
                  placeholder="Genre"
                  defaultValue={product?.genre}
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Author"
                  variant="outlined"
                  placeholder="Author"
                  defaultValue={product?.author}
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  placeholder="Description"
                  defaultValue={product?.description}
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Publication Year"
                  variant="outlined"
                  placeholder="Publication Year"
                  defaultValue={product?.publication_year}
                />
              </Grid>

              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <Button variant="contained" onClick={handleUploadButtonClick}>
                  Upload Book Cover
                </Button>
              </Grid>

              <DialogActions>
                <Button
                  onClick={handleOpen}
                  color="secondary"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddBook}
                  color="primary"
                  variant="contained"
                >
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
