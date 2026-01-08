import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Input: React.FC<InputProps> = ({ label, error, helpText, className = '', ...props }) => {
  const errorId = error ? `error-${props.id || props.name}` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <input
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
          error ? 'border-red-500 dark:border-red-500' : 'dark:border-gray-600'
        } ${className}`}
        aria-invalid={!!error}
        aria-describedby={errorId}
        {...props}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : helpText ? (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helpText}</p>
      ) : null}
    </div>
  );
};

export default Input;