import { useContext } from 'react';
import type { FC, ReactNode } from 'react';

import type { NavigationLink } from '@nxweb/react/layout';

import { AbilityContext } from './can.js';

interface Props {
  readonly children: ReactNode
  readonly item?: NavigationLink
}

const CanViewNavLink: FC<Props> = ({ children, item = undefined }) => {
  const ability = useContext(AbilityContext);

  if (item && item.auth === false) {
    return <>{children}</>;
  }

  return ability && ability.can(item?.action, item?.subject) ? <>{children}</> : null;
};

CanViewNavLink.displayName = 'CanViewNavLink';

export { CanViewNavLink };
