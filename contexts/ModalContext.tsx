import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  openModal: (plan?: string) => void;
  closeModal: () => void;
  selectedPlan: string | null;
  isTallyModalOpen: boolean;
  openTallyModal: () => void;
  closeTallyModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openModal = (plan?: string) => {
    if (plan) {
      setSelectedPlan(plan);
    } else {
      setSelectedPlan(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openTallyModal = () => {
    setIsTallyModalOpen(true);
  };

  const closeTallyModal = () => {
    setIsTallyModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{
      isModalOpen,
      openModal,
      closeModal,
      selectedPlan,
      isTallyModalOpen,
      openTallyModal,
      closeTallyModal,
    }}>
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
