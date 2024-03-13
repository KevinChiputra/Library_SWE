// ** Type Imports
import type { Skin } from '@layouts/types.js';

import type { OwnerStateThemeType } from '../types.js';

export const Popover = (skin: Skin) => {
  const boxShadow = (theme: OwnerStateThemeType['theme']) => {
    if (skin === 'bordered') {
      return theme.shadows[0];
    }

    if (theme.palette.mode === 'light') {
      return theme.shadows[6];
    }

    return '0px 3px 14px 0px rgba(15, 20, 34, 0.38)';
  };

  return {
    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: boxShadow(theme),
          ...skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }
        })
      }
    }
  };
};
