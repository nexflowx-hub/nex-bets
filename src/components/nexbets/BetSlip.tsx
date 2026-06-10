'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, Trash2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBetSlipStore } from '@/store/betSlip';

export default function BetSlip() {
  const {
    selections,
    stakes,
    isOpen,
    removeSelection,
    clearSlip,
    setStake,
    toggleSlip,
    totalOdds,
    totalStake,
    potentialReturn,
  } = useBetSlipStore();

  const quickStakes = [5, 10, 25, 50, 100];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleSlip}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden rounded-t-2xl glass-panel"
          >
            <div className="flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-[#00FF88]" />
                  <h2 className="text-lg font-bold text-[#E8E8E8]">Boletim de Apostas</h2>
                  {selections.length > 0 && (
                    <span className="bg-[#00FF88] text-[#0F1115] text-xs font-bold rounded-full px-2 py-0.5">
                      {selections.length}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {selections.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSlip}
                      className="text-[#8B949E] hover:text-[#FF4757] text-xs"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Limpar
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={toggleSlip} className="text-[#8B949E] hover:text-white">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Selections */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {selections.length === 0 ? (
                  <div className="text-center py-12">
                    <Receipt className="w-12 h-12 text-[#2D333B] mx-auto mb-3" />
                    <p className="text-[#8B949E] text-sm">Nenhuma seleção</p>
                    <p className="text-[#2D333B] text-xs mt-1">
                      Clique numa odd para adicionar
                    </p>
                  </div>
                ) : (
                  selections.map((sel) => (
                    <motion.div
                      key={sel.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      className="bg-[#1A1F27] rounded-lg p-3 border border-white/[0.05]"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#E8E8E8] truncate">
                            {sel.matchLabel}
                          </p>
                          <p className="text-xs text-[#8B949E]">
                            {sel.marketLabel} — {sel.selection}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2 shrink-0">
                          <span className="text-[#00FF88] font-bold text-sm">
                            {sel.odds.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSelection(sel.id)}
                            className="h-6 w-6 text-[#8B949E] hover:text-[#FF4757]"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Stake */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-white/[0.1] hover:bg-white/5"
                          onClick={() => setStake(sel.id, (stakes[sel.id] || 10) - 5)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <div className="flex-1 bg-[#0F1115] rounded px-3 py-1 text-center">
                          <span className="text-sm text-[#E8E8E8] font-mono">
                            ${(stakes[sel.id] || 10).toFixed(2)}
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-white/[0.1] hover:bg-white/5"
                          onClick={() => setStake(sel.id, (stakes[sel.id] || 10) + 5)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Quick Stakes */}
                      <div className="flex gap-1 mt-2">
                        {quickStakes.map((qs) => (
                          <button
                            key={qs}
                            onClick={() => setStake(sel.id, qs)}
                            className={`flex-1 text-xs py-1 rounded transition-colors ${
                              stakes[sel.id] === qs
                                ? 'bg-[#00FF88]/20 text-[#00FF88]'
                                : 'bg-white/5 text-[#8B949E] hover:bg-white/10'
                            }`}
                          >
                            ${qs}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {selections.length > 0 && (
                <div className="border-t border-white/[0.08] p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-[#8B949E]">Odds Total</p>
                      <p className="text-lg font-bold text-[#E8E8E8] font-mono">
                        {totalOdds().toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B949E]">Aposta Total</p>
                      <p className="text-lg font-bold text-[#E8E8E8] font-mono">
                        ${totalStake().toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8B949E]">Retorno</p>
                      <p className="text-lg font-bold text-[#00FF88] font-mono">
                        ${potentialReturn().toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <Button className="w-full bg-[#00FF88] text-[#0F1115] font-bold hover:bg-[#00FF88]/90 neon-glow py-6 text-base">
                    Confirmar Apostas
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
