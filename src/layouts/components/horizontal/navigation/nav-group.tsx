import type { FC, SyntheticEvent } from 'react';
import { cloneElement, Fragment, isValidElement, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { useLocation } from 'react-router-dom';

import { classNames } from '@nxweb/core/strings';
import { ChevronDown, ChevronLeft, ChevronRight } from '@nxweb/icons/tabler';
import type { NavigationGroup } from '@nxweb/react/layout';

import {
  Box, Chip, ClickAwayListener, Fade,
  List, ListItemIcon, ListItem as MuiListItem,
  Paper, styled, Typography, useTheme
} from '@components/material.js';
import type { ChipProps, ListItemProps } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type { Settings } from '@hooks/use-settings.js';
import { CanViewNavGroup } from '@layouts/components/acl/can-view-nav-group.js';
import { Translation } from '@layouts/components/translation.js';
import type { HorizontalNavItemsType } from '@layouts/types.js';
import { hasActiveChild } from '@layouts/utils.js';
import { hexToRGBA } from '@lib/hex-to-rgba.js';

import { HorizontalNavItems } from './nav-items.js';

interface Props {
  readonly hasParent?: boolean
  readonly item: NavigationGroup
  readonly settings: Settings
}

// ** Styled Components
const ListItem = styled(MuiListItem)<ListItemProps>(({ theme }) => ({
  '&:hover': {
    background: theme.palette.action.hover
  },
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer'
}));

const NavigationMenu = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxHeight: 'calc(100vh - 13rem)',
  overflowY: 'auto',
  padding: theme.spacing(2, 0),
  ...themeConfig.menuTextTruncate ? { width: 250 } : { minWidth: 250 },
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(1)
  },

  '&::-webkit-scrollbar': {
    width: 6
  },
  '&::-webkit-scrollbar-thumb': {
    background: hexToRGBA(theme.palette.mode === 'light' ? '#B0ACB5' : '#575468', 0.6),
    borderRadius: 20
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
    borderRadius: 20
  },

  '& .MuiList-root': {
    paddingBottom: 0,
    paddingTop: 0
  },

  '& .menu-group.Mui-selected': {
    backgroundColor: theme.palette.action.hover
  }
}));

