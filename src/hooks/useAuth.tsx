import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { api, setToken, getToken } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  spaceId: string;
  avatarUrl?: string;
}

interface Space {
  id: string;
  name: string;
  slug: string;
}

interface AuthState {
  user: User | null;
  space: Space | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  spaceName: string;
  spaceSlug: string;
  gateKey: string;
}

interface AuthResponse {
  user: User;
  space: Space;
  token: string;
}

interface MeResponse {
  user: User | null;
  space: Space | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    space: null,
    loading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setState((s) => ({ ...s, loading: false }));
      return;
    }

    api
      .get<MeResponse>("/auth/me")
      .then((data) => {
        setState({
          user: data.user,
          space: data.space,
          loading: false,
          error: null,
        });
      })
      .catch(() => {
        setToken(null);
        setState({ user: null, space: null, loading: false, error: null });
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, error: null, loading: true }));
    try {
      const data = await api.post<AuthResponse>("/auth/login", { email, password });
      setToken(data.token);
      setState({
        user: data.user,
        space: data.space,
        loading: false,
        error: null,
      });
    } catch (err) {
      setToken(null);
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Login failed",
      }));
      throw err;
    }
  }, []);

  const signup = useCallback(async (formData: SignupData) => {
    setState((s) => ({ ...s, error: null, loading: true }));
    try {
      const data = await api.post<AuthResponse>("/auth/signup", formData);
      setToken(data.token);
      setState({
        user: data.user,
        space: data.space,
        loading: false,
        error: null,
      });
    } catch (err) {
      setToken(null);
      setState((s) => ({
        ...s,
        loading: false,
        error: err instanceof Error ? err.message : "Signup failed",
      }));
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setState({ user: null, space: null, loading: false, error: null });
  }, []);

  const clearError = useCallback(() => {
    setState((s) => ({ ...s, error: null }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
