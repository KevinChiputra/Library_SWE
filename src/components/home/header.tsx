import React from 'react';

import { Toolbar } from '@mui/material';

const Header: React.FC = () => {
  return (
    <div style={{ fontSize: '23px', marginTop: '10px' }}>
      <Toolbar>Recommended Book</Toolbar>
      <hr />
    </div>
  );
};

Header.displayName = 'Header';
export default Header;
