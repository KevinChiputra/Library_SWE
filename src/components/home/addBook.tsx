import React, { ChangeEvent, useState, useRef } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
} from '@mui/material';

const AddButton = () => {
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
    //logic untuk add book
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
    <div style={{ width: '115px' }}>
      <Button variant="contained" onClick={handleOpen}>
        Add Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent sx={{ width: '500px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Author"
                  variant="outlined"
                  placeholder="Author"
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Publication Year"
                  variant="outlined"
                  placeholder="Publication Year"
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  placeholder="Title"
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Genre"
                  variant="outlined"
                  placeholder="Genre"
                />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  placeholder="Description"
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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAddBook} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddButton;
