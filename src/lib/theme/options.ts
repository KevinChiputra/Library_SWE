import { deepmerge } from '@mui/utils';

import type { PaletteMode, ThemeOptions } from '@components/material.js';
import { options as userThemeOptions } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';

// ** Theme Override Imports
import { breakpoints } from './breakpoints.js';
import { overrides } from './overrides.js';
import { palette } from './palette.js';
import { shadows } from './shadows.js';
import { spacing } from './spacing.js';
import { typography } from './typography.js';

export const themeOptions = (settings: Settings, overrideMode: PaletteMode): ThemeOptions => {
  // ** Vars
  const { skin, mode, direction, themeColor } = settings;

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  const userThemeConfig: ThemeOptions = { ...userThemeOptions() };

  const mergedThemeConfig: ThemeOptions = deepmerge(
    {
      breakpoints: breakpoints(),
      components: overrides(settings),
      direction,
      palette: palette(mode === 'semi-dark' ? overrideMode : mode, skin),
      ...spacing,
      shape: {
        borderRadius: 6
      },

      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
      typography
    },
    userThemeConfig
  );

  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette
          ? mergedThemeConfig.palette[themeColor]
          : palette(mode === 'semi-dark' ? overrideMode : mode, skin).primary
      }
    }
  });
};
