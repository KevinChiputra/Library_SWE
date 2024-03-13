import type { FC, ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type { Direction } from '@components/material.js';
import { config as themeConfig } from '@config/theme.js';
import type {
  AppBar,
  ContentWidth,
  Footer,
  Mode,
  Skin,
  ThemeColor,
  VerticalNavToggle
} from '@layouts/types.js';

interface Settings {
  appBar?: AppBar
  appBarBlur: boolean
  contentWidth: ContentWidth
  direction: Direction
  footer?: Footer
  lastLayout?: 'horizontal' | 'vertical'
  layout?: 'horizontal' | 'vertical'
  mode: Mode
  navCollapsed: boolean
  navHidden?: boolean // Navigation menu
  skin: Skin
  themeColor: ThemeColor
  toastPosition?:
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right'
  verticalNavToggleType: VerticalNavToggle
}

type PageSpecificSettings = Partial<Settings>;

interface SettingsContextValue {
  saveSettings: (updatedSettings: Settings) => void
  settings: Settings
}

const initialSettings: Settings = {
  appBar:
    themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden'
      ? 'fixed'
      : themeConfig.appBar,
  appBarBlur: themeConfig.appBarBlur,
  contentWidth: themeConfig.contentWidth,
  direction: themeConfig.direction,
  footer: themeConfig.footer,
  lastLayout: themeConfig.layout,
  layout: themeConfig.layout,
  mode: themeConfig.mode,
  navCollapsed: themeConfig.navCollapsed,
  navHidden: themeConfig.navHidden,
  skin: themeConfig.skin,
  themeColor: 'primary',
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType
};

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  lastLayout: initialSettings.lastLayout,
  layout: initialSettings.layout,
  navHidden: initialSettings.navHidden,
  toastPosition: initialSettings.toastPosition
};

const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
});

const useSettings = (): SettingsContextValue => useContext(SettingsContext);

interface SettingsProviderProps {
  readonly children: ReactNode
  readonly pageSettings?: PageSpecificSettings
}

const restoreSettings = (): Settings | null => {
  // let settings = null;
  let settings: Settings | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem('settings');

    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings };
    } else {
      settings = initialSettings;
    }
  } catch (err) {
    console.error(err);
  }

  return settings;
};

const storeSettings = (settings: Settings) => {
  const initSettings = { ...settings };

  delete initSettings.appBar;
  delete initSettings.footer;
  delete initSettings.layout;
  delete initSettings.navHidden;
  delete initSettings.lastLayout;
  delete initSettings.toastPosition;

  window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

const SettingsConsumer = SettingsContext.Consumer;

const SettingsProvider: FC<SettingsProviderProps> = ({
  children,
  pageSettings = undefined
}) => {
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  const saveSettings = useCallback((updatedSettings: Settings) => {
    storeSettings(updatedSettings);
    setSettings(updatedSettings);
  }, []);

  const value = useMemo(() => {
    return { saveSettings, settings };
  }, [settings]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setSettings({ ...restoredSettings });
    }

    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings]);

  useEffect(() => {
    if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
      saveSettings({ ...settings, mode: 'light' });
    }

    if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
      saveSettings({ ...settings, appBar: 'fixed' });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.displayName = 'SettingsProvider';

export { SettingsContext, SettingsConsumer, SettingsProvider, useSettings };
export type { Settings, SettingsContextValue, SettingsProviderProps };
