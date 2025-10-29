
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from './Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Veuillez entrer un email.');
      return;
    }
    setError('');
    if (isLoginView) {
      login(email);
    } else {
      signup(email);
    }
    onClose();
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold text-center mb-4">{isLoginView ? 'Connexion' : 'Inscription'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c01420]"
              placeholder="vous@exemple.com"
            />
          </div>
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
          <Button type="submit" className="w-full">{isLoginView ? 'Se connecter' : 'S\'inscrire'}</Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLoginView ? "Pas encore de compte ? " : "Déjà un compte ? "}
          <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-[#c01420] hover:underline">
            {isLoginView ? 'Inscrivez-vous' : 'Connectez-vous'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
