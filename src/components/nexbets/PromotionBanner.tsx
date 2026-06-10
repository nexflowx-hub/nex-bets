'use client';

import { motion } from 'framer-motion';
import { Gift, Trophy, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromotionBannerProps {
  onOpenWallet: () => void;
  onScrollToWinner: () => void;
}

export default function PromotionBanner({ onOpenWallet, onScrollToWinner }: PromotionBannerProps) {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Promo 1: Deposit Bonus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-xl overflow-hidden border border-[#00FF88]/20 neon-glow"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl animate-neon-pulse" 
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,136,0.05) 0%, transparent 50%, rgba(0,255,136,0.05) 100%)',
              }}
            />
            <div className="relative p-5 sm:p-6 bg-[#161B22]/90">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-[#00FF88]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#E8E8E8]">
                    Bónus de Carregamento
                  </h3>
                  <p className="text-xs text-[#8B949E]">Promoção por tempo limitado</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-[#8B949E] mb-2">
                  Carregue <span className="text-[#00FF88] font-bold">R$ 100+</span> e receba
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#00FF88] neon-glow-text">
                  R$ 50 <span className="text-sm font-normal text-[#8B949E]">GRÁTIS</span>
                </p>
              </div>
              <Button
                onClick={onOpenWallet}
                className="w-full bg-[#00FF88] text-[#0F1115] font-bold hover:bg-[#00FF88]/90 neon-glow text-sm"
              >
                <Zap className="w-4 h-4 mr-2" />
                Carregar Agora
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </motion.div>

          {/* Promo 2: Winner Bet 2x */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-xl overflow-hidden border border-[#FFD700]/20"
            style={{
              boxShadow: '0 0 15px rgba(255,215,0,0.1), 0 0 30px rgba(255,215,0,0.05)',
            }}
          >
            <div className="absolute inset-0 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, transparent 50%, rgba(255,215,0,0.05) 100%)',
              }}
            />
            <div className="relative p-5 sm:p-6 bg-[#161B22]/90">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-[#FFD700]" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#E8E8E8]">
                    Aposta 2x Vencedor
                  </h3>
                  <p className="text-xs text-[#FFD700]">Promoção exclusiva</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-[#8B949E] mb-2">
                  Aposte no vencedor da Copa do Mundo
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#FFD700]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>
                  2x <span className="text-sm font-normal text-[#8B949E]">Valor da Aposta</span>
                </p>
                <p className="text-xs text-[#8B949E] mt-1">
                  Cada <span className="text-[#FFD700] font-bold">R$ 100</span> = <span className="text-[#FFD700] font-bold">R$ 200</span> em aposta
                </p>
              </div>
              <Button
                onClick={onScrollToWinner}
                className="w-full bg-[#FFD700] text-[#0F1115] font-bold hover:bg-[#FFD700]/90 text-sm"
                style={{ boxShadow: '0 0 10px rgba(255,215,0,0.3)' }}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Apostar no Vencedor
                <ArrowRight className="w-4 h-4 ml-auto" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
