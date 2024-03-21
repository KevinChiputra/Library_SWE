import React from 'react';

import { Typography } from '@mui/material';

const Header: React.FC<{ title: string }> = (props) => {
  return (
    <div>
      <Typography sx={{ fontSize: '1.5rem' }}>{props.title}</Typography>
      <hr />
    </div>
  );
};

Header.displayName = 'Header';
export default Header;
