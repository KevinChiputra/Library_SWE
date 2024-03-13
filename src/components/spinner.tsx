import type { FC } from 'react';

import { Box, CircularProgress, useTheme } from '@components/material.js';
import type { BoxProps } from '@components/material.js';

interface FallbackSpinnerProps {
  readonly sx?: BoxProps['sx']
}

const FallbackSpinner: FC<FallbackSpinnerProps> = ({ sx = undefined }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        ...sx
      }}
    >
      <svg fill="none" height={56.375} viewBox="0 0 32 22" width={82} xmlns="http://www.w3.org/2000/svg">
        <path
          clipRule="evenodd"
          d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
          fill={theme.palette.primary.main}
          fillRule="evenodd" />
        <path
          clipRule="evenodd"
          d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
          fill="#161616"
          fillRule="evenodd"
          opacity={0.06} />
        <path
          clipRule="evenodd"
          d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
          fill="#161616"
          fillRule="evenodd"
          opacity={0.06} />
        <path
          clipRule="evenodd"
          d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
          fill={theme.palette.primary.main}
          fillRule="evenodd" />
      </svg>
      <CircularProgress disableShrink={true} sx={{ mt: 6 }} />
    </Box>
  );
};

FallbackSpinner.displayName = 'FallbackSpinner';

export { FallbackSpinner };
