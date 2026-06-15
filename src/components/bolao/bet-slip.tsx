'use client';

import { outrightWinnerOdds, groupStageMatches, countryFlags, CHAMPION_BONUS, MATCH_BONUS_THRESHOLD, MATCH_BONUS_MULTIPLIER, formatCurrency } from '@/lib/data';
import { useBetStore } from '@/store/bet-store';
import { Button } from '@/components/ui/button';
import { Ticket, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function BetSlip() {
  const {
    selectedWinner,
    winnerStake,
    selectedMatches,
    matchesStake,
    setIsCheckoutOpen,
  } = useBetStore();

  // Computed values
  const winnerObj = outrightWinnerOdds.find(o => o.team === selectedWinner);
  const winnerOdd = winnerObj?.odd ?? 0;
  const winnerPotential = winnerStake * winnerOdd * CHAMPION_BONUS;

  const selectedMatchKeys = Object.keys(selectedMatches);
  let matchesTotalOdd = selectedMatchKeys.length > 0 ? 1 : 0;
  selectedMatchKeys.forEach(matchId => {
    const match = groupStageMatches.find(m => m.id === matchId);
    if (match) {
      matchesTotalOdd *= match.odds[selectedMatches[matchId] as keyof typeof match.odds];
    }
  });

  const isMatchesBonusActive = matchesStake >= MATCH_BONUS_THRESHOLD;
  const finalMatchesOdd = isMatchesBonusActive
    ? matchesTotalOdd * MATCH_BONUS_MULTIPLIER
    : matchesTotalOdd;
  const matchesPotential =
    selectedMatchKeys.length > 0 ? matchesStake * finalMatchesOdd : 0;

  const totalInvestment =
    winnerStake + (selectedMatchKeys.length > 0 ? matchesStake : 0);
  const totalPotential = winnerPotential + matchesPotential;

  const winnerFlag = countryFlags[selectedWinner] ?? '🏳️';

  return (
    <aside className="sticky top-8">
      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Ticket className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
              Seu Boletim
            </h2>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold px-3 py-1 animate-pulse">
            AO VIVO
          </span>
        </div>

        {/* Champion summary */}
        <motion.div
          layout
          className="bg-black/50 rounded-xl border border-amber-500/20 p-5 relative overflow-hidden"
        >
          {/* Amber glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Campeão
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                5X Ativo
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{winnerFlag}</span>
              <div>
                <p className="text-white font-bold text-base">{selectedWinner}</p>
                <p className="text-white/40 text-xs">
                  Odd: <span className="text-amber-400 font-semibold">{winnerOdd.toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-amber-500/10">
              <span className="text-white/50 text-sm">Retorno estimado</span>
              <span className="text-amber-400 font-black text-lg">
                R$ {formatCurrency(winnerPotential)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Matches summary */}
        <motion.div
          layout
          className="bg-black/50 rounded-xl border border-emerald-500/20 p-5 relative overflow-hidden"
        >
          {/* Emerald glow */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/10 blur-xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                Jogos
              </span>
              {selectedMatchKeys.length > 0 && isMatchesBonusActive && (
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2X Ativo
                </span>
              )}
            </div>

            {selectedMatchKeys.length > 0 ? (
              <>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">
                      {selectedMatchKeys.length} {selectedMatchKeys.length === 1 ? 'jogo' : 'jogos'}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      Odd combinada: {finalMatchesOdd.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Aposta por jogo</span>
                    <span className="text-white font-semibold">
                      R$ {formatCurrency(matchesStake)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-emerald-500/10">
                  <span className="text-white/50 text-sm">Retorno estimado</span>
                  <span className="text-emerald-400 font-black text-lg">
                    R$ {formatCurrency(matchesPotential)}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-white/30 text-sm italic py-2 text-center">
                Nenhum jogo selecionado ainda.
                <br />
                <span className="text-white/20 text-xs">
                  Selecione jogos acima para adicionar ao boletim.
                </span>
              </p>
            )}
          </div>
        </motion.div>

        {/* Totalizer */}
        <div className="border-t border-white/10 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm">Investimento Total</span>
            <span className="text-white font-bold text-lg">
              R$ {formatCurrency(totalInvestment)}
            </span>
          </div>

          <motion.div
            key={totalPotential}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="bg-gradient-to-r from-amber-400/10 to-emerald-400/10 border border-amber-400/20 rounded-xl p-4 text-center"
          >
            <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
              GANHO TOTAL
            </p>
            <p className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent text-3xl md:text-4xl font-black">
              R$ {formatCurrency(totalPotential)}
            </p>
          </motion.div>
        </div>

        {/* Checkout button */}
        <motion.div whileHover={totalPotential > 0 ? { scale: 1.02 } : {}} whileTap={totalPotential > 0 ? { scale: 0.98 } : {}}>
          <Button
            disabled={totalPotential === 0}
            onClick={() => setIsCheckoutOpen(true)}
            className={`w-full py-5 rounded-2xl text-xl font-black transition-all duration-300 ${
              totalPotential > 0
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-black hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-105'
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            FINALIZAR APOSTA
          </Button>
        </motion.div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <Shield className="w-3.5 h-3.5 text-white/40" />
          <span className="text-white/40 text-xs">
            Pagamento 100% Seguro via PIX
          </span>
        </div>
      </div>
    </aside>
  );
}
