import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';

const AddBook = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBook = () => {
    // Logic untuk add book
    handleClose();
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
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent
          sx={{
            width: {
              sm: '500px'
            }
          }}>
          <Grid container={true} spacing={2}>
            <Grid item={true} xs={12}>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Author"
                  placeholder="Author"
                  variant="outlined"
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Publication Year"
                  placeholder="Publication Year"
                  variant="outlined"
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Title"
                  placeholder="Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Genre"
                  placeholder="Genre"
                  variant="outlined"
                />
              </Grid>
              <Grid item={true} style={{ marginBottom: '1rem' }} xs={12}>
                <TextField
                  fullWidth={true}
                  label="Description"
                  placeholder="Description"
                  variant="outlined"
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
          <Button color="primary" variant="contained" onClick={handleAddBook}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddBook.displayName = 'FormAddBook';

export default AddBook;
