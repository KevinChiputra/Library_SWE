import type { FC, ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '@hooks/use-auth.js';

interface GuestGuardProps {
  readonly children: ReactNode
  readonly fallback: ReactElement | null
}

const GuestGuard: FC<GuestGuardProps> = ({ children, fallback: _ }) => {
  const { loggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    /*
     * TODO: react-router-dom does not have ready mechanism
     * if (!router.isReady) {
     *   return;
     * }
     */

    if (loggedIn) {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /*
   * TODO: replace with nextid
   * if (auth.loading || (!auth.loading && auth.user !== null)) {
   *   return fallback;
   * }
   */

  return <>{children}</>;
};

GuestGuard.displayName = 'GuestGuard';

export { GuestGuard };
