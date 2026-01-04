
import { GoogleGenAI } from "@google/genai";

/**
 * Retorna o modelo apropriado com base no nível de acesso detectado.
 * Tarefas básicas (Triagem Texto) usam Flash.
 * Tarefas complexas (Raciocínio Clínico Avançado) usam Pro se disponível.
 */
const getModelForTier = async () => {
  if (window.aistudio) {
    const isPro = await window.aistudio.hasSelectedApiKey();
    // Recomenda-se gemini-3-pro-preview para tarefas complexas de saúde
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
        systemInstruction: `Você é o assistente virtual sênior do IA HOSPITAL. 
        Sua função é fornecer ORIENTAÇÃO MÉDICA e TRIAGEM PRELIMINAR de forma empática e profissional. 
        
        CONTEXTO DERMATOLOGIA & NUTRIÇÃO:
        - Reconheça que a saúde da pele (Dermatologia) muitas vezes reflete o estado nutricional do paciente.
        - Entretanto, mantenha a clareza: se o usuário busca um problema de pele, foque em orientações dermatológicas, mencionando nutrição apenas como suporte complementar se for clinicamente relevante (ex: acne, dermatites). 
        - Não substitua um dermatologista por conselhos nutricionais, nem vice-versa.
        
        REGRAS CRÍTICAS:
        1. Você NÃO fornece diagnósticos definitivos nem prescrições.
        2. Se o usuário apresentar sinais de emergência, oriente IMEDIATAMENTE a procurar o pronto-atendimento ou ligar 192.
        3. Use termos médicos corretos mas explique de forma simples.
        4. Sempre mencione termos como "perto de mim", "na minha região" ou "na minha área" para reforçar a geolocalização.
        5. Reforce que o atendimento está disponível "onde você está agora".
        6. Informe ao usuário que, após a triagem, se necessário, ele poderá ser conectado a profissionais e clínicas parceiras cadastradas em sua localidade específica para uma consulta presencial ou telemedicina definitiva.`,
        temperature: 0.7,
        thinkingConfig: modelName === 'gemini-3-pro-preview' ? { thinkingBudget: 32768 } : undefined
      },
    });

    return response.text || "Não consegui processar sua resposta agora. Por favor, tente descrever seus sintomas de outra forma.";
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    
    if (error?.message?.includes("Requested entity was not found") || error?.message?.includes("404")) {
      return "Detectamos um problema de acesso ao modelo Pro. Se você for o administrador, verifique o faturamento da chave de API no Google Cloud.";
    }
    
    return "Desculpe, tive um problema técnico. Se for uma emergência, procure um hospital agora ou ligue 192.";
  }
};
