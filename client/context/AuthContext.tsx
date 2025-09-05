import { createContext, useContext, useMemo, useState } from "react";
import type { Role } from "@shared/api";

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  userEmail?: string;
}

interface AuthContextValue extends AuthState {
  login: (email: string, _password: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthenticated: false, role: null });

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    login: (email, _password, role) => {
      setState({ isAuthenticated: true, role, userEmail: email });
      sessionStorage.setItem("auth", JSON.stringify({ email, role }));
    },
    logout: () => {
      setState({ isAuthenticated: false, role: null });
      sessionStorage.removeItem("auth");
    },
  }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
