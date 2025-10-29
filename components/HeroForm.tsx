
import React, { useState, useCallback } from 'react';
import { SUPERHEROES } from '../constants';
import { generateHeroImage } from '../services/geminiService';
import { Transformation } from '../types';
import Spinner from './Spinner';
import Button from './Button';
import Select from './Select';
import { useAuth } from '../hooks/useAuth';

interface HeroFormProps {
  onTransformationComplete: (transformation: Transformation) => void;
}

const HeroForm: React.FC<HeroFormProps> = ({ onTransformationComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [hero, setHero] = useState<string>(SUPERHEROES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
        setError('Format de fichier non supporté. Veuillez utiliser JPG ou PNG.');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        setError('Le fichier est trop volumineux. La taille maximale est de 5MB.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner une image.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const generatedImage = await generateHeroImage(file, hero);
      const newTransformation: Transformation = {
        id: new Date().toISOString(),
        hero,
        generatedImage,
        timestamp: Date.now()
      };

      if (user) {
          const history: Transformation[] = JSON.parse(localStorage.getItem('transformationHistory') || '[]');
          history.unshift(newTransformation);
          localStorage.setItem('transformationHistory', JSON.stringify(history.slice(0, 20))); // Keep last 20
      }

      onTransformationComplete(newTransformation);
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, hero, onTransformationComplete, user]);

  return (
    <div className="text-center max-w-lg mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2">Devenez un Super-Héros</h1>
      <p className="text-lg text-gray-600 mb-8">Uploadez votre photo, choisissez votre héros, et laissez la magie opérer.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="file-upload" className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#c01420] hover:bg-[#ffebed] transition-colors">
            {preview ? (
              <img src={preview} alt="Aperçu" className="h-full w-full object-cover rounded-lg"/>
            ) : (
              <>
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H12a4 4 0 014 4v5a4 4 0 01-4 4H7z"></path></svg>
                <span className="mt-2 text-sm text-gray-600">Cliquez pour uploader (JPG, PNG, max 5MB)</span>
              </>
            )}
          </label>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg" />
        </div>

        <Select value={hero} onChange={(e) => setHero(e.target.value)}>
          {SUPERHEROES.map(h => <option key={h} value={h}>{h}</option>)}
        </Select>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" disabled={isLoading || !file} className="w-full !py-4 text-lg">
          {isLoading ? <Spinner /> : 'Transformer'}
        </Button>
      </form>
    </div>
  );
};

export default HeroForm;
