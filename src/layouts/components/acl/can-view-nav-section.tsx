import { useContext } from 'react';
import type { FC, ReactNode } from 'react';

import type { NavigationSection } from '@nxweb/react/layout';

import { AbilityContext } from './can.js';

interface Props {
  readonly children: ReactNode
  readonly item?: NavigationSection
}

const CanViewNavSection: FC<Props> = ({ children, item = undefined }) => {
  const ability = useContext(AbilityContext);

  if (item && item.auth === false) {
    return <>{children}</>;
  }

  return ability && ability.can(item?.action, item?.subject) ? <>{children}</> : null;
};

CanViewNavSection.displayName = 'CanViewNavSection';

export { CanViewNavSection };
