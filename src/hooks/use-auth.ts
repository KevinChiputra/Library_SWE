import { useMemo } from 'react';

interface AuthData {
  role?: string
  user: string | null
}

interface AuthState<T extends AuthData = AuthData> {
  data: T
  loggedIn: boolean
  login: (data: T) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = () => {
  const auth: AuthState = useMemo(() => {
    const data = window.localStorage.getItem('userData');

    return {
      data: data ? JSON.parse(data) as AuthData : { user: null },
      get loggedIn() {
        return !!window.localStorage.getItem('userData');
      },
      login(data) {
        window.localStorage.setItem('userData', JSON.stringify(data));

        return Promise.resolve();
      },
      logout() {
        window.localStorage.removeItem('userData');

        return Promise.resolve();
      }
    };
  }, []);

  return auth;
};
