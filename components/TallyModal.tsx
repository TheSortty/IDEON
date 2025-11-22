import React, { useEffect } from 'react';
import { useModal } from '../contexts/ModalContext';
import { useTheme } from '../contexts/ThemeContext';

const TallyModal: React.FC = () => {
  const { isTallyModalOpen, closeTallyModal } = useModal();
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeTallyModal();
      }
    };

    if (isTallyModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTallyModalOpen, closeTallyModal]);
  
  if (!isTallyModalOpen) return null;

  const tallyUrl = `https://tally.so/embed/wbBNb6?theme=${theme}&transparentBackground=1&alignLeft=1`;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isTallyModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-labelledby="tally-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={closeTallyModal}
    >
      <div 
        className="bg-[#f8f8f8] dark:bg-brand-surface rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] relative border border-gray-200 dark:border-brand-primary/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 flex justify-between items-center border-b border-gray-200 dark:border-brand-primary/20">
            <h2 id="tally-modal-title" className="text-xl font-bold text-[#111] dark:text-brand-text-primary">
                Completá tu Brief
            </h2>
            <button 
              onClick={closeTallyModal}
              className="p-2 rounded-full text-gray-500 dark:text-brand-text-secondary hover:bg-gray-200 dark:hover:bg-brand-surface/80 transition-colors"
              aria-label="Cerrar modal"
            >
              <span className="text-2xl">✕</span>
            </button>
        </div>
        <div className="flex-grow overflow-hidden">
            <iframe
                src={tallyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Brief de Proyecto"
                className="rounded-b-2xl"
            >
            </iframe>
        </div>
      </div>
    </div>
  );
};

export default TallyModal;