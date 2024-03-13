import type { FC, PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

import { usePageTitle } from '@nxweb/react/hooks';
import type { LayoutWrapperProps } from '@nxweb/react/layout';

import { AclGuard } from '@components/auth/acl-guard.js';
import { AuthGuard } from '@components/auth/auth-guard.js';
import { GuestGuard } from '@components/auth/guest-guard.js';
import type { ACLObj } from '@components/auth/types.js';
import { FallbackSpinner as Spinner } from '@components/spinner.js';
import { app } from '@config/app.js';
import { routes } from '@config/routes.js';
import { useSettings } from '@hooks/use-settings.js';
import { ThemeComponent } from '@lib/theme/component.js';

import { UserLayout } from './components/user-layout.js';

interface GuardProps extends PropsWithChildren {
  readonly authGuard: boolean
  readonly guestGuard: boolean
}

const Guard: FC<GuardProps> = ({
  children = undefined, authGuard, guestGuard
}) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  }

  if (!guestGuard && !authGuard) {
    return <>{children}</>;
  }

  return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
};

Guard.displayName = 'Guard';

const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
};

const LayoutWrapper: FC<LayoutWrapperProps> = ({
  children = null, ...props
}) => {
  const location = useLocation();
  const { settings } = useSettings();
  const [_, setTitle] = usePageTitle({ appName: app.name });

  const authGuard = props.route?.id === '*'
    ? false
    : props.route?.auth !== false;
  const guestGuard = props.route?.guest === true;
  const aclAbilities = props.route?.meta?.acl as ACLObj ?? defaultACLObj;

  useEffect(() => {
    // eslint-disable-next-line react/destructuring-assignment
    const [{ route }] = (matchRoutes(routes, location) ?? [{ route: props.route }]).slice(-1);

    route?.title && setTitle(route?.title);

    return () => {
      setTitle('');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ThemeComponent settings={settings}>
      <Guard authGuard={authGuard} guestGuard={guestGuard}>
        <AclGuard aclAbilities={aclAbilities} authGuard={authGuard} guestGuard={guestGuard}>
          <UserLayout {...props}>
            {children}
          </UserLayout>
        </AclGuard>
      </Guard>
    </ThemeComponent>
  );
};

LayoutWrapper.displayName = 'LayoutWrapper';

export { LayoutWrapper };
