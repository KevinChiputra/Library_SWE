import type { FC } from 'react';

import { Box } from '@components/material.js';
import type { LayoutProps } from '@layouts/types.js';

import { FooterContent } from './footer/content.js';

interface Props {
  readonly footerContent?: NonNullable<LayoutProps['footerProps']>['content']
  readonly footerStyles?: NonNullable<LayoutProps['footerProps']>['sx']
  // eslint-disable-next-line react/no-unused-prop-types
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
}

// eslint-disable-next-line react/require-default-props
const Footer: FC<Props> = (props) => {
  const { settings, footerStyles, footerContent: userFooterContent } = props;

  // ** Vars
  const { skin, layout, footer, contentWidth } = settings;

  if (footer === 'hidden') {
    return null;
  }

  return (
    <Box
      className="layout-footer"
      component="footer"
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10,
        ...footer === 'fixed' && {
          bottom: 0,
          position: 'sticky',
          ...layout === 'vertical'
            ? { px: [4, 6] }
            : {
              backgroundColor: (theme) => theme.palette.background.paper,
              ...skin === 'bordered'
                ? { borderTop: (theme) => `1px solid ${theme.palette.divider}` }
                : { boxShadow: 16 }
            }
        },
        ...footerStyles
      }}
    >
      <Box
        className="footer-content-container"
        sx={{
          px: 6,
          py: (theme) => theme.spacing(footer === 'fixed' && skin === 'bordered' ? 2.875 : 3),
          ...contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } },
          ...layout === 'vertical' && {
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderTopRightRadius: (theme) => theme.shape.borderRadius,
            ...footer === 'fixed' && { backgroundColor: (theme) => theme.palette.background.paper }
          },
          ...footer === 'fixed' && {
            ...contentWidth === 'boxed' &&
              layout === 'vertical' && {
              '@media (min-width:1440px)': { maxWidth: (theme) => `calc(1440px - ${theme.spacing(6)} * 2)` }
            },
            ...layout === 'vertical' && {
              ...skin === 'bordered'
                ? { border: (theme) => `1px solid ${theme.palette.divider}`, borderBottomWidth: 0 }
                : { boxShadow: 16 }
            }
          },
          width: '100%'
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  );
};

Footer.displayName = 'Footer';

export { Footer };
