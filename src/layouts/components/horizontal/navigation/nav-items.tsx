import type { FC } from 'react';

import type { NavigationGroup } from '@nxweb/react/layout';

import type { Settings } from '@hooks/use-settings.js';
import type { HorizontalNavItemsType } from '@layouts/types.js';

import { HorizontalNavGroup } from './nav-group.js';
import { HorizontalNavLink } from './nav-link.js';

interface Props {
  readonly hasParent?: boolean
  readonly horizontalNavItems?: readonly HorizontalNavItemsType[]
  readonly settings: Settings
}

const resolveComponent = (item: HorizontalNavItemsType) => {
  if ((item as NavigationGroup).children) return HorizontalNavGroup;

  return HorizontalNavLink;
};

// eslint-disable-next-line react/require-default-props
const HorizontalNavItems: FC<Props> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const RenderMenuItems = props.horizontalNavItems?.map((item: HorizontalNavItemsType, index: number) => {
    const TagName = resolveComponent(item);

    // @ts-expect-error dynamic tags
    // eslint-disable-next-line react/no-array-index-key
    return <TagName {...props} item={item} key={index} />;
  });

  return <>{RenderMenuItems}</>;
};

HorizontalNavItems.displayName = 'HorizontalNavItems';

export { HorizontalNavItems };
