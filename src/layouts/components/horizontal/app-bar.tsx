import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Box, Toolbar as MuiToolbar, styled, Typography, useTheme } from '@components/material.js';
import type { ToolbarProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import { Navigation } from '@layouts/components/horizontal/navigation.js';
import type { LayoutProps } from '@layouts/types.js';
import { hexToRGBA } from '@lib/hex-to-rgba.js';

interface Props {
  readonly appBarBranding: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['branding']
  readonly appBarContent: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['content']
  readonly appBarProps: NonNullable<NonNullable<LayoutProps['horizontalLayoutProps']>['appBar']>['componentProps']
  readonly hidden: LayoutProps['hidden']
  readonly navMenu: NonNullable<LayoutProps['horizontalLayoutProps']>['navMenu']
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
}

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  padding: `${theme.spacing(0, 6)} !important`,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(4)
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginRight: theme.spacing(8),
  textDecoration: 'none'
}));

// eslint-disable-next-line react/require-default-props
const HorizontalAppBar: FC<Props> = (props) => {
  const { settings, appBarBranding, appBarContent, appBarProps, navMenu } = props;
  const { skin, appBar, navHidden, appBarBlur, contentWidth } = settings;
  let userAppBarStyle = {};
  if (appBarProps && appBarProps.sx) {
    userAppBarStyle = appBarProps.sx;
  }

  const userAppBarProps = { ...appBarProps };

  delete userAppBarProps.sx;

  const theme = useTheme();

  return (
    <AppBar
      className="layout-navbar-and-nav-container"
      color="default"
      elevation={skin === 'bordered' ? 0 : 2}
      position={appBar === 'fixed' ? 'sticky' : 'static'}
      sx={{
        alignItems: 'center',
        color: 'text.primary',
        justifyContent: 'center',
        ...appBar === 'static' && { zIndex: 13 },
        transition: 'border-bottom 0.2s ease-in-out',
        ...appBarBlur && { backdropFilter: 'blur(6px)' },
        backgroundColor: (theme) => hexToRGBA(theme.palette.background.paper, appBarBlur ? 0.95 : 1),
        ...skin === 'bordered' && { borderBottom: (theme) => `1px solid ${theme.palette.divider}` },
        ...userAppBarStyle
      }}
      {...userAppBarProps}
    >
      {/* Navbar / AppBar */}
      <Box
        className="layout-navbar"
        sx={{
          width: '100%',
          ...navHidden ? {} : { borderBottom: (theme) => `1px solid ${theme.palette.divider}` }
        }}
      >
        <Toolbar
          className="navbar-content-container"
          sx={{
            mx: 'auto',
            ...contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } },
            minHeight: (theme) => `${(theme.mixins.toolbar.minHeight as number) - 2}px !important`
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {appBarBranding
              ? appBarBranding(props)
              : (
              <LinkStyled to="/">
                <svg fill="none" viewBox="0 0 32 22" width={34} xmlns="http://www.w3.org/2000/svg">
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
                <Typography
                  sx={{
                    fontWeight: 700,
                    lineHeight: '24px',
                    ml: 2.5
                  }}
                  variant="h4"
                >
                  {themeConfig.templateName}
                </Typography>
              </LinkStyled>
              )}
            {appBarContent ? appBarContent(props) : null}
          </Box>
        </Toolbar>
      </Box>
      {/* Navigation Menu */}
      {navHidden
        ? null
        : (
        <Box className="layout-horizontal-nav" sx={{ width: '100%', ...navMenu?.sx }}>
          <Toolbar
            className="horizontal-nav-content-container"
            sx={{
              mx: 'auto',
              ...contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } },
              minHeight: (theme) => `${(theme.mixins.toolbar.minHeight as number) - 4 - (skin === 'bordered' ? 1 : 0)}px !important`
            }}
          >
            {(navMenu?.content && navMenu?.content(props)) || (
              <Navigation
                {...props}
                horizontalNavItems={navMenu?.navItems} />
            )}
          </Toolbar>
        </Box>
        )}
    </AppBar>
  );
};

HorizontalAppBar.displayName = 'HorizontalAppBar';

export { HorizontalAppBar };
