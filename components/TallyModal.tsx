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
        className="bg-slate-50 dark:bg-[#03031f] rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] relative border border-slate-200 dark:border-slate-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
            <h2 id="tally-modal-title" className="text-xl font-bold text-slate-900 dark:text-white">
                Completá tu Brief
            </h2>
            <button 
              onClick={closeTallyModal}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
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
                // FIX: Changed string "0" to number {0} for marginHeight and marginWidth props to match expected type.
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
