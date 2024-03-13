import type { FC } from 'react';

import { ArrowUP } from '@nxweb/icons/tabler';
import type { LayoutProps as NextWebLayoutProps } from '@nxweb/react/layout';

import { Customizer } from '@components/customizer.js';
import { Footer } from '@components/footer.js';
import { Box, Fab, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { ScrollToTop } from '@components/scroll-to-top.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';

import { HorizontalAppBar } from './components/horizontal/app-bar.js';

const HorizontalLayoutWrapper = styled('div')({
  display: 'flex',
  height: '100%',
  ...themeConfig.horizontalMenuAnimation && { overflow: 'clip' }
});

const MainContentWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: '100vh',
  minWidth: 0
});

const ContentWrapper = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(6),
  transition: 'padding .25s ease-in-out',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

type HorizontalLayoutProps = NextWebLayoutProps & Omit<LayoutProps, 'children'>;

// eslint-disable-next-line react/require-default-props, complexity
const HorizontalLayout: FC<HorizontalLayoutProps> = (props) => {
  const {
    children = undefined,
    hidden,
    settings,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    horizontalLayoutProps
  } = props;

  const { contentWidth } = settings;

  return (
    <HorizontalLayoutWrapper className="layout-wrapper">
      <MainContentWrapper className="layout-content-wrapper" sx={{ ...contentHeightFixed && { maxHeight: '100vh' } }}>
        {/* Navbar (or AppBar) and Navigation Menu Wrapper */}
        <HorizontalAppBar
          appBarBranding={horizontalLayoutProps?.appBar?.branding}
          appBarContent={horizontalLayoutProps?.appBar?.content}
          appBarProps={horizontalLayoutProps?.appBar?.componentProps}
          navMenu={horizontalLayoutProps?.navMenu}
          {...props} />
        {/* Content */}
        <ContentWrapper
          className="layout-page-content"
          sx={{
            ...contentHeightFixed && { display: 'flex', overflow: 'hidden' },
            ...contentWidth === 'boxed' && {
              '@media (min-width:1200px)': { maxWidth: '100%' },
              '@media (min-width:1440px)': { maxWidth: 1440 },
              mx: 'auto'
            }
          }}
        >
          {children}
        </ContentWrapper>
        {/* Footer */}
        <Footer {...props} footerContent={footerProps?.content} footerStyles={footerProps?.sx} />
        {/* Customizer */}
        {themeConfig.disableCustomizer || hidden ? null : <Customizer />}
        {/* Scroll to top button */}
        {scrollToTop
          ? scrollToTop(props)

          : (
          <ScrollToTop className="mui-fixed">
            <Fab aria-label="scroll back to top" color="primary" size="small">
              <ArrowUP />
            </Fab>
          </ScrollToTop>
          )}
      </MainContentWrapper>
    </HorizontalLayoutWrapper>
  );
};

HorizontalLayout.displayName = 'HorizontalLayout';

export { HorizontalLayout };
