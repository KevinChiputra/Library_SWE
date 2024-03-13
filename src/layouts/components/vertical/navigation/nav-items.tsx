import type { FC } from 'react';

import type { NavigationGroup, NavigationItem, NavigationSection } from '@nxweb/react/layout';

import type { LayoutProps, VerticalNavItemsType } from '@layouts/types.js';

import { VerticalNavGroup } from './nav-group.js';
import { VerticalNavLink } from './nav-link.js';
import { VerticalNavSection } from './nav-section.js';

interface Props {
  readonly currentActiveGroup: string[]
  readonly groupActive: string[]
  readonly isSubToSub?: NavigationGroup
  readonly navHover?: boolean
  readonly navigationBorderWidth: number
  readonly navVisible?: boolean
  readonly parent?: NavigationGroup
  readonly saveSettings: LayoutProps['saveSettings']
  readonly setCurrentActiveGroup: (item: string[]) => void
  readonly setGroupActive: (value: string[]) => void
  readonly settings: LayoutProps['settings']
  readonly verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
}

const resolveNavItemComponent = (item: VerticalNavItemsType) => {
  if ((item as NavigationSection).section) return VerticalNavSection;
  if ((item as NavigationGroup).children) return VerticalNavGroup;
  if ((item as NavigationItem).content) return null;

  return VerticalNavLink;
};

// eslint-disable-next-line react/require-default-props
const VerticalNavItems: FC<Props> = (props) => {
  const { verticalNavItems } = props;

  const RenderMenuItems = verticalNavItems?.map((item: VerticalNavItemsType, index: number) => {
    const TagName = resolveNavItemComponent(item);

    return TagName !== null
      // @ts-expect-error dynamic tags
      ? <TagName {...props} item={item} key={index} /> // eslint-disable-line react/no-array-index-key
      : null;
  });

  return <>{RenderMenuItems}</>;
};

VerticalNavItems.displayName = 'VerticalNavItems';

export { VerticalNavItems };