// eslint-disable-next-line complexity, react/require-default-props
const HorizontalNavGroup: FC<Props> = (props) => {
  const { item, hasParent, settings } = props;

  // ** Hooks & Vars
  const theme = useTheme();
  const location = useLocation();
  const currentURL = location.pathname;
  const { skin, direction } = settings;
  const { navSubItemIcon, menuTextTruncate, horizontalMenuToggle, horizontalMenuAnimation } = themeConfig;

  const popperOffsetHorizontal = direction === 'rtl' ? 16 : -16;
  const popperPlacement = direction === 'rtl' ? 'bottom-end' : 'bottom-start';
  const popperPlacementSubMenu = direction === 'rtl' ? 'left-start' : 'right-start';

  // ** States
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [popperElement, setPopperElement] = useState(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [referenceElement, setReferenceElement] = useState(null);

  const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
    modifiers: [
      {
        enabled: true,
        name: 'offset',
        options: {
          offset: hasParent ? [-8, 19] : [popperOffsetHorizontal, -2]
        }
      },
      {
        enabled: true,
        name: 'flip'
      }
    ],
    placement: hasParent ? popperPlacementSubMenu : popperPlacement
  });

  const handleGroupOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);

    update?.();
  };

  const handleGroupClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const handleMenuToggleOnClick = (event: SyntheticEvent) => {
    if (anchorEl) {
      handleGroupClose();
    } else {
      handleGroupOpen(event);
    }
  };

  useEffect(() => {
    handleGroupClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const icon = item.icon ? item.icon : navSubItemIcon;
  const toggleIcon = direction === 'rtl' ? <ChevronLeft fontSize="1.125rem" /> : <ChevronRight fontSize="1.125rem" />;

  const WrapperCondition = horizontalMenuToggle === 'click';
  const MainWrapper = WrapperCondition ? ClickAwayListener : 'div';
  const ChildWrapper = WrapperCondition ? 'div' : Fragment;
  const AnimationWrapper = horizontalMenuAnimation ? Fade : Fragment;

  const childMenuGroupStyles = () => {
    if (attributes && attributes.popper) {
      if (direction === 'ltr') {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'left';
        }

        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'right';
        }
      } else {
        if (attributes.popper['data-popper-placement'] === 'right-start') {
          return 'right';
        }

        if (attributes.popper['data-popper-placement'] === 'left-start') {
          return 'left';
        }
      }
    }
  };

  return (
    <CanViewNavGroup item={item}>
      {/* @ts-expect-error incomplete type declaration */}
      <MainWrapper {...(WrapperCondition ? { onClickAway: handleGroupClose } : { onMouseLeave: handleGroupClose })}>
        <ChildWrapper>
          <List component="div" sx={{ py: skin === 'bordered' ? 2.625 : 2.75 }}>
            <ListItem
              aria-haspopup="true"
              {...(WrapperCondition ? {} : { onMouseEnter: handleGroupOpen })}
              className={classNames('menu-group', { 'Mui-selected': hasActiveChild(item, currentURL) })}
              {...(horizontalMenuToggle === 'click' ? { onClick: handleMenuToggleOnClick } : {})}
              sx={{
                ...menuOpen ? { backgroundColor: 'action.hover' } : {},
                ...!hasParent
                  ? {
                    '&.Mui-selected': {
                      background: `linear-gradient(72.47deg, ${
                        theme.direction === 'ltr'
                          ? theme.palette.primary.main
                          : hexToRGBA(theme.palette.primary.main, 0.7)
                      } 22.16%, ${
                        theme.direction === 'ltr'
                          ? hexToRGBA(theme.palette.primary.main, 0.7)
                          : theme.palette.primary.main
                      } 76.47%)`,
                      boxShadow: `0px 2px 6px ${hexToRGBA(theme.palette.primary.main, 0.48)}`,

                      '& .MuiTypography-root, & .MuiListItemIcon-root, & svg': {
                        color: 'common.white'
                      }
                    }
                  }
                  : { mx: 2, width: `calc(100% - ${theme.spacing(2 * 2)})` }
              }}
            >
              <Box
                ref={setReferenceElement}
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  justifyContent: 'space-between',
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    ...menuTextTruncate && { overflow: 'hidden' }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: menuOpen ? 'text.primary' : 'text.secondary',
                      mr: 2
                    }}
                  >
                    { isValidElement(icon)
                      ? cloneElement(icon, { ...icon.props || {}, fontSize: icon === navSubItemIcon ? '0.625rem' : '1.375rem' })
                      : null }
                  </ListItemIcon>
                  <Typography
                    {...(menuTextTruncate && { noWrap: true })}
                    sx={{ color: menuOpen ? 'text.primary' : 'text.secondary' }}
                  >
                    <Translation text={item.text} />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    color: menuOpen ? 'text.secondary' : 'text.disabled',
                    display: 'flex'
                  }}
                >
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
                            mr: 2,

                            '& .MuiChip-label': { px: 1.5, textTransform: 'capitalize' }
                          }} />
                      )
                      : item.badge
                    : null}
                  { hasParent
                    ? toggleIcon
                    : <ChevronDown fontSize="1.125rem" /> }
                </Box>
              </Box>
            </ListItem>
            <AnimationWrapper
              {...(horizontalMenuAnimation && {
                in: menuOpen,
                timeout: {
                  enter: 400,
                  exit: 300
                }
              })}
            >
              <Box
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                sx={{
                  zIndex: theme.zIndex.appBar,
                  ...!horizontalMenuAnimation && { display: menuOpen ? 'block' : 'none' },
                  pl: childMenuGroupStyles() === 'left' ? skin === 'bordered' ? 1.5 : 1.25 : 0,
                  pr: childMenuGroupStyles() === 'right' ? skin === 'bordered' ? 1.5 : 1.25 : 0,
                  ...hasParent ? { position: 'fixed !important' } : { pt: skin === 'bordered' ? 5.25 : 5.5 }
                }}
              >
                <NavigationMenu
                  sx={{
                    ...hasParent
                      ? {
                        maxHeight: 'calc(100vh - 21rem)',
                        overflowX: 'visible',
                        overflowY: 'auto'
                      }
                      : {},
                    ...skin === 'bordered'
                      ? {
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: 0
                      }
                      : { boxShadow: 6 }
                  }}
                >
                  <HorizontalNavItems {...props} hasParent={true} horizontalNavItems={item.children as readonly HorizontalNavItemsType[]} />
                </NavigationMenu>
              </Box>
            </AnimationWrapper>
          </List>
        </ChildWrapper>
      </MainWrapper>
    </CanViewNavGroup>
  );
};

HorizontalNavGroup.displayName = 'HorizontalNavGroup';

export { HorizontalNavGroup };
