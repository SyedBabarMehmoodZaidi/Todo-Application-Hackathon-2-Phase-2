'use client';

import React from 'react';
import { useAuth } from '../../components/AuthProvider';
import LandingHero from './components/LandingHero';
import FeaturesSection from './components/FeaturesSection';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingHero />
      <FeaturesSection />

      <div className="py-12 bg-white dark:bg-gray-900 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white transition-all duration-500">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 transition-all duration-700 delay-100">
              Join thousands of users who manage their tasks efficiently with our platform.
            </p>
            <div className="mt-6 transition-all duration-1000 delay-200">
              <a
                href={user ? "/dashboard" : "/auth/sign-up"}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                {user ? "Go to Dashboard" : "Sign up for free"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}