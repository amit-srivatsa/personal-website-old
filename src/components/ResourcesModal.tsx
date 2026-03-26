import React, { useState } from 'react';
import { X, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'resources_gate' }),
      });

      if (response.ok) {
        setStatus('success');
        // Small delay to show success state before redirecting
        setTimeout(() => {
          onClose();
          navigate('/resources');
        }, 1500);
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Failed to unlock. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-gray-900 rounded-[2rem] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Unlock the Builder's Vault</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Get instant access to my curated library of tools, templates, and frameworks.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resource-email" className="sr-only">Email address</label>
            <input
              id="resource-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email..."
              className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-red-500 dark:text-red-400 text-sm text-center font-medium">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-amber-500/20 ${
              status === 'success' ? 'bg-green-500' : 'bg-amber-600 hover:bg-amber-700'
            }`}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" />
            ) : status === 'success' ? (
              'Unlocked! Redirecting...'
            ) : (
              <>
                Unlock Access <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
          I respect your inbox. No spam, ever.
        </p>
      </div>
    </div>
  );
};