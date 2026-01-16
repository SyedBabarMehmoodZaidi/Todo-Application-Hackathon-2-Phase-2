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
      // Verify the token and get user details from the token payload
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        const exp = tokenPayload.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (exp && currentTime < exp) {
          // Token is valid, create a minimal user object
          // We'll fetch full user details separately to ensure accuracy
          fetchUserDetails(token);
        } else {
          // Token is expired, remove it
          localStorage.removeItem('access_token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('access_token');
      }
    }
    setLoading(false);
  }, []);

  const fetchUserDetails = async (token: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Create a timeout promise to prevent indefinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout: Backend server not responding')), 60000); // 60 seconds timeout for Neon database connections
      });

      // Race the fetch request against the timeout
      const response = await Promise.race([
        fetch(`${apiUrl}/api/users/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }),
        timeoutPromise
      ]) as Response;

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // If the token is invalid, remove it
        localStorage.removeItem('access_token');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      localStorage.removeItem('access_token');
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Call the actual backend API - using signin endpoint which expects JSON
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Ensure the API URL doesn't have trailing slashes that might interfere with path joining
      const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

      // Create a timeout promise to prevent indefinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout: Backend server not responding')), 60000); // 60 seconds timeout for Neon database connections
      });

      // Race the fetch request against the timeout
      const response = await Promise.race([
        fetch(`${normalizedApiUrl}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          })
        }),
        timeoutPromise
      ]) as Response;

      if (!response.ok) {
        // Handle different error status codes appropriately
        let errorMessage = 'Login failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          errorMessage = await response.text().catch(() => errorMessage);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const accessToken = data.access_token;

      // Create user object based on response from backend
      const userData: User = {
        id: data.user?.id || '', // Use the actual user ID from the response
        email: data.user?.email || email,
        username: data.user?.username || email.split('@')[0],
        created_at: data.user?.created_at || new Date().toISOString(),
        updated_at: data.user?.updated_at || new Date().toISOString(),
        is_active: data.user?.is_active ?? true,
      };

      localStorage.setItem('access_token', accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      // Re-throw the error so the calling component can handle it
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Cannot connect to backend server. Please ensure the backend is running.');
      } else if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error('Request timeout: Backend server is taking too long to respond. Please ensure the backend is running and accessible.');
      } else {
        throw error instanceof Error ? error : new Error('Login failed');
      }
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    try {
      // Call the actual backend API - using signup endpoint which expects JSON
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

      // Ensure the API URL doesn't have trailing slashes that might interfere with path joining
      const normalizedApiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

      // Create a timeout promise to prevent indefinite loading
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout: Backend server not responding')), 60000); // 60 seconds timeout for Neon database connections
      });

      // Race the fetch request against the timeout
      const response = await Promise.race([
        fetch(`${normalizedApiUrl}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            username: username || email.split('@')[0]
          })
        }),
        timeoutPromise
      ]) as Response;

      if (!response.ok) {
        // Handle different error status codes appropriately
        let errorMessage = 'Registration failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON, try to get text
          errorMessage = await response.text().catch(() => errorMessage);
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      const accessToken = data.access_token;

      // Create user object based on response from backend
      const userData: User = {
        id: data.user?.id || '', // Use the actual user ID from the response
        email: data.user?.email || email,
        username: data.user?.username || username || email.split('@')[0],
        created_at: data.user?.created_at || new Date().toISOString(),
        updated_at: data.user?.updated_at || new Date().toISOString(),
        is_active: data.user?.is_active ?? true,
      };

      localStorage.setItem('access_token', accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      // Re-throw the error so the calling component can handle it
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Cannot connect to backend server. Please ensure the backend is running.');
      } else if (error instanceof Error && error.message.includes('timeout')) {
        throw new Error('Request timeout: Backend server is taking too long to respond. Please ensure the backend is running and accessible.');
      } else {
        throw error instanceof Error ? error : new Error('Registration failed');
      }
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