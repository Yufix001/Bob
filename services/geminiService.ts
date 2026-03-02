import { GoogleGenAI } from "@google/genai";
import type { AiResponse, ConversationTurn, DiagnosisResult, ApplianceDetails } from '../types';

// The API key is now correctly sourced from environment variables.
const API_KEY = process.env.API_KEY;
const API_CALL_TIMEOUT_MS = 30000; // 30 seconds timeout for API calls

export const getAiResponse = async (
  category: string,
  appliance: string,
  history: ConversationTurn[],
  details?: ApplianceDetails,
  photoBase64?: string | null
): Promise<AiResponse | null> => {
  if (!API_KEY) {
    console.error("API key is not configured.");
    // Return a diagnosis type even for API key absence, to ensure app transitions to ResultScreen.
    return {
        type: 'diagnosis',
        diagnosisResult: {
            solutionType: 'escalation',
            title: 'Service non disponible',
            summary: "Le service de diagnostic IA n'est pas configuré. Veuillez contacter le support."
        }
    };
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const historySummary = history
    .map(turn => `- Q: ${turn.question}\n  - R: ${turn.answer}`)
    .join('\n');

  const applianceDetailsText = details && (details.brand || details.model)
    ? `\n- Marque: ${details.brand || 'Non fournie'}\n- Modèle: ${details.model || 'Non fourni'}`
    : '';

  // A more direct system instruction focusing on the core role and decision logic.
  const systemInstruction = `
    Vous êtes un expert en diagnostic pour appareils électroménagers. Votre mission est de guider l'utilisateur vers une solution en posant des questions claires et pertinentes.

    **RÈGLES DE DÉCISION**
    1.  **Analyser l'historique:** Basez votre prochaine action sur les réponses précédentes.
    2.  **Besoin de plus d'informations ?**
        - Si le diagnostic n'est pas certain, posez une nouvelle question. Fournissez toujours plusieurs options de réponse, y compris "Autre".
    3.  **Diagnostic certain ?**
        - Si vous avez assez d'informations pour une solution fiable, fournissez le diagnostic.
    4.  **Priorité :** Ne concluez jamais prématurément. Mieux vaut une question de plus qu'un mauvais diagnostic.
  `;
    
  // The prompt now includes simple examples of the required JSON format, which is more performant than a complex responseSchema.
  let userPrompt = `
    **Contexte Actuel:**
    - Catégorie: ${category}
    - Appareil: ${appliance}${applianceDetailsText}
    - Historique de la conversation:
    ${historySummary || "C'est la première question. Posez une question de départ simple et générale."}

    Générez la prochaine étape du diagnostic. Votre réponse DOIT être un objet JSON valide.
    - Pour une question, utilisez ce format : \`{"type": "question", "questionText": "...", "answerOptions": [{"optionText": "..."}, {"optionText": "..."}]}\`
    - Pour un diagnostic, utilisez ce format : \`{"type": "diagnosis", "diagnosisResult": {"solutionType": "...", "title": "...", "summary": "...", "steps": ["..."]}}\`
  `;

  const parts = [];

  if (photoBase64) {
    const match = photoBase64.match(/^data:(image\/(?:jpeg|png));base64,(.*)$/);
    if (match) {
        const mimeType = match[1];
        const data = match[2];
        parts.push({
            inlineData: {
                mimeType,
                data,
            },
        });
        // Add instruction to the text prompt to use the image
        userPrompt = `Analysez attentivement l'image fournie pour un diagnostic plus précis.\n\n${userPrompt}`;
    }
  }

  parts.push({ text: userPrompt });

  try {
    // The complex `responseSchema` has been removed to improve performance and prevent timeouts.
    const geminiCallPromise = ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const timeoutError = new Error("API_CALL_TIMEOUT_ERROR");
    const timeoutPromise = new Promise<never>((_resolve, reject) =>
        setTimeout(() => reject(timeoutError), API_CALL_TIMEOUT_MS)
    );

    const response = await Promise.race([geminiCallPromise, timeoutPromise]);

    const jsonText = response.text.trim();
    let result: AiResponse;
    try {
        // Attempt to find and parse a JSON object from the response text, handling markdown code blocks.
        const jsonMatch = jsonText.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);
        if (!jsonMatch) {
            throw new Error("No JSON object found in the response.");
        }
        const jsonString = jsonMatch[1] || jsonMatch[2];
        result = JSON.parse(jsonString);
    } catch (jsonParseError) {
        console.error("Failed to parse AI response as JSON:", jsonParseError, "Raw response:", jsonText);
        throw new Error("INVALID_JSON_RESPONSE_ERROR");
    }

    // Strengthened post-processing to catch incomplete but valid JSON responses from the AI.
    if (result.type === 'question') {
        if (!result.questionText) {
            console.error("AI returned type 'question' but no questionText.");
            throw new Error("AI_LOGIC_ERROR: Missing question text.");
        }
        if (!result.answerOptions || result.answerOptions.length === 0) {
            console.error("AI returned a question with no answer options.");
            throw new Error("AI_LOGIC_ERROR: Missing answer options.");
        }
        const hasOtherOption = result.answerOptions.some(opt => opt.optionText.toLowerCase() === 'autre');
        if (!hasOtherOption) {
            result.answerOptions.push({ optionText: 'Autre' });
        }
    }
    
    if (result.type === 'diagnosis' && !result.diagnosisResult) {
        console.error("AI returned type 'diagnosis' but no diagnosisResult object.");
        throw new Error("AI_LOGIC_ERROR: Missing diagnosis result.");
    }

    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorTitle = 'Erreur de Diagnostic IA';
    let errorMessage = "Une erreur de communication avec l'assistant IA est survenue.";

    const errorMessageString = error instanceof Error ? error.message : String(error);
    if (errorMessageString.includes("RESOURCE_EXHAUSTED") || errorMessageString.includes("429")) {
        errorTitle = 'Service Temporairement Indisponible';
        errorMessage = "Le service de diagnostic est actuellement surchargé en raison d'un grand nombre de demandes. Veuillez réessayer dans quelques instants.";
    } else if (error instanceof Error) {
        if (error.message === "API_CALL_TIMEOUT_ERROR") {
            errorTitle = 'Délai de réponse dépassé';
            errorMessage = `L'assistant IA a pris trop de temps pour répondre (${API_CALL_TIMEOUT_MS / 1000}s). Veuillez réessayer.`;
        } else if (error.message === "INVALID_JSON_RESPONSE_ERROR") {
            errorMessage = "La réponse de l'IA n'était pas au format JSON attendu. Veuillez réessayer.";
        } else if (error.message.startsWith("AI_LOGIC_ERROR")) {
            errorTitle = 'Erreur de logique de l\'IA';
            errorMessage = "L'assistant IA a renvoyé une réponse incomplète. Veuillez réessayer.";
        } else {
            errorMessage = `Une erreur est survenue lors de la communication avec l'IA: ${error.message}.`;
        }
    }
    
    return {
        type: 'diagnosis',
        diagnosisResult: {
            solutionType: 'escalation',
            title: errorTitle,
            summary: `${errorMessage} Nous recommandons de contacter un professionnel si le problème persiste.`
        }
    };
  }
};