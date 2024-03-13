import { createContext } from 'react';

import { createContextualCan } from '@casl/react';

import type { AnyAbility } from '@casl/ability';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AbilityContext = createContext<AnyAbility>(undefined!);

export default createContextualCan(AbilityContext.Consumer);
