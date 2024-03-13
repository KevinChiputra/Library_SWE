import { lazy } from 'react';

import type { Route, RouteProps } from '@nxweb/react/router';

export const routes: Route[] = [
  {
    element: (_props: RouteProps) => null,
    path: '/'
  },
  // ** Fallback routes, must be the last route item
  {
    auth: false,
    element: lazy(() => import('@views/errors/404.js')),
    fallback: true,
    layout: 'blank',
    title: '404: Not Found'
  }
];
