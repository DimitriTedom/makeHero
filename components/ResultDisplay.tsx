
import React from 'react';
import { Transformation } from '../types';
import Button from './Button';

interface ResultDisplayProps {
  transformation: Transformation;
  onCreateNew: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ transformation, onCreateNew }) => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-4xl font-extrabold mb-4">Transformation Réussie !</h2>
      <p className="text-lg text-gray-600 mb-8">Vous êtes maintenant {transformation.hero} !</p>
      
      <div className="relative max-w-lg mx-auto mb-8 shadow-2xl rounded-lg overflow-hidden">
        <img src={transformation.generatedImage} alt={`Transformation en ${transformation.hero}`} className="w-full h-auto object-contain" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={transformation.generatedImage}
          download={`hero-transformation-${transformation.hero}.png`}
          className="bg-[#c01420] text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c01420] flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Télécharger
        </a>
        <Button variant="secondary" onClick={onCreateNew}>Créer une autre</Button>
      </div>
    </div>
  );
};

export default ResultDisplay;
