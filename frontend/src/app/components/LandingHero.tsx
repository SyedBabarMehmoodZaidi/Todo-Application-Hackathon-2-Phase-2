import React from 'react';
import Link from 'next/link';

const LandingHero: React.FC = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl transition-all duration-500">
                <span className="block xl:inline">Manage your tasks</span>{' '}
                <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">with ease</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 transition-all duration-700 delay-100">
                A secure, multi-user todo application that helps you stay organized and productive.
                Sign up today to start managing your tasks effectively.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start transition-all duration-1000 delay-200">
                <div className="rounded-md shadow">
                  <Link
                    href="/auth/sign-up"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/auth/sign-in"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-300 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 transition-all duration-300 transform hover:-translate-y-1 md:py-4 md:text-lg md:px-10"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 sm:h-72 md:h-96 lg:w-full lg:h-full"></div>
      </div>
    </div>
  );
};

export default LandingHero;