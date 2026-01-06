
/**
 * IA HOSPITAL - Payment Service (Mercado Pago Integration)
 * Otimizado para carregar o SDK apenas quando necessário (Lazy Loading).
 */

declare var MercadoPago: any;

const MP_PUBLIC_KEY = 'TEST-3345849b-73a7-4b8c-8511-60a628a50f75'; 

const loadMercadoPagoSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof MercadoPago !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Falha ao carregar o SDK do Mercado Pago'));
    document.head.appendChild(script);
  });
};

export const initCheckoutPro = async (itemData: { title: string; price: number; quantity: number }) => {
  try {
    // Carrega o SDK sob demanda
    await loadMercadoPagoSDK();

    const mp = new MercadoPago(MP_PUBLIC_KEY, {
      locale: 'pt-BR'
    });

    console.log('Iniciando Checkout Pro para:', itemData.title);

    /**
     * EM PRODUÇÃO: Você deve fazer uma chamada ao seu backend aqui
     * para gerar uma 'preferenceId'.
     */
    
    return {
      success: true,
      message: 'Redirecionando para o ambiente seguro do Mercado Pago...',
    };
  } catch (error) {
    console.error('Erro no Checkout Mercado Pago:', error);
    throw error;
  }
};
