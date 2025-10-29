
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-white"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-white delay-200"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-white delay-400"></div>
      <span className="sr-only">Chargement...</span>
    </div>
  );
};

export default Spinner;
