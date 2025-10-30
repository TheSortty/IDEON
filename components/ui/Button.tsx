import React from 'react';

// FIX: Extend ButtonHTMLAttributes to allow standard button props like 'type'.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseStyles = 'px-6 py-3 font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5';
  
  const variantStyles = {
    primary: 'bg-[#b900de] text-white hover:bg-[#a200c5] focus:ring-[#b900de] border border-transparent',
    outline: 'bg-transparent border-2 border-[#b900de] text-[#b900de] hover:bg-[#b900de] hover:text-white focus:ring-[#b900de]',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-[#4510b0] dark:text-white dark:hover:bg-[#6334a8] focus:ring-slate-300 dark:focus:ring-[#4510b0] border border-transparent'
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