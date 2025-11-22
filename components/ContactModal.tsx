import React, { useState, useEffect, FormEvent } from 'react';
import { useModal } from '../contexts/ModalContext';
import Button from './ui/Button';

const SuccessIcon: React.FC = () => (
    <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ErrorIcon: React.FC = () => (
    <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ContactModal: React.FC = () => {
  const { isModalOpen, closeModal, selectedPlan } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    plan: 'No estoy seguro/a, necesito asesoramiento',
    idea: '',
    reference: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill plan from context
  useEffect(() => {
    if (selectedPlan) {
      setFormData((prev) => ({ ...prev, plan: selectedPlan }));
    } else {
      setFormData((prev) => ({ ...prev, plan: 'No estoy seguro/a, necesito asesoramiento' }));
    }
  }, [selectedPlan, isModalOpen]);

  // Reset form and status when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      // Add a small delay to allow the closing animation to finish before resetting
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          plan: 'No estoy seguro/a, necesito asesoramiento',
          idea: '',
          reference: '',
        });
        setSubmissionStatus('idle');
        setErrorMessage('');
      }, 300);
    }
  }, [isModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setErrorMessage('');

    const payload = {
      ...formData,
      access_key: "6ff694f4-3a26-42bf-b439-59cfdd349ab6",
      subject: `Nueva consulta de proyecto - IDEON (${formData.name})`,
      from_name: "Notificación IDEON",
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        setErrorMessage(json.message || 'Ocurrió un error inesperado al enviar el formulario.');
      }
    } catch (error) {
      setSubmissionStatus('error');
      setErrorMessage('Hubo un problema de conexión. Por favor, revisá tu internet e intentalo de nuevo.');
    }
  };
  
  if (!isModalOpen) return null;

  const renderContent = () => {
    switch (submissionStatus) {
      case 'success':
        return (
          <div className="text-center">
            <SuccessIcon />
            <h2 id="modal-title" className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-brand-text-primary">
              ¡Mensaje enviado!
            </h2>
            <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">
              Gracias por contactarnos. Te responderemos a la brevedad.
            </p>
            <div className="mt-8">
              <Button onClick={closeModal} className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="text-center">
            <ErrorIcon />
             <h2 id="modal-title" className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-brand-text-primary">
              Hubo un error
            </h2>
            <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">
              {errorMessage}
            </p>
            <div className="mt-8 space-y-4">
              <Button onClick={() => setSubmissionStatus('idle')} className="w-full">
                Volver a intentar
              </Button>
              <Button onClick={closeModal} variant="secondary" className="w-full">
                Cerrar
              </Button>
            </div>
          </div>
        );
      default: // 'idle' or 'submitting'
        return (
          <>
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-brand-text-secondary hover:bg-gray-200 dark:hover:bg-brand-surface/80 transition-colors"
              aria-label="Cerrar modal"
            >
              <span className="text-2xl">✕</span>
            </button>

            <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#111] dark:text-brand-text-primary">
              Estás a un paso de lanzar tu idea
            </h2>
            <p className="mt-2 text-gray-600 dark:text-brand-text-secondary">
              Completá tus datos y nos pondremos en contacto para empezar a <em>ideonar</em>.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="sr-only">Nombre y Apellido</label>
                <input
                  type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                  placeholder="Nombre y Apellido" required disabled={submissionStatus === 'submitting'}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 dark:border-brand-surface bg-gray-100/80 dark:bg-brand-background/80 text-[#111] dark:text-brand-text-primary shadow-sm focus:ring-brand-primary focus:border-brand-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email de Contacto</label>
                <input
                  type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                  placeholder="Email de Contacto" required disabled={submissionStatus === 'submitting'}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 dark:border-brand-surface bg-gray-100/80 dark:bg-brand-background/80 text-[#111] dark:text-brand-text-primary shadow-sm focus:ring-brand-primary focus:border-brand-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="plan" className="sr-only">¿Qué plan te interesa?</label>
                <select
                  name="plan" id="plan" value={formData.plan} onChange={handleChange} required disabled={submissionStatus === 'submitting'}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 dark:border-brand-surface bg-gray-100/80 dark:bg-brand-background/80 text-[#111] dark:text-brand-text-primary shadow-sm focus:ring-brand-primary focus:border-brand-primary disabled:opacity-50"
                >
                  <option>Plan Lite</option>
                  <option>Plan Fast</option>
                  <option>Plan Express</option>
                  <option>No estoy seguro/a, necesito asesoramiento</option>
                </select>
              </div>
              <div>
                <label htmlFor="idea" className="sr-only">Contanos sobre tu idea</label>
                <textarea
                  name="idea" id="idea" rows={4} value={formData.idea} onChange={handleChange} required disabled={submissionStatus === 'submitting'}
                  placeholder="Contanos sobre tu idea..."
                  className="block w-full px-4 py-3 rounded-md border-gray-300 dark:border-brand-surface bg-gray-100/80 dark:bg-brand-background/80 text-[#111] dark:text-brand-text-primary shadow-sm focus:ring-brand-primary focus:border-brand-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
                ></textarea>
              </div>
               <div>
                <label htmlFor="reference" className="sr-only">¿Tenés alguna web de referencia? (Opcional)</label>
                <input
                  type="text" name="reference" id="reference" value={formData.reference} onChange={handleChange}
                  placeholder="¿Tenés alguna web de referencia? (Opcional)" disabled={submissionStatus === 'submitting'}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 dark:border-brand-surface bg-gray-100/80 dark:bg-brand-background/80 text-[#111] dark:text-brand-text-primary shadow-sm focus:ring-brand-primary focus:border-brand-primary placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:opacity-50"
                />
              </div>
              <div>
                <Button type="submit" className="w-full" disabled={submissionStatus === 'submitting'}>
                  {submissionStatus === 'submitting' ? 'Enviando...' : 'Enviar y Lanzar mi Idea'}
                </Button>
              </div>
            </form>
          </>
        );
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div 
        className="bg-[#f8f8f8] dark:bg-brand-surface rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-200 dark:border-brand-primary/20 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ContactModal;