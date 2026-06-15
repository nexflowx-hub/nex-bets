'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { outrightWinnerOdds, CHAMPION_BONUS, formatCurrency } from '@/lib/data';
import { useBetStore } from '@/store/bet-store';

export function OutrightWinner() {
  const selectedWinner = useBetStore((s) => s.selectedWinner);
  const winnerStake = useBetStore((s) => s.winnerStake);
  const setSelectedWinner = useBetStore((s) => s.setSelectedWinner);
  const setWinnerStake = useBetStore((s) => s.setWinnerStake);

  const selectedOdd = outrightWinnerOdds.find((t) => t.team === selectedWinner)?.odd ?? 0;
  const potentialReturn = winnerStake * selectedOdd * CHAMPION_BONUS;

  return (
    <section id="outright-winner" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        {/* Glass panel */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 border-t-amber-400/30 bg-white/[0.03] backdrop-blur-xl p-6 md:p-10 shadow-2xl">
          {/* Amber glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Trophy className="size-6 text-amber-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Campeão 2026
                </h2>
              </div>
              <p className="text-white/50 text-sm">
                Acerte o campeão e ganhe com bônus de 5× no prêmio.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Badge className="bg-amber-400 text-black border-0 rounded-xl px-4 py-1.5 text-sm font-bold animate-pulse [transform:rotate(-2deg)]">
                <Zap className="size-4" />
                SUPER BÔNUS 5X
              </Badge>
            </div>
          </div>

          {/* Team grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
            {outrightWinnerOdds.map((team) => {
              const isSelected = selectedWinner === team.team;
              return (
                <motion.button
                  key={team.team}
                  onClick={() => setSelectedWinner(team.team)}
                  className={`
                    relative flex flex-col items-center gap-2 rounded-2xl border p-4 md:p-5 transition-all cursor-pointer
                    ${
                      isSelected
                        ? 'border-amber-400 bg-amber-500/20 shadow-[0_0_24px_rgba(245,158,11,0.25)]'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                    }
                  `}
                  whileTap={{ scale: 0.97 }}
                  layout
                >
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        layoutId="winner-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -top-2 -right-2 z-20 bg-amber-400 text-black text-[10px] font-extrabold px-2 py-0.5 rounded-lg leading-none"
                      >
                        5X ATIVADO
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span className="text-4xl leading-none">{team.flag}</span>
                  <span className="text-white font-semibold text-sm md:text-base truncate w-full text-center">
                    {team.team}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white/60">
                    COTAÇÃO{' '}
                    <span className={isSelected ? 'text-amber-400 font-bold' : 'text-white/90 font-semibold'}>
                      {team.odd.toFixed(2)}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Simulator */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
              <Zap className="size-5 text-amber-400" />
              Simulador de Retorno
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* Stake input */}
              <div className="w-full sm:w-auto flex-1 max-w-xs">
                <label className="block text-white/40 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Valor da Aposta
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none">
                      R$
                    </span>
                    <Input
                      type="number"
                      min={1}
                      step={10}
                      value={winnerStake}
                      onChange={(e) =>
                        setWinnerStake(Math.max(0, Number(e.target.value)))
                      }
                      className="bg-black/40 border-white/10 text-white text-lg font-semibold pl-8 h-11 rounded-xl focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setWinnerStake(winnerStake + 50)}
                    className="border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-xl h-11 px-4 text-sm font-semibold shrink-0"
                  >
                    +50
                  </Button>
                </div>
              </div>

              {/* Multiplier */}
              <div className="hidden sm:flex flex-col items-center gap-1">
                <span className="text-white/30 text-xs font-medium uppercase tracking-wider">
                  Multiplicador
                </span>
                <span className="text-2xl font-bold text-white/60">×</span>
                <span className="text-amber-400 font-bold text-sm">
                  {selectedOdd.toFixed(2)} × {CHAMPION_BONUS}
                </span>
              </div>

              {/* Result */}
              <div className="w-full sm:w-auto sm:text-right">
                <label className="block text-white/40 text-xs font-medium uppercase tracking-wider mb-1.5">
                  Retorno Estimado
                </label>
                <div className="flex sm:flex-col items-baseline gap-1 sm:gap-0">
                  <span className="text-white/50 text-sm">R$</span>
                  <motion.span
                    key={potentialReturn}
                    initial={{ y: 8, opacity: 0.5 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent"
                  >
                    {formatCurrency(potentialReturn)}
                  </motion.span>
                </div>
                <p className="text-white/30 text-xs mt-1">
                  com bônus de {CHAMPION_BONUS}× ativado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}