import type { Skin } from '@layouts/types.js';

import type { OwnerStateThemeType } from '../types.js';

export const Snackbar = (skin: Skin) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          ...skin === 'bordered' && { boxShadow: 'none' },
          backgroundColor: `rgb(${theme.palette.customColors.main})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        })
      }
    }
  };
};
