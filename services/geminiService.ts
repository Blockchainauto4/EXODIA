
import { GoogleGenAI } from "@google/genai";

/**
 * Retorna o modelo apropriado com base no nível de acesso detectado.
 * Tarefas básicas (Triagem Texto) usam Flash.
 * Tarefas complexas (Raciocínio Clínico Avançado) usam Pro se disponível.
 */
const getModelForTier = async () => {
  if (window.aistudio) {
    const isPro = await window.aistudio.hasSelectedApiKey();
    return isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
  }
  return 'gemini-3-flash-preview';
};

export const getMedicalOrientation = async (prompt: string, history: { role: string; text: string }[]) => {
  // CRITICAL: Instanciar sempre antes da chamada para capturar a chave mais recente do ambiente
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = await getModelForTier();
  
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o assistente virtual sênior do IA HOSPITAL (Nível: ${modelName}). 
        Sua função é fornecer ORIENTAÇÃO MÉDICA e TRIAGEM PRELIMINAR de forma empática e profissional. 
        REGRAS CRÍTICAS:
        1. Você NÃO fornece diagnósticos definitivos nem prescrições.
        2. Se o usuário apresentar sinais de emergência, oriente IMEDIATAMENTE a procurar o pronto-atendimento ou ligar 192.
        3. Use termos médicos corretos mas explique de forma simples.
        4. Sempre mencione termos como "perto de mim", "na minha região" ou "na minha área" para reforçar a geolocalização.
        5. Reforce que o atendimento está disponível "onde você está agora".`,
        temperature: 0.7,
        // Se for o modelo Pro, podemos aumentar o orçamento de pensamento para casos complexos
        thinkingConfig: modelName === 'gemini-3-pro-preview' ? { thinkingBudget: 4000 } : undefined
      },
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Tratamento específico para erro de chave/faturamento
    if (error?.message?.includes("Requested entity was not found") || error?.message?.includes("API key not valid")) {
      return "Detectamos um problema com as permissões da sua chave de API para este nível de consulta. Por favor, verifique se sua chave possui faturamento ativado no Google Cloud ou use o modo básico.";
    }
    
    return "Desculpe, tive um problema técnico. Se for uma emergência, procure um hospital agora ou ligue 192.";
  }
};
