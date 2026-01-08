
import React, { useState } from 'react';
import { initCheckoutProMP, initStripeCheckout } from '../services/paymentService';

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState<null | 'stripe' | 'mp'>(null);
  const [error, setError] = useState('');

  const handlePayment = async (provider: 'stripe' | 'mp') => {
    setIsLoading(provider);
    setError('');
    try {
      const itemData = { title: 'IA HOSPITAL PRO - Assinatura Mensal', price: 199.90, quantity: 1 };
      if (provider === 'stripe') {
        await initStripeCheckout(itemData);
      } else {
        await initCheckoutProMP(itemData);
      }
    } catch (err: any) {
      setError('Falha ao iniciar o pagamento. Tente novamente.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_0_100px_rgba(37,99,235,0.4)] overflow-hidden animate-fade-in border border-white/20">
        <div className="p-12 text-center">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg shadow-blue-50 mb-8">
            ⏱️
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">Sua Demonstração Terminou</h2>
          <p className="text-slate-600 font-medium mt-4">Continue com acesso ilimitado à triagem por vídeo, prontuário inteligente e mais.</p>
          
          <div className="my-8 p-6 bg-slate-50 border border-slate-200 rounded-[2rem]">
            <p className="text-sm font-black text-slate-800 uppercase">Plano IA HOSPITAL PRO</p>
            <p className="text-4xl font-black text-blue-600 tracking-tighter mt-1">R$199<span className="text-lg">,90/mês</span></p>
          </div>
          
          {error && <p className="text-red-600 text-xs font-bold mb-4">{error}</p>}
          
          <div className="space-y-4">
            <button 
              onClick={() => handlePayment('stripe')}
              disabled={!!isLoading}
              className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {isLoading === 'stripe' ? 'Aguarde...' : 'Assinar com Stripe'}
            </button>
            <button 
              onClick={() => handlePayment('mp')}
              disabled={!!isLoading}
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {isLoading === 'mp' ? 'Aguarde...' : 'Assinar com Mercado Pago'}
            </button>
          </div>

           <button 
            onClick={onClose}
            className="mt-6 text-xs text-slate-500 hover:text-slate-800 font-bold uppercase tracking-widest transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
