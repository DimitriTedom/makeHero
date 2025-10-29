
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'primary', ...props }) => {
  const baseClasses = "font-bold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: 'bg-[#c01420] text-white hover:bg-red-700 focus:ring-[#c01420]',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400',
    ghost: 'bg-transparent text-black hover:bg-[#ffebed] focus:ring-[#c01420]',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
