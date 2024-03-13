import type { Skin } from '@layouts/types.js';

import type { OwnerStateThemeType } from '../types.js';

export const Drawer = (skin: Skin) => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[skin === 'default' ? 7 : 0]
        })
      }
    }
  };
};
