import React from 'react';
import Button from '../ui/Button';
import { useModal } from '../../contexts/ModalContext';
import { isLivePath } from '../../routes';
import { COTIZAR } from '../../constants/navigation';

type ButtonProps = React.ComponentProps<typeof Button>;

interface QuoteButtonProps {
  children: React.ReactNode;
  /** Plan elegido (Starter, Pro, Enterprise): se precarga en el formulario. */
  plan?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  onClick?: () => void;
}

/**
 * "Cotizar": lleva al cotizador (/cotizar/) cuando esa página existe. Hasta
 * entonces abre el formulario de contacto de siempre (Web3Forms), que deja la
 * consulta registrada y pasa por /contacto-exitoso/ (la URL de conversión).
 */
const QuoteButton: React.FC<QuoteButtonProps> = ({ children, plan, variant, size, className, onClick }) => {
  const { openModal } = useModal();

  if (isLivePath(COTIZAR.path)) {
    const to = plan ? `${COTIZAR.path}?plan=${encodeURIComponent(plan)}` : COTIZAR.path;
    return (
      <Button to={to} variant={variant} size={size} className={className} onClick={onClick}>
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        onClick?.();
        openModal(plan);
      }}
    >
      {children}
    </Button>
  );
};

export default QuoteButton;
