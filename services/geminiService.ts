
import { GoogleGenAI } from "@google/genai";

export const getMedicalOrientation = async (prompt: string, history: { role: string; text: string }[]) => {
  // Inicializamos dentro da função para garantir que o process.env.API_KEY tenha sido injetado pelo ambiente
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })),
        { parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Você é o assistente virtual do IA HOSPITAL. 
        Sua função é fornecer ORIENTAÇÃO MÉDICA e TRIAGEM PRELIMINAR de forma empática e profissional. 
        REGRAS CRÍTICAS:
        1. Você NÃO fornece diagnósticos definitivos nem prescrições.
        2. Se o usuário apresentar sinais de emergência (dor no peito, falta de ar grave, perda de consciência), oriente IMEDIATAMENTE a procurar o pronto-atendimento mais próximo ou ligar para o 192 (SAMU).
        3. Use termos médicos corretos mas explique de forma simples.
        4. Sempre mencione termos como "perto de mim", "na minha região", "atendimento local" ou "na minha área" para reforçar a geolocalização e proximidade.
        5. Reforce que o atendimento está disponível "onde você está agora" e que o serviço está "aberto agora".
        6. Seja conciso e focado em educação em saúde.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema técnico ao acessar o serviço de IA. Se for uma emergência, procure um hospital agora ou ligue 192.";
  }
};
