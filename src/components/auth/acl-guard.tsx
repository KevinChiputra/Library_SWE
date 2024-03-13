import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Ability, AbilityBuilder } from '@casl/ability';

import { FallbackSpinner as Spinner } from '@components/spinner.js';
import { useAuth } from '@hooks/use-auth.js';
import { BlankLayout } from '@layouts/blank-layout.js';
import { AbilityContext } from '@layouts/components/acl/can.js';
import NotAuthorized from '@views/errors/401.js';

import type { ACLObj } from './types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppAbility = Ability as any;

interface AclGuardProps {
  readonly aclAbilities: ACLObj
  readonly authGuard?: boolean
  readonly children: ReactNode
  readonly guestGuard?: boolean
}

// TODO: rules based on NEXTID scope
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(Ability);

  if (role === 'admin') {
    can('manage', 'all');
  } else if (role === 'client') {
    can(['read'], 'acl-page');
  } else {
    can(['read', 'create', 'update', 'delete'], subject);
  }

  return rules;
};

const buildAbilityFor = (role: string, subject: string): typeof AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    /*
     * https://casl.js.org/v5/en/guide/subject-type-detection
     * @ts-ignore
     */
    detectSubjectType: (object: { type: unknown }) => object.type
  });
};

// eslint-disable-next-line react/require-default-props
const AclGuard: FC<AclGuardProps> = (props) => {
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props;

  const { data: auth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  let ability: typeof AppAbility = undefined;

  useEffect(() => {
    if (auth.user && auth.role && !guestGuard && location.pathname === '/') {
      const homeRoute = '/home'; // TODO: getHomeRoute(auth.user.role);

      navigate(homeRoute, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user, guestGuard]);

  // User is logged in, build ability for the user based on his role
  if (auth.user && auth.role && !ability) {
    ability = buildAbilityFor(auth.role, aclAbilities.subject);

    if (location.pathname === '/') {
      return <Spinner />;
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || location.pathname === '/404' || location.pathname === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
    }

    // If user is not logged in (render pages like login, register etc..)
    return <>{children}</>;
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (location.pathname === '/') {
      return <Spinner />;
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized path={location.pathname} />
    </BlankLayout>
  );
};

AclGuard.displayName = 'AclGuard';

export { AclGuard };
