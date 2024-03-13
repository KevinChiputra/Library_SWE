import type { Layout } from '@nxweb/react/layout';
import { LayoutRegistry } from '@nxweb/react/layout';

import { BlankLayoutWithAppBar } from '@layouts/blank-layout-with-appbar.js';
import { BlankLayout } from '@layouts/blank-layout.js';
import { HorizontalLayout } from '@layouts/horizontal-layout.js';
import { VerticalLayout } from '@layouts/vertical-layout.js';

// ** All of the available layouts
const layouts = new LayoutRegistry({
  appbar: BlankLayoutWithAppBar,
  blank: BlankLayout,
  default: VerticalLayout as Layout,
  horizontal: HorizontalLayout as Layout,
  vertical: VerticalLayout as Layout
});

export { layouts };
