import type { FC, ReactNode } from 'react';
import { useContext } from 'react';

import type { NavigationGroup, NavigationItem, NavigationLink } from '@nxweb/react/layout';

import { AbilityContext } from './can.js';

interface Props {
  readonly children: ReactNode
  readonly item?: NavigationGroup
}

const CanViewNavGroup: FC<Props> = ({ children, item = undefined }) => {
  const ability = useContext(AbilityContext);

  const checkForVisibleChild = (arr: readonly (NavigationGroup | NavigationItem | NavigationLink)[]): boolean => {
    return arr.some((i) => {
      if ('children' in i && i.children) {
        return checkForVisibleChild(i.children);
      }

      return ability?.can(i.action, i.subject);
    });
  };

  const canViewMenuGroup = (item: NavigationGroup) => {
    const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children);

    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild;
    }

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild;
  };

  if (item && item.auth === false) {
    return <>{children}</>;
  }

  return item && canViewMenuGroup(item) ? <>{children}</> : null;
};

CanViewNavGroup.displayName = 'CanViewNavGroup';

export { CanViewNavGroup };
