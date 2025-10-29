
import React, { useState } from 'react';
import Header from './components/Header';
import HeroForm from './components/HeroForm';
import ResultDisplay from './components/ResultDisplay';
import HistoryView from './components/HistoryView';
import { Transformation } from './types';
import { useAuth } from './hooks/useAuth';

type View = 'form' | 'result' | 'history';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('form');
  const [latestTransformation, setLatestTransformation] = useState<Transformation | null>(null);
  const { user } = useAuth();

  const handleTransformationComplete = (transformation: Transformation) => {
    setLatestTransformation(transformation);
    setCurrentView('result');
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };
  
  const handleCreateNew = () => {
    setLatestTransformation(null);
    setCurrentView('form');
  }

  return (
    <div className="bg-white min-h-screen text-black flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          {currentView === 'form' && <HeroForm onTransformationComplete={handleTransformationComplete} />}
          {currentView === 'result' && latestTransformation && (
            <ResultDisplay transformation={latestTransformation} onCreateNew={handleCreateNew} />
          )}
          {currentView === 'history' && user && <HistoryView />}
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Propulsé par Gemini 2.5 Flash Image. Créé avec passion.</p>
      </footer>
    </div>
  );
};

export default App;
