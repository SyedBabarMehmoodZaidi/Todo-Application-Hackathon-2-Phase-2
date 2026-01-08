'use client';
import React from 'react';
import { useAuth } from '../../../components/AuthProvider';
import Navbar from '../components/Navbar';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/auth/sign-in';
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      <div className="flex transition-all duration-300">
        {/* Sidebar */}
        <div className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow transition-colors duration-300">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">Menu</h2>
          </div>
          <nav className="mt-5 px-2">
            <div className="space-y-1">
              <a
                href="/dashboard"
                className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-300"
              >
                Dashboard Overview
              </a>
              <a
                href="/dashboard/tasks"
                className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-300"
              >
                My Tasks
              </a>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4 bg-white dark:bg-gray-900 transition-colors duration-300">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;