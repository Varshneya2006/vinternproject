import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { authLogin, authSignup, getCurrentUser } from '../services/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ddd_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = Boolean(user && token);

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      const savedToken = localStorage.getItem('ddd_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser(savedToken);
        setUser(response.user);
        setToken(savedToken);
      } catch (error) {
        console.error('Auto login failed:', error);
        localStorage.removeItem('ddd_token');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authLogin(email, password);
      localStorage.setItem('ddd_token', response.token);
      setToken(response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authSignup(name, email, password);
      localStorage.setItem('ddd_token', response.token);
      setToken(response.token);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('ddd_token');
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, isAuthenticated, login, signup, logout }),
    [user, token, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
