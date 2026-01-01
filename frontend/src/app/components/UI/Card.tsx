import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, header, footer, className = '', ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm ${className}`}
      {...props}
    >
      {header && (
        <div className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700 p-6 rounded-t-lg">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700 p-6 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;