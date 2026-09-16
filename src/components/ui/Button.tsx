import React from 'react';

type Variant = 'primary' | 'outline' | 'secondary';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}

// Con `href` el componente renderiza un <a> en lugar de un <button>, para que un
// enlace real (navegación, abrir en pestaña nueva) pueda verse igual que un botón
// sin duplicar los estilos de las variantes.
type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { href?: undefined };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const baseStyles = 'px-6 py-3 font-semibold rounded-full transition-[background-color,border-color,color,box-shadow,transform] duration-medium ease-out-token focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent border border-transparent',
  outline: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white focus-visible:ring-accent',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-brand-surface dark:text-brand-text-primary dark:hover:bg-opacity-80 focus-visible:ring-gray-300 dark:focus-visible:ring-brand-surface border border-transparent'
};

const Button: React.FC<ButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (typeof props.href === 'string') {
    const { href, ...anchorProps } = props as ButtonAsAnchor;
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center text-center no-underline ${styles}`}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
};

export default Button;
