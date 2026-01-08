'use client';

import React from 'react';
import { useAuth } from '../../../components/AuthProvider';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/sign-in';
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8 transition-all duration-500">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-all duration-500">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 transition-all duration-700 delay-100">Welcome back, {user.username || user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 hover:scale-105"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-200">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Total Tasks:</span>
              <span className="font-medium text-gray-900 dark:text-white">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Completed:</span>
              <span className="font-medium text-green-600">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Pending:</span>
              <span className="font-medium text-yellow-600">0</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 md:col-span-2 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Welcome to TodoApp</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Just now</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 transition-all duration-1000 delay-300">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/dashboard/tasks"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50">
              <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Manage Tasks</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View and manage your todo list</p>
          </a>

          <a
            href="/dashboard/tasks"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center transition-all duration-300 group-hover:bg-green-200 dark:group-hover:bg-green-800/50">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Completed Tasks</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View your completed tasks</p>
          </a>

          <a
            href="/dashboard/tasks"
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50">
              <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Upcoming Tasks</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">View your upcoming tasks</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;