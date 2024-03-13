import createCache from '@emotion/cache';

export const createEmotionCache = (key: string = 'css') => {
  return createCache({ key });
};
