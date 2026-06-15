'use client';

import { HeroSection } from '@/components/bolao/hero-section';
import { OutrightWinner } from '@/components/bolao/outright-winner';
import { GroupStageMatches } from '@/components/bolao/group-stage-matches';
import { BetSlip } from '@/components/bolao/bet-slip';
import { CheckoutModal } from '@/components/bolao/checkout-modal';
import { useBetStore } from '@/store/bet-store';

export default function Home() {
  const setIsCheckoutOpen = useBetStore((s) => s.setIsCheckoutOpen);

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,#020617_100%)] text-white">
      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Betting Sections */}
          <div className="xl:col-span-8 space-y-8">
            <OutrightWinner />
            <GroupStageMatches />
          </div>

          {/* Right Column: Sticky Bet Slip */}
          <div className="xl:col-span-4">
            <div className="hidden xl:block">
              <BetSlip />
            </div>
          </div>
        </div>

        {/* Mobile Bet Slip */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent pb-6">
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-black font-black text-lg py-4 rounded-2xl shadow-[0_10px_30px_rgba(52,211,153,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            VER BOLETIM E FINALIZAR APOSTA
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">⚽</span>
            <span>Bolão Copa 2026 — Todos os direitos reservados</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Termos de Uso</span>
            <span>Política de Privacidade</span>
            <span>Jogo Responsável</span>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal />
    </div>
  );
}