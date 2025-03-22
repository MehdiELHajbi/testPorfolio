import React, { createContext, useState, useCallback } from 'react';
import type { AuthState, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = useCallback((user: User) => {
    setState({ user, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}