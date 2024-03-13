import { cloneElement,  isValidElement,  useEffect, useRef } from 'react';
import type { FC } from 'react';

import type { LayoutWrapperProps } from '@nxweb/react/layout';

import type { Theme } from '@components/material.js';
import { useMediaQuery } from '@components/material.js';
import { navigation as horizontalNavItems } from '@config/navigation/horizontal.js';
import { navigation as verticalNavItems } from '@config/navigation/vertical.js';
import { useSettings } from '@hooks/use-settings.js';

/*
 * ** Component Import
 * Uncomment the below line (according to the layout type) when using server-side menu
 * import ServerSideVerticalNavItems from './components/vertical/ServerSideNavItems'
 * import ServerSideHorizontalNavItems from './components/horizontal/ServerSideNavItems'
 */

import { AppBarContent as HorizontalAppBarContent } from './horizontal/app-bar-content.js';
import { AppBarContent as VerticalAppBarContent } from './vertical/app-bar-content.js';

const UserLayout: FC<LayoutWrapperProps> = ({
  children = undefined,
  route,
  ...props
}) => {
  const { settings, saveSettings } = useSettings();
  const isCollapsed = useRef(settings.navCollapsed);

  /*
   * ** Vars for server side navigation
   * const { menuItems: verticalMenuItems } = ServerSideVerticalNavItems()
   * const { menuItems: horizontalMenuItems } = ServerSideHorizontalNavItems()
   */

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/material-ui/react-use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical';
  }

  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, layout: 'vertical', navCollapsed: false });
        isCollapsed.current = true;
      }
    } else if (isCollapsed.current) {
      saveSettings({ ...settings, layout: settings.lastLayout, navCollapsed: true });
      isCollapsed.current = false;
    } else if (settings.lastLayout !== settings.layout) {
      saveSettings({ ...settings, layout: settings.lastLayout });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  const childProps = {
    ...props,
    contentHeightFixed: route?.meta?.fixedHeight ?? false,
    hidden,
    route,
    saveSettings,
    settings,
    verticalLayoutProps: {
      appBar: {
        content: (props: { readonly toggleNavVisibility: () => void }) => (
          <VerticalAppBarContent
            hidden={hidden}
            saveSettings={saveSettings}
            settings={settings}
            toggleNavVisibility={props.toggleNavVisibility} />
        )
      },
      navMenu: {
        navItems: verticalNavItems

        /*
         * Uncomment the below line when using server-side menu in vertical layout and comment the above line
         * navItems: verticalMenuItems
         */
      }
    },
    ...settings.layout === 'horizontal' && {
      horizontalLayoutProps: {
        appBar: {
          content: () => <HorizontalAppBarContent saveSettings={saveSettings} settings={settings} />
        },
        navMenu: {
          navItems: horizontalNavItems

          /*
           * Uncomment the below line when using server-side menu in horizontal layout and comment the above line
           * navItems: horizontalMenuItems
           */
        }
      }
    }
  };

  return isValidElement(children)
    ? cloneElement(children, { ...childProps })
    : null;
};

UserLayout.displayName = 'UserLayout';

export { UserLayout };
