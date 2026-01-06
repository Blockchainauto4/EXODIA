
import { GoogleGenAI } from "@google/genai";

/**
 * Retorna o modelo apropriado com base no nível de acesso detectado.
 * Tarefas básicas (Triagem Texto) usam Flash.
 * Tarefas complexas (Raciocínio Clínico Avançado) usam Pro se disponível.
 */
const getModelForTier = async () => {
  if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
    try {
      const isPro = await window.aistudio.hasSelectedApiKey();
      return isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    } catch (e) {
      return 'gemini-3-flash-preview';
    }
  }
  return 'gemini-3-flash-preview';
};

export const getMedicalOrientation = async (prompt: string, history: { role: string; text: string }[]) => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === '') {
    console.error("ERRO CRÍTICO: API_KEY não encontrada em process.env.");
    return "O serviço de IA está temporariamente indisponível. Se for uma emergência, ligue 192.";
  }

  const ai = new GoogleGenAI({ apiKey });
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
        systemInstruction: `Você é o assistente virtual sênior do IA HOSPITAL.
        
        Sua especialidade é ORIENTAÇÃO e TRIAGEM LOCAL.
        
        REGRAS DE GEOLOCALIZAÇÃO & REDE PÚBLICA:
        1. Entenda que o usuário busca "perto de mim". Reforce termos como "na sua região", "na sua cidade", "no seu bairro".
        2. Saiba diferenciar:
           - UPA / Pronto Socorro: Casos de urgência e emergência 24h.
           - UBS / Posto de Saúde: Consultas de rotina, vacinas, acompanhamento.
           - AMA: Atendimento médico ambulatorial para casos de baixa complexidade.
        3. Sempre que o usuário mencionar sintomas graves, priorize o encaminhamento para a UPA ou Pronto Socorro mais próximo.
        4. Mencione que o IA Hospital ajuda a encontrar o atendimento ideal "onde você está agora".
        
        PROTOCOLOS:
        - Não dê diagnósticos.
        - Não prescreva medicamentos.
        - Em emergências graves, instrua ligar 192 (SAMU).
        - Use linguagem empática e autoritativa (EEAT).`,
        temperature: 0.7
      },
    });

    return response.text || "Desculpe, tive um erro ao processar. Tente novamente.";
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    return "Ocorreu um erro técnico. Em caso de necessidade urgente, procure a UPA ou Posto de Saúde mais próximo.";
  }
};
