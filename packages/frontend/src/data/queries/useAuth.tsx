// Auth context and provider
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { api, setToken } from '../../lib/api-client.js';
import { getToken, getStoredUser, setStoredUser, clearAuth, isTokenExpired } from '../../lib/auth-store.js';
import type { UserResponse, SpaceResponse } from '@framenest/shared';
import { loginSchema, signupSchema, gateSchema } from '@framenest/shared';

interface AuthState {
  user: UserResponse | null;
  space: SpaceResponse | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: { name: string; email: string; password: string; spaceName: string; spaceSlug: string; gateKey: string }) => Promise<void>;
  logout: () => void;
  unlockGate: (spaceSlug: string, gateKey: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: getStoredUser(),
    space: null,
    loading: true,
    error: null,
  });

  // Check existing token on mount
  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      api.get<{ user: UserResponse; space: SpaceResponse }>('/auth/me')
        .then(data => {
          setState({ user: data.user, space: data.space, loading: false, error: null });
          setStoredUser(data.user);
        })
        .catch(() => {
          clearAuth();
          setState(s => ({ ...s, loading: false }));
        });
    } else {
      clearAuth();
      setState(s => ({ ...s, loading: false }));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const parsed = loginSchema.parse({ email, password });
    const data = await api.post<{ token: string; user: UserResponse; space: SpaceResponse }>('/auth/login', parsed);
    setToken(data.token);
    setStoredUser(data.user);
    setState({ user: data.user, space: data.space, loading: false, error: null });
  }, []);

  const signup = useCallback(async (input: { name: string; email: string; password: string; spaceName: string; spaceSlug: string; gateKey: string }) => {
    const parsed = signupSchema.parse(input);
    const data = await api.post<{ token: string; user: UserResponse; space: SpaceResponse }>('/auth/signup', parsed);
    setToken(data.token);
    setStoredUser(data.user);
    setState({ user: data.user, space: data.space, loading: false, error: null });
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setState({ user: null, space: null, loading: false, error: null });
    api.post('/auth/logout').catch(() => {});
  }, []);

  const unlockGate = useCallback(async (spaceSlug: string, gateKey: string) => {
    const parsed = gateSchema.parse({ spaceSlug, gateKey });
    const data = await api.post<{ token: string; user: UserResponse; space: SpaceResponse }>('/auth/gate', parsed);
    setToken(data.token);
    setStoredUser(data.user);
    setState({ user: data.user, space: data.space, loading: false, error: null });
  }, []);

  const clearError = useCallback(() => setState(s => ({ ...s, error: null })), []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, unlockGate, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
