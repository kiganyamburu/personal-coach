import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { buildApiUrl } from "@/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "psc_auth";

interface StoredAuth {
  token: string;
  user: AuthUser;
}

async function authRequest(
  path: string,
  body?: Record<string, unknown>,
  token?: string,
): Promise<Response> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(buildApiUrl(path), {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load auth from localStorage on mount and validate
  useEffect(() => {
    const storedRaw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedRaw) {
      setLoading(false);
      return;
    }

    try {
      const stored: StoredAuth = JSON.parse(storedRaw);
      if (!stored.token) {
        setLoading(false);
        return;
      }

      setToken(stored.token);
      setUser(stored.user);

      // Validate token by calling /auth/me
      (async () => {
        try {
          const res = await authRequest("/auth/me", undefined, stored.token);
          if (!res.ok) {
            throw new Error("Session validation failed");
          }
          const data = await res.json();
          setUser(data.user);
          window.localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({ token: stored.token, user: data.user }),
          );
        } catch {
          window.localStorage.removeItem(AUTH_STORAGE_KEY);
          setToken(null);
          setUser(null);
        } finally {
          setLoading(false);
        }
      })();
    } catch {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await authRequest("/auth/login", { email, password });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to login");
        }
        const data: AuthResponse = await res.json();
        setToken(data.token);
        setUser(data.user);
        window.localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ token: data.token, user: data.user }),
        );
        return true;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to login. Please try again.";
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const register = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      setLoading(true);
      setError(null);
      try {
        const res = await authRequest("/auth/register", {
          name,
          email,
          password,
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to register");
        }
        const data: AuthResponse = await res.json();
        setToken(data.token);
        setUser(data.user);
        window.localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({ token: data.token, user: data.user }),
        );
        return true;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to create account. Please try again.";
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      logout,
    }),
    [user, token, loading, error, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}


