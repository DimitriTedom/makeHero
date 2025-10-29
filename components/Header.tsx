
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';
import AuthModal from './AuthModal';
import Button from './Button';

interface HeaderProps {
  onNavigate: (view: 'form' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="w-full p-4 border-b border-gray-200">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => onNavigate('form')}>
            <Logo />
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => onNavigate('history')}>Historique</Button>
                <Button onClick={logout}>Déconnexion</Button>
              </>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>Connexion / Inscription</Button>
            )}
          </div>
        </nav>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Header;
