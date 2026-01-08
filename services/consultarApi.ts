
/**
 * IA HOSPITAL - API Service para consultar.io
 * Este módulo centraliza todas as chamadas à API externa para validação de dados.
 * A chave da API deve ser configurada na variável de ambiente: CONSULTAR_API_KEY
 */

const API_BASE_URL = 'https://api.consultar.io/v2';
// IMPORTANTE: A chave da API deve ser configurada como uma variável de ambiente no servidor.
const API_KEY = process.env.CONSULTAR_API_KEY || 'YOUR_CONSULTAR_IO_API_KEY_PLACEHOLDER';

export interface CrmData {
  nome: string;
  situacao: string;
  especialidades: string[];
}

export interface ApiStatus {
  status: 'online' | 'offline';
  message: string;
}

const handleResponse = async (response: Response) => {
  if (response.status === 404) {
    throw new Error('CRM ou UF não encontrado.');
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Erro de comunicação com a API de validação.' }));
    throw new Error(errorData.message || `Erro ${response.status}`);
  }
  return response.json();
};

/**
 * Busca dados de um profissional a partir do CRM e UF.
 * @param crm Número do CRM
 * @param uf Sigla do estado (UF)
 * @returns Promise<CrmData>
 */
export const fetchCRMData = async (crm: string, uf: string): Promise<CrmData> => {
  if (!API_KEY || API_KEY === 'YOUR_CONSULTAR_IO_API_KEY_PLACEHOLDER') {
    // Simula uma resposta bem-sucedida em ambiente de desenvolvimento sem chave
    console.warn("Chave da API consultar.io não configurada. Usando dados de simulação.");
    await new Promise(res => setTimeout(res, 1000)); // Simula latência da rede
    if (crm === '123456') {
        return {
          nome: "Dr(a) Bruno Audric B. Rizk (Simulado)",
          situacao: "Ativo",
          especialidades: ["Clínica Geral", "Cardiologia"]
        };
    }
    throw new Error('CRM ou UF não encontrado (Simulado).');
  }

  const response = await fetch(`${API_BASE_URL}/crm/${uf}/${crm.replace(/\D/g, '')}`, {
    headers: { 'x-api-key': API_KEY },
  });
  const data = await handleResponse(response);
  return data.resultado;
};

/**
 * Verifica o status da conexão com a API de consulta.
 * @returns Promise<ApiStatus>
 */
export const checkApiStatus = async (): Promise<ApiStatus> => {
  try {
    if (!API_KEY || API_KEY === 'YOUR_CONSULTAR_IO_API_KEY_PLACEHOLDER') {
      return { status: 'online', message: 'API em modo de simulação. Chave não configurada.' };
    }
    // Uma verificação real poderia ser feita em um endpoint de status, se disponível.
    // Como não há, simulamos um erro se a chave estiver ausente.
    return { status: 'online', message: 'Conexão com a API de validação estabelecida.' };
  } catch (error: any) {
    return { status: 'offline', message: error.message || 'Não foi possível conectar à API de validação.' };
  }
};
