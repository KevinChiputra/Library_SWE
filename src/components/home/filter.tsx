import {
  Popover,
  MenuItem,
  Box,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Book } from '@models/books/types';

interface FilterProps {
  books: Book[];
  onFilterChange: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ books, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [showNotFoundMessage, setShowNotFoundMessage] =
    useState<boolean>(false);

  // Set genres saat data buku diterima
  useEffect(() => {
    // Membuat daftar genre unik dari data buku
    const allGenres: string[] = books.reduce((acc: string[], book: Book) => {
      return [...acc, ...book.genre];
    }, []);

    const uniqueGenres: string[] = Array.from(new Set(allGenres));
    setGenres(uniqueGenres);
  }, [books]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (
    filter: string,
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    const index = selectedFilters.indexOf(filter);
    if (index === -1) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    }
  };

  const handleApplyFilter = () => {
    // Memfilter daftar buku berdasarkan genre yang dipilih
    let filtered = books;
    if (selectedFilters.length > 0) {
      filtered = books.filter((book) =>
        selectedFilters.some((filter) => book.genre.includes(filter))
      );
    }
    setFilteredBooks(filtered);
    setShowNotFoundMessage(selectedFilters.length > 0 && filtered.length === 0);

    // Panggil onFilterChange dengan daftar genre yang dipilih
    onFilterChange(selectedFilters.join(', '));

    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <FilterAltIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        sx={{
          '& .MuiPaper-root': {
            overflowY: 'auto',
            scrollbarWidth: 'thin', // Atur lebar scroll bar
            '&::-webkit-scrollbar': {
              width: '8px' // Ubah lebar scroll bar untuk browser WebKit
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#888'
            }
          }
        }}>
        <Paper style={{ height: '350px' }}>
          <Box sx={{ p: 2 }}>
            {genres.map((genre) => (
              <MenuItem
                key={genre}
                onClick={(event) => handleFilterChange(genre, event)}
                selected={selectedFilters.includes(genre)}>
                {genre}
              </MenuItem>
            ))}
          </Box>
          <MenuItem onClick={handleApplyFilter}>Apply Filter</MenuItem>
        </Paper>
      </Popover>
      {showNotFoundMessage && (
        <Typography variant="body1" color="error">
          Book not found
        </Typography>
      )}
    </div>
  );
};

export default Filter;
