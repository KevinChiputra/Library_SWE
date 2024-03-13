import type { FC } from 'react';

import { Box } from '@components/material.js';
import { ModeToggler } from '@components/mode-toggler.js';
import { UserDropdown } from '@components/user-dropdown.js';
import type { Settings } from '@hooks/use-settings.js';

interface Props {
  readonly saveSettings: (values: Settings) => void
  readonly settings: Settings
}

const AppBarContent: FC<Props> = ({ settings, saveSettings }) => {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex' }}>
      <ModeToggler saveSettings={saveSettings} settings={settings} />
      <UserDropdown settings={settings} />
    </Box>
  );
};

AppBarContent.displayName = 'AppBarContent';

export { AppBarContent };
