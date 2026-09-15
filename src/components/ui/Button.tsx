import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'px-6 py-3 font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent border border-transparent',
    outline: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-brand-surface dark:text-brand-text-primary dark:hover:bg-opacity-80 focus:ring-gray-300 dark:focus:ring-brand-surface border border-transparent'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;