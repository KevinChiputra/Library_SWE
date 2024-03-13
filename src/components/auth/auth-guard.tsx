import type { FC, ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/use-auth.js';

interface AuthGuardProps {
  readonly children: ReactNode
  readonly fallback: ReactElement | null
}

const AuthGuard: FC<AuthGuardProps> = ({ children, fallback: _ }) => {
  const { data: auth, loggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => {
      /*
       * TODO: react-router-dom does not have ready mechanism
       * if (!router.isReady) {
       *   return;
       * }
       */

      // TODO: auth.user
      if (auth.user === null && !loggedIn) {
        if (location.pathname !== '/') {
          navigate(`/login?returnUrl=${location.pathname}`, {
            replace: true
          });
        } else {
          navigate('/login', { replace: true });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  /*
   * TODO:
   * if (auth.loading || auth.user === null) {
   *   return fallback;
   * }
   */

  return <>{children}</>;
};

AuthGuard.displayName = 'AuthGuard';

export { AuthGuard };
