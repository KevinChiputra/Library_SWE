import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Circle, CircleDot, X as XIcon } from '@nxweb/icons/tabler';

import { Box, IconButton, styled, Typography, useTheme } from '@components/material.js';
import type { BoxProps, TypographyProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { LayoutProps } from '@layouts/types.js';

interface Props {
  readonly collapsedNavWidth: number
  readonly hidden: LayoutProps['hidden']
  readonly menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  readonly menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
  readonly navHover: boolean
  readonly navigationBorderWidth: number
  readonly navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  readonly saveSettings: LayoutProps['saveSettings']
  readonly settings: LayoutProps['settings']
  readonly toggleNavVisibility: () => void
}

const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  minHeight: theme.mixins.toolbar.minHeight,
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out'
}));

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
});

const LinkStyled = styled(Link)({
  alignItems: 'center',
  display: 'flex',
  textDecoration: 'none'
});

// eslint-disable-next-line react/require-default-props
const VerticalNavHeader: FC<Props> = (props) => {
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props;

  const theme = useTheme();
  const { navCollapsed } = settings;
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      }

      return (collapsedNavWidth - navigationBorderWidth - 34) / 8;
    }

    return 6;
  };

  return (
    <MenuHeaderWrapper className="nav-header" sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding
        ? userNavMenuBranding(props)

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
          <HeaderTitle sx={{ ...menuCollapsedStyles, ...navCollapsed && !navHover ? {} : { ml: 2.5 } }} variant="h4">
            {themeConfig.templateName}
          </HeaderTitle>
        </LinkStyled>
        )}

      {hidden
        ? (
        <IconButton
          disableFocusRipple={true}
          disableRipple={true}
          sx={{
            backgroundColor: 'transparent !important',
            color: 'text.secondary',
            p: 0
          }}
          onClick={toggleNavVisibility}
        >
          <XIcon fontSize="1.25rem" />
        </IconButton>
        )
        : userMenuLockedIcon === null && userMenuUnlockedIcon === null
          ? null
          : (
        <IconButton
          disableFocusRipple={true}
          disableRipple={true}
          sx={{
            backgroundColor: 'transparent !important',
            color: 'text.primary',
            p: 0,

            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
        >
          {navCollapsed
            ? userMenuUnlockedIcon || <Circle />
            : userMenuLockedIcon || <CircleDot /> }
        </IconButton>
          )}
    </MenuHeaderWrapper>
  );
};

VerticalNavHeader.displayName = 'VerticalNavHeader';

export { VerticalNavHeader };
