import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  selectedPlan: string;
  openModal: (plan?: string) => void;
  closeModal: () => void;
  isTallyModalOpen: boolean;
  openTallyModal: () => void;
  closeTallyModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);

  const openModal = (plan?: string) => {
    setSelectedPlan(plan || 'No estoy seguro/a, necesito asesoramiento');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openTallyModal = () => setIsTallyModalOpen(true);
  const closeTallyModal = () => setIsTallyModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, selectedPlan, openModal, closeModal, isTallyModalOpen, openTallyModal, closeTallyModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
