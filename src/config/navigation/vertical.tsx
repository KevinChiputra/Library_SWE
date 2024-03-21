import { History, Mail, ShoppingCart, SmartHome } from '@nxweb/icons/tabler';

import type { VerticalNavItemsType } from '@layouts/types.js';

export const navigation: readonly VerticalNavItemsType[] = [
  {
    icon: <SmartHome />,
    id: 'home',
    link: '/home',
    text: 'Home'
  },
  {
    icon: <Mail />,
    id: 'books',
    link: '/books',
    text: 'Books'
  },
  {
    icon: <ShoppingCart />,
    id: 'cart',
    link: '/cart',
    text: 'Cart'
  },
  {
    icon: <History />,
    id: 'transaction-history',
    link: '/transaction-history',
    text: 'Transaction History'
  }
];
