import React from 'react';

import { WebAuth } from 'auth0-js';

interface AuthContextType {
  accessToken?: string;
  idToken?: string;
  expiresIn?: number;
  refreshToken?: string;
  isAuthenticated: boolean;
  error?: string;
  sucess?: string;
  login: (username: string, password: string, callback: VoidFunction) => void;
  logout: () => void;
  register: (email: string, password: string, callback: VoidFunction) => void;
  forgotPassword: (email: string) => void;
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<AuthContextType>(null!);

const auth0 = new WebAuth({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientID: import.meta.env.VITE_AUTH0_CLIENTID,
  responseType: 'token id_token',
  scope: 'openid profile email offline_access',
  redirectUri: import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI || 'http://127.0.0.1:5173/login',
});

const databaseConnection = 'Username-Password-Authentication';

const IS_AUTHENTICATED_KEY = 'isAuthenticatedKey';
const ACCESS_TOKEN_KEY = 'accessTokenKey';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    localStorage.getItem(IS_AUTHENTICATED_KEY) ? true : false,
  );
  const [accessToken, setAccessToken] = React.useState<string | undefined>(
    localStorage.getItem(ACCESS_TOKEN_KEY) || undefined,
  );
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);

  const login = (username: string, password: string, callback: VoidFunction) => {
    return auth0.client.login(
      {
        realm: databaseConnection,
        username,
        password,
        audience: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/userinfo`,
      },
      (err, authResult) => {
        if (err) {
          setError(err.description);
          return;
        }

        setAccessToken(authResult.accessToken);
        setIsAuthenticated(true);
        localStorage.setItem(IS_AUTHENTICATED_KEY, 'true');
        localStorage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
        callback();
      },
    );
  };

  const logout = () => {
    setAccessToken(undefined);
    setIsAuthenticated(false);
    localStorage.removeItem(IS_AUTHENTICATED_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    auth0.logout({
      returnTo: window.location.origin,
    });
  };

  const register = (email: string, password: string, callback: VoidFunction) => {
    return auth0.signup(
      {
        connection: databaseConnection,
        email,
        password,
      },
      (err) => {
        if (err) {
          setError(err.description);
          return;
        }

        callback();
      },
    );
  };

  const forgotPassword = (email: string) => {
    return auth0.changePassword(
      {
        connection: databaseConnection,
        email,
      },
      function (err) {
        if (err) {
          setError(err.description);
          return;
        }

        setSuccess('Email send sucessfullly');
      },
    );
  };

  const reset = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  const value = {
    accessToken,
    isAuthenticated,
    error,
    success,
    login,
    logout,
    register,
    forgotPassword,
    reset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
