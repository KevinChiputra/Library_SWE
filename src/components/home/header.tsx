import React from 'react';

import { Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <div>
      <Typography sx={{ fontSize: '1.5rem' }}>Recommended Book</Typography>
      <hr />
    </div>
  );
};

Header.displayName = 'Header';
export default Header;
