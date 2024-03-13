import type { ReactNode } from 'react';

import type { NavigationGroup, NavigationItem, NavigationLink, NavigationSection } from '@nxweb/react/layout';

import type { AppBarProps, PaletteMode, SwipeableDrawerProps, SxProps, Theme } from '@components/material.js';
import type { Settings } from '@hooks/use-settings.js';

export type VerticalNavItemsType = NavigationGroup | NavigationItem | NavigationLink | NavigationSection;
export type HorizontalNavItemsType = NavigationGroup | NavigationLink;

export interface FooterProps {
  content?: (props?: unknown) => ReactNode
  sx?: SxProps<Theme>
}

export interface VerticalLayoutProps {
  appBar?: {
    componentProps?: AppBarProps
    content?: (props?: unknown) => ReactNode
  }
  navMenu: {
    afterContent?: (props?: unknown) => ReactNode
    beforeContent?: (props?: unknown) => ReactNode
    branding?: (props?: unknown) => ReactNode
    componentProps?: Omit<SwipeableDrawerProps, 'onClose' | 'onOpen' | 'open'>
    content?: (props?: unknown) => ReactNode
    lockedIcon?: ReactNode
    navItems?: readonly VerticalNavItemsType[]
    unlockedIcon?: ReactNode
  }
}

export interface HorizontalLayoutProps {
  appBar?: {
    branding?: (props?: unknown) => ReactNode
    componentProps?: AppBarProps
    content?: (props?: unknown) => ReactNode
  }
  navMenu?: {
    content?: (props?: unknown) => ReactNode
    navItems?: readonly HorizontalNavItemsType[]
    sx?: SxProps<Theme>
  }
}

export interface LayoutProps {
  children?: ReactNode
  contentHeightFixed?: boolean
  footerProps?: FooterProps
  hidden: boolean
  horizontalLayoutProps?: HorizontalLayoutProps
  saveSettings: (values: Settings) => void
  scrollToTop?: (props?: unknown) => ReactNode
  settings: Settings
  verticalLayoutProps: VerticalLayoutProps
}

export type Skin = 'bordered' | 'default';
export type Mode = PaletteMode | 'semi-dark';
export type AppBar = 'fixed' | 'hidden' | 'static';
export type ContentWidth = 'boxed' | 'full';
export type Footer = 'fixed' | 'hidden' | 'static';
export type HorizontalMenuToggle = 'click' | 'hover';
export type VerticalNavToggle = 'accordion' | 'collapse';
export type ThemeColor = 'error' | 'info' | 'primary' | 'secondary' | 'success' | 'warning';
