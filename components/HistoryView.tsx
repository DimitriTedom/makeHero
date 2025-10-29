
import React, { useState, useEffect } from 'react';
import { Transformation } from '../types';

const HistoryView: React.FC = () => {
  const [history, setHistory] = useState<Transformation[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('transformationHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  if (history.length === 0) {
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Historique des Transformations</h2>
        <p className="text-gray-600">Vous n'avez pas encore de transformations. Créez-en une !</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">Historique des Transformations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {history.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden group">
            <div className="aspect-w-1 aspect-h-1">
              <img src={item.generatedImage} alt={item.hero} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.hero}</h3>
              <p className="text-sm text-gray-500">{new Date(item.timestamp).toLocaleDateString('fr-FR')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
