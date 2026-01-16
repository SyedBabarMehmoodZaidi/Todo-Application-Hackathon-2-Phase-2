import React from 'react';
import { AuthProvider } from '../../components/AuthProvider';
import { ThemeProvider } from '../contexts/ThemeContext';
import { NotificationProvider } from '../../components/NotificationProvider';
import Footer from './components/Footer';

// Import global CSS
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
                <nav className="container mx-auto px-4 py-3">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-300">TodoApp</div>
                    <div className="flex space-x-4">
                      <a href="/" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300">Home</a>
                      <a href="/auth/sign-in" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300">Login</a>
                      <a href="/auth/sign-up" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300">Sign Up</a>
                    </div>
                  </div>
                </nav>
              </header>

              <main className="flex-grow">
                {children}
              </main>

              <Footer />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}