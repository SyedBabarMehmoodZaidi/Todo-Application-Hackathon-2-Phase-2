'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../src/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username?: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const token = localStorage.getItem('access_token');
    if (token) {
      // In a real app, you would verify the token and get user details
      // For now, we'll just set a placeholder
      // In a real implementation, you'd make an API call to get user details
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, you would call the login API
      // const response = await api.post('/auth/login', { email, password });
      // const { access_token, user } = response.data;
      // localStorage.setItem('access_token', access_token);
      // setUser(user);

      // Placeholder implementation
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
      };
      localStorage.setItem('access_token', 'mock-token');
      setUser(mockUser);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    try {
      // In a real app, you would call the register API
      // const response = await api.post('/auth/register', { email, password, username });
      // const { access_token, user } = response.data;
      // localStorage.setItem('access_token', access_token);
      // setUser(user);

      // Placeholder implementation
      const mockUser: User = {
        id: '1',
        email,
        username: username || email.split('@')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true,
      };
      localStorage.setItem('access_token', 'mock-token');
      setUser(mockUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};