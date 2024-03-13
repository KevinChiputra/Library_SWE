import type { ElementType, FC } from 'react';
import { cloneElement, Fragment, isValidElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { classNames } from '@nxweb/core/strings';
import type { NavigationLink } from '@nxweb/react/layout';

import { Box, Chip, List, ListItemIcon, ListItem as MuiListItem, styled, Typography } from '@components/material.js';
import type { ChipProps, ListItemProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';
import { CanViewNavLink } from '@layouts/components/acl/can-view-nav-link.js';
import { handleURLQueries } from '@layouts/utils.js';
import { hexToRGBA } from '@lib/hex-to-rgba.js';

import { Translation } from '../../translation.js';

interface Props {
  readonly hasParent?: boolean
  readonly item: NavigationLink
  readonly settings: Settings
}

const ListItem = styled(MuiListItem)<
ListItemProps & { component?: ElementType, target?: '_blank' | undefined, to: string }
>(({ theme }) => ({
  '&.active .MuiTypography-root': {
    fontWeight: 500
  },
  '&.active .MuiTypography-root, &.active .MuiListItemIcon-root': {
    color: theme.palette.primary.main
  },
  '&.active, &.active:hover': {
    backgroundColor: hexToRGBA(theme.palette.primary.main, 0.08)
  },
  '&:focus-visible': {
    backgroundColor: theme.palette.action.focus,
    outline: 0
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  borderRadius: theme.shape.borderRadius,
  width: 'auto'
}));

const HorizontalNavLink: FC<Props> = ({ item, settings, hasParent = undefined }) => {
  const location = useLocation();
  const { navSubItemIcon, menuTextTruncate } = themeConfig;

  const icon = item.icon ? item.icon : navSubItemIcon;

  const Wrapper = !hasParent ? List : Fragment;

  const isNavLinkActive = () => {
    if (location.pathname === item.link || handleURLQueries(location, item.link)) {
      return true;
    }

    return false;
  };

  return (
    <CanViewNavLink item={item}>
      <Wrapper {...(!hasParent ? { component: 'div', sx: { py: settings.skin === 'bordered' ? 2.625 : 2.75 } } : {})}>
        <ListItem
          component={Link}
          disabled={item.disabled}
          {...(item.disabled && { tabIndex: -1 })}
          className={classNames({ active: isNavLinkActive() })}
          sx={{
            ...item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' },
            ...!hasParent
              ? {
                '&.active, &.active:hover': {
                  '& .MuiTypography-root, & .MuiListItemIcon-root': {
                    color: 'common.white'
                  },
                  '&:focus-visible': {
                    background: (theme: { palette: { primary: { dark: string } } }) => `linear-gradient(72.47deg, ${theme.palette.primary.dark} 22.16%, ${hexToRGBA(
                      theme.palette.primary.dark,
                      0.7
                    )} 76.47%)`
                  },
                  background: (theme: { palette: { primary: { main: string } } }) => `linear-gradient(72.47deg, ${theme.palette.primary.main} 22.16%, ${hexToRGBA(
                    theme.palette.primary.main,
                    0.7
                  )} 76.47%)`,
                  boxShadow: (theme: { palette: { primary: { main: string } } }) => `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`
                }
              }
              : {
                '&.active, &.active:hover': {
                  '&:focus-visible': {
                    backgroundColor: (theme: { palette: { primary: { main: string } } }) => hexToRGBA(theme.palette.primary.main, 0.24)
                  }
                },
                mx: 2,
                width: (theme: { spacing: (arg0: number) => unknown }) => `calc(100% - ${theme.spacing(2 * 2)})`
              }
          }}
          target={item.external ? '_blank' : undefined}
          to={item.link === undefined ? '/' : `${item.link}`}
          onClick={(e: { preventDefault: () => void, stopPropagation: () => void }) => {
            if (item.link === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ...menuTextTruncate && { overflow: 'hidden' }
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'text.secondary',
                  mr: 2
                }}
              >
                { isValidElement(icon)
                  ? cloneElement(icon, { ...icon.props || {}, fontSize: icon === navSubItemIcon ? '0.625rem' : '1.375rem' })
                  : null }
              </ListItemIcon>
              <Typography {...(menuTextTruncate && { noWrap: true })} sx={{ color: 'text.secondary' }}>
                <Translation text={item.text} />
              </Typography>
            </Box>
            {item.badge
              ? typeof item.badge === 'object' && 'content' in item.badge
                ? (
                  <Chip
                    color={item.badge.color as ChipProps['color'] || 'primary'}
                    label={item.badge.content}
                    size="small"
                    sx={{
                      height: 22,
                      minWidth: 22,

                      '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                    }} />
                )
                : item.badge
              : null }
          </Box>
        </ListItem>
      </Wrapper>
    </CanViewNavLink>
  );
};

HorizontalNavLink.displayName = 'HorizontalNavLink';

export { HorizontalNavLink };
