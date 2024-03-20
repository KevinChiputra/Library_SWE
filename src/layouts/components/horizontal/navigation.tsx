import type { FC, PropsWithChildren } from 'react';

import { Box } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';

import { HorizontalNavItems } from './navigation/nav-items.js';
import { Toaster } from 'react-hot-toast';

interface Props extends PropsWithChildren {
  readonly horizontalNavItems: NonNullable<
    NonNullable<LayoutProps['horizontalLayoutProps']>['navMenu']
  >['navItems'];
  readonly settings: LayoutProps['settings'];
}

const Navigation: FC<Props> = (props: Props) => {
  return (
    <Box
      className="menu-content"
      sx={{
        '& > *': {
          '&:not(:last-child)': { mr: 1 },
          ...(themeConfig.menuTextTruncate && { maxWidth: 200 }),
        },
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      <HorizontalNavItems {...props} />
      <Toaster position="top-right" />
    </Box>
  );
};

Navigation.displayName = 'Navigation';

export { Navigation };
