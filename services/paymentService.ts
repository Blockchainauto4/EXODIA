
/**
 * IA HOSPITAL - Payment Service (Stripe & Mercado Pago Integration)
 * Otimizado para carregar SDKs sob demanda.
 */

declare var MercadoPago: any;
declare var Stripe: any;

const MP_PUBLIC_KEY = 'TEST-3345849b-73a7-4b8c-8511-60a628a50f75'; 
const STRIPE_PUBLIC_KEY = 'pk_test_51...'; // Chave de teste do Stripe (substituir)

const loadSDK = (src: string, checker: () => boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (checker()) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Falha ao carregar o SDK de ${src}`));
    document.head.appendChild(script);
  });
};

export const initCheckoutProMP = async (itemData: { title: string; price: number; quantity: number }) => {
  try {
    await loadSDK('https://sdk.mercadopago.com/js/v2', () => typeof MercadoPago !== 'undefined');

    const mp = new MercadoPago(MP_PUBLIC_KEY, { locale: 'pt-BR' });

    // EM PRODUÇÃO: Esta chamada seria para o seu backend para criar uma preferenceId
    console.log('Backend Call (Simulado): Criar preferência de pagamento Mercado Pago para:', itemData);
    const preferenceId = 'SIMULATED_PREFERENCE_ID';

    // Simulação de redirecionamento
    alert(`Redirecionando para Checkout Pro do Mercado Pago.\nID da Preferência: ${preferenceId}`);

    return { success: true };
  } catch (error) {
    console.error('Erro no Checkout Mercado Pago:', error);
    throw error;
  }
};

export const initStripeCheckout = async (itemData: { title: string; price: number; quantity: number }) => {
  try {
    await loadSDK('https://js.stripe.com/v3/', () => typeof Stripe !== 'undefined');
    
    const stripe = Stripe(STRIPE_PUBLIC_KEY);

    // EM PRODUÇÃO: Esta chamada seria para o seu backend para criar uma sessão de checkout
    console.log('Backend Call (Simulado): Criar sessão de checkout Stripe para:', itemData);
    const sessionId = 'cs_test_SIMULATED_SESSION_ID';

    // Simulação de redirecionamento
    alert(`Redirecionando para Checkout Stripe.\nID da Sessão: ${sessionId}`);
    
    // const { error } = await stripe.redirectToCheckout({ sessionId });
    // if (error) {
    //   throw new Error(error.message);
    // }

    return { success: true };
  } catch (error) {
    console.error('Erro no Checkout Stripe:', error);
    throw error;
  }
};
