import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Todo App</h3>
            <p className="text-gray-400 mt-2 dark:text-gray-400">© 2026 Todo App. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white dark:text-gray-400 dark:hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;