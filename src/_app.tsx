import {  Suspense } from 'react';
import type { FC } from 'react';

import { CacheProvider } from '@emotion/react';

import type { LayoutWrapperProps } from '@nxweb/react';
import { createEmotionCache, Head } from '@nxweb/react';
import { PageSpinner } from '@nxweb/react-bootstrap';

import { app } from '@config/app.js';
import { SettingsProvider } from '@hooks/use-settings.js';
import { LayoutWrapper } from '@layouts/wrapper.js';

/*
 * Uncomment to import additional stylesheets for this App
 * import '@styles/index.scss';
 */

const clientSideEmotionCache = createEmotionCache();

// eslint-disable-next-line react/require-default-props
const App: FC<LayoutWrapperProps> = ({
  emotionCache = clientSideEmotionCache, ...props
}) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{app.name}</title>
        <meta content={`${app.name} — ${app.description}`} name="description" />
        <meta content={app.keywords.join(',')} name="keywords" />
        <meta content="initial-scale=1, width=device-width" name="viewport" />
      </Head>

      {/* <AuthProvider
        config={auth}
        debug={true}
        disabled={true}
        error={(api, path) => (
          !api.authenticated
            ? <Navigate replace={true} to="/login" />
            : <Error401 api={api} path={path} />)}
        exclude={[
          { exact: true, path: '/' },
          { exact: true, path: '/login' }
        ]}
        loader={<PageSpinner />}
        manual={true}
      > */}
        <SettingsProvider>
          <Suspense fallback={<PageSpinner />}>
            <LayoutWrapper emotionCache={emotionCache} {...props} />
          </Suspense>
        </SettingsProvider>
      {/* </AuthProvider> */}
    </CacheProvider>
  );
};

App.displayName = 'App';

export default App;
