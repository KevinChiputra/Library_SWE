import type { FC } from 'react';
import { useState } from 'react';

import { ArrowUP } from '@nxweb/icons/tabler';
import type { LayoutProps as NextWebLayoutProps } from '@nxweb/react/layout';

import { Customizer } from '@components/customizer.js';
import { Footer } from '@components/footer.js';
import { Box, Fab, styled } from '@components/material.js';
import type { BoxProps } from '@components/material.js';
import { ScrollToTop } from '@components/scroll-to-top.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';

import { VerticalAppBar } from './components/vertical/app-bar.js';
import { Navigation } from './components/vertical/navigation.js';

const VerticalLayoutWrapper = styled('div')({
  display: 'flex',
  height: '100%'
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

type VerticalLayoutProps = LayoutProps & NextWebLayoutProps;

// eslint-disable-next-line react/require-default-props
const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const {
    hidden,
    settings,
    children,
    scrollToTop,
    footerProps,
    contentHeightFixed,
    verticalLayoutProps
  } = props;

  // ** Vars
  const { skin, navHidden, contentWidth } = settings;
  const navigationBorderWidth = skin === 'bordered' ? 1 : 0;
  const { navigationSize, disableCustomizer, collapsedNavigationSize } = themeConfig;
  const navWidth = navigationSize;
  const collapsedNavWidth = collapsedNavigationSize;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        {/* Navigation Menu */}
        {navHidden && !(navHidden && settings.lastLayout === 'horizontal')
          ? null
          : (
          <Navigation
            afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
            beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
            collapsedNavWidth={collapsedNavWidth}
            menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
            menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
            navMenuBranding={verticalLayoutProps.navMenu.branding}
            navMenuContent={verticalLayoutProps.navMenu.content}
            navMenuProps={verticalLayoutProps.navMenu.componentProps}
            navVisible={navVisible}
            navWidth={navWidth}
            navigationBorderWidth={navigationBorderWidth}
            setNavVisible={setNavVisible}
            toggleNavVisibility={toggleNavVisibility}
            verticalNavItems={verticalLayoutProps.navMenu.navItems}
            {...props} />
          )}
        <MainContentWrapper
          className="layout-content-wrapper"
          sx={{ ...contentHeightFixed && { maxHeight: '100vh' } }}
        >
          {/* AppBar Component */}
          <VerticalAppBar
            appBarContent={verticalLayoutProps.appBar?.content}
            appBarProps={verticalLayoutProps.appBar?.componentProps}
            toggleNavVisibility={toggleNavVisibility}
            {...props} />

          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
            sx={{
              ...contentHeightFixed && {
                overflow: 'hidden',

                '& > :first-of-type': { height: '100%' }
              },
              ...contentWidth === 'boxed' && {
                mx: 'auto',

                '@media (min-width:1200px)': { maxWidth: '100%' },
                '@media (min-width:1440px)': { maxWidth: 1440 }
              }
            }}
          >
            {children}
          </ContentWrapper>

          {/* Footer Component */}
          <Footer footerContent={footerProps?.content} footerStyles={footerProps?.sx} {...props} />
        </MainContentWrapper>
      </VerticalLayoutWrapper>

      {/* Customizer */}
      {disableCustomizer || hidden ? null : <Customizer />}

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
    </>
  );
};

VerticalLayout.displayName = 'VerticalLayout';

export { VerticalLayout };
