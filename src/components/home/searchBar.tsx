import React from 'react';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddButton from './addBook';
import { Grid } from '@mui/material';

const SearchContainer = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: '1px solid #ccc',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: '100%',
  height: '35px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  '@media (prefers-color-scheme: dark)': {
    backgroundColor: alpha(theme.palette.common.white, 0.01),
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '120ch',
    },
  },
}));

const SearchBar: React.FC = () => {
  return (
    <SearchContainer justifyContent="space-between">
      <Grid item xs={10}>
        <Search style={{ marginTop: '1px' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Find your book here…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      </Grid>
      <Grid item xs={2}>
        <div>
          <AddButton />
        </div>
      </Grid>
    </SearchContainer>
  );
};

export default SearchBar;
