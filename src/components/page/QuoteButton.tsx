import React from 'react';
import Button from '../ui/Button';
import { COTIZAR } from '../../constants/navigation';

type ButtonProps = React.ComponentProps<typeof Button>;

interface QuoteButtonProps {
  children: React.ReactNode;
  /** Plan elegido (Starter, Pro, Enterprise): el cotizador lo muestra. */
  plan?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  onClick?: () => void;
}

/** "Cotizar": lleva al cotizador (/cotizar/), con el plan si viene de uno. */
const QuoteButton: React.FC<QuoteButtonProps> = ({ children, plan, variant, size, className, onClick }) => (
  <Button
    to={plan ? `${COTIZAR.path}?plan=${encodeURIComponent(plan)}` : COTIZAR.path}
    variant={variant}
    size={size}
    className={className}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default QuoteButton;
