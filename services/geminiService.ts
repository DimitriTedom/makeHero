import { GoogleGenAI, Modality } from "@google/genai";
import { toBase64 } from "../utils/fileUtils";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Please set it to use the Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Helper to extract base64 data and mimeType from data URL
const parseDataUrl = (dataUrl: string) => {
    const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid data URL format");
    }
    return { mimeType: match[1], data: match[2] };
};

export const generateHeroImage = async (
  file: File,
  heroName: string
): Promise<string> => {
  try {
    const dataUrl = await toBase64(file);
    const { mimeType, data } = parseDataUrl(dataUrl);

    const imagePart = {
      inlineData: {
        mimeType,
        data,
      },
    };

    const textPart = {
      text: `Transforme la personne sur cette image en super-héros ${heroName}. Le style doit être photoréaliste, dynamique et amusant, en fusionnant les traits du visage de la personne avec le costume et les caractéristiques emblématiques du héros.`,
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [imagePart, textPart],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    const firstCandidate = response.candidates?.[0];

    if (!firstCandidate || !firstCandidate.content || !firstCandidate.content.parts) {
      console.error("Unexpected API response structure:", JSON.stringify(response, null, 2));

      if (firstCandidate?.finishReason && firstCandidate.finishReason !== 'STOP') {
        console.error('Image generation stopped. Reason:', firstCandidate.finishReason);
        throw new Error(`La génération d'image a été bloquée. Raison : ${firstCandidate.finishReason}`);
      }
      
      throw new Error("Aucune image n'a été générée par l'API. La réponse du serveur est invalide.");
    }

    for (const part of firstCandidate.content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }

    throw new Error("Aucune image n'a été générée par l'API.");
  } catch (error) {
    console.error("Erreur lors de la génération de l'image:", error);
     if (error instanceof Error) {
        // Pass the specific error message to the user
        throw new Error(error.message || "La transformation a échoué. Veuillez réessayer.");
    }
    throw new Error("La transformation a échoué. Veuillez réessayer.");
  }
};
