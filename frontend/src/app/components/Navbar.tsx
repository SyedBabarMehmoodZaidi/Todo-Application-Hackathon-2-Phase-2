import React from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/sign-in';
  };

  return (
    <nav className="bg-indigo-700 shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard" className="text-white text-xl font-bold transition-all duration-300 hover:text-indigo-200">
                TodoApp
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/tasks"
                  className="text-indigo-200 hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  Tasks
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <p className="text-sm text-indigo-200 mr-4">
                    Welcome, {user?.username || user?.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-indigo-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-indigo-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-indigo-700 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition-all duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="hidden md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
          <Link
            href="/dashboard"
            className="text-indigo-200 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/tasks"
            className="text-indigo-200 hover:bg-indigo-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
          >
            Tasks
          </Link>
          <button
            onClick={handleLogout}
            className="text-indigo-200 hover:bg-indigo-600 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;