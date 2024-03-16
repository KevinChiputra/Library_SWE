/* eslint-disable sort-keys */
import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';

import AddButton from './add-book';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: '1px solid #ccc',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1)
  },
  marginRight: theme.spacing(1),
  // MarginLeft: 0,
  height: '35px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3)
  },
  [theme.breakpoints.up('lg')]: {
    width: '50%'
  },
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: alpha(theme.palette.common.white, 0.01)
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  }
}));

const SearchBar: React.FC = () => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={4}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
      <Search style={{ marginTop: '1px' }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          inputProps={{ 'aria-label': 'search' }}
          placeholder="Find your book here…"
        />
      </Search>
      <AddButton />
    </Stack>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
