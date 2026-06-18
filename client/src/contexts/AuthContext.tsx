import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import apiClient, { setAccessToken } from "../api/client";
import type { AuthUser } from "../types";

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  //acts as wrapper class for any other component (children) passed in
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
  });

  //not passed in props, unaccessible by children directly
  const applyAuth = useCallback((token: string, user: AuthUser) => {
    setAccessToken(token); // updates token in apiclient
    setState({ user, accessToken: token, isLoading: false }); //updates react state
  }, []);

  const clearAuth = useCallback(() => {
    setAccessToken(null);
    setState({ user: null, accessToken: null, isLoading: false });
  }, []);

  const refreshAttempted = useRef(false); // false the first time loads(even on page refresh), true on refresh attempt (react strict mode rerenders twice)
  useEffect(() => {
    if (refreshAttempted.current) return;
    refreshAttempted.current = true;
    apiClient
      .post("/auth/refresh")
      .then(({ data }) => applyAuth(data.accessToken, data.user)) //success
      .catch(() => clearAuth()); //failure
  }, [applyAuth, clearAuth]);

  useEffect(() => {
    const handle = () => clearAuth();
    window.addEventListener("auth:logout", handle); // listen for force logout (refresh token expires mid sesh), call handle, which clears auth data
    return () => window.removeEventListener("auth:logout", handle); //clear the force logout
  }, [clearAuth]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await apiClient.post("/auth/login", { email, password });
      applyAuth(data.accessToken, data.user);
    },
    [applyAuth],
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      const { data } = await apiClient.post("/auth/register", { username, email, password });
      applyAuth(data.accessToken, data.user);
    },
    [applyAuth],
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      clearAuth();
    }
  }, [clearAuth]);

  //wrapper
  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
