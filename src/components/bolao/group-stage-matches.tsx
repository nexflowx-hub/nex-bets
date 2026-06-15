'use client';

import { groupStageMatches, countryFlags, MATCH_BONUS_THRESHOLD, MATCH_BONUS_MULTIPLIER, formatCurrency } from '@/lib/data';
import type { Match } from '@/lib/data';
import { useBetStore } from '@/store/bet-store';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

const PRESET_STAKES = [
  { label: 'R$50', value: 50 },
  { label: 'R$100', value: 100 },
  { label: 'R$200', value: 200 },
];

const oddLabels: Record<string, string> = {
  '1': 'Vitória Casa',
  'X': 'EMPATE',
  '2': 'Vitória Fora',
};

export function GroupStageMatches() {
  const { selectedMatches, matchesStake, setMatchesStake, handleMatchSelect } = useBetStore();

  const isBonusActive = matchesStake >= MATCH_BONUS_THRESHOLD;
  const remainingForBonus = Math.max(0, MATCH_BONUS_THRESHOLD - matchesStake);
  const selectedCount = Object.keys(selectedMatches).length;

  return (
    <section
      className="bg-white/[0.03] backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10 border-t border-emerald-400/30 relative shadow-2xl overflow-hidden"
    >
      {/* Emerald glow effect */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Football field watermark SVG */}
      <svg
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 opacity-5 pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="10" y="10" width="180" height="180" rx="8" stroke="white" strokeWidth="2" />
        <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="3" fill="white" />
        <rect x="10" y="60" width="40" height="80" stroke="white" strokeWidth="1.5" />
        <rect x="150" y="60" width="40" height="80" stroke="white" strokeWidth="1.5" />
        <rect x="10" y="75" width="16" height="50" stroke="white" strokeWidth="1.2" />
        <rect x="174" y="75" width="16" height="50" stroke="white" strokeWidth="1.2" />
        <path d="M 40 80 A 40 20 0 0 1 40 120" stroke="white" strokeWidth="1.2" />
        <path d="M 160 80 A 40 20 0 0 0 160 120" stroke="white" strokeWidth="1.2" />
      </svg>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-7 h-7 text-emerald-400" />
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Jogos de Elite
          </h2>
        </div>
        <p className="text-white/50 text-sm md:text-base">
          Aposte nos jogos da fase de grupos e ganhe um bônus de{' '}
          <span className="text-emerald-400 font-bold">2X</span> para apostas acima de{' '}
          <span className="text-emerald-400 font-bold">R$ {formatCurrency(MATCH_BONUS_THRESHOLD)}</span>.
        </p>
      </div>

      {/* Dynamic badge */}
      <div className="relative z-10 mb-6">
        <AnimatePresence mode="wait">
          {isBonusActive ? (
            <motion.div
              key="active"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-400 text-black font-black text-sm px-4 py-2 rounded-full -rotate-2 animate-pulse"
            >
              <Trophy className="w-4 h-4" />
              2X ATIVADO!
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-emerald-400/30 text-white/70 text-sm px-4 py-2 rounded-full"
            >
              <span className="text-emerald-400 font-semibold">
                Faltam R$ {formatCurrency(remainingForBonus)}
              </span>{' '}
              para o 2X
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global stake selector */}
      <div className="relative z-10 mb-8">
        <div className="bg-black/50 backdrop-blur-md rounded-2xl p-4">
          <p className="text-white/40 text-xs mb-3 font-semibold uppercase tracking-wider">
            Valor da Aposta por Jogo
          </p>
          <div className="flex gap-3">
            {PRESET_STAKES.map((preset) => {
              const isSelected = matchesStake === preset.value;
              const isHundred = preset.value === 100;
              return (
                <motion.button
                  key={preset.value}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMatchesStake(preset.value)}
                  className={`relative flex-1 py-3 rounded-xl font-black text-base transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/25'
                      : 'bg-white/10 text-white hover:bg-white/15'
                  }`}
                >
                  {preset.label}
                  {!isSelected && isHundred && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Match list */}
      <div className="relative z-10 space-y-4">
        {groupStageMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            selectedOutcome={selectedMatches[match.id]}
            onSelect={handleMatchSelect}
          />
        ))}
      </div>

      {/* Matches selected info */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="relative z-10 mt-6 text-center"
          >
            <p className="text-white/40 text-sm">
              {selectedCount} {selectedCount === 1 ? 'jogo selecionado' : 'jogos selecionados'}
              {isBonusActive && (
                <span className="text-emerald-400 font-bold ml-2">
                  · Bônus 2X ativado · Multiplicador: {MATCH_BONUS_MULTIPLIER}X
                </span>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Match Card ---------- */

interface MatchCardProps {
  match: Match;
  selectedOutcome?: string;
  onSelect: (matchId: string, selection: string) => void;
}

function MatchCard({ match, selectedOutcome, onSelect }: MatchCardProps) {
  const homeFlag = countryFlags[match.home] ?? '🏳️';
  const awayFlag = countryFlags[match.away] ?? '🏳️';
  const matchGroup = match.group ?? '';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-black/30 border border-white/5 rounded-2xl p-4 md:p-5 transition-colors hover:border-white/10"
    >
      {/* Top row: Date/Time + Group badge */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-white/50 text-xs">{match.date}</span>
          <span className="text-emerald-400 font-black text-xs ml-2">{match.time}</span>
        </div>
        {matchGroup && (
          <span className="bg-white/10 text-white/60 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Grupo {matchGroup}
          </span>
        )}
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-white font-bold text-sm md:text-base">
          {match.home}
        </span>
        <span className="text-2xl">{homeFlag}</span>
        <span className="text-white/30 font-light text-sm">vs</span>
        <span className="text-2xl">{awayFlag}</span>
        <span className="text-white font-bold text-sm md:text-base">
          {match.away}
        </span>
      </div>

      {/* Odd buttons */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {(['1', 'X', '2'] as const).map((outcome) => {
          const odd = match.odds[outcome];
          const isSelected = selectedOutcome === outcome;

          return (
            <motion.button
              key={outcome}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(match.id, outcome)}
              className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-200 ${
                isSelected
                  ? 'border-emerald-500/50 bg-emerald-950/40 shadow-lg shadow-emerald-500/10 scale-[1.01]'
                  : 'border-white/5 bg-black/40 hover:border-white/15 hover:bg-black/60'
              }`}
            >
              {/* Selected indicator glow */}
              {isSelected && (
                <motion.div
                  layoutId={`glow-${match.id}`}
                  className="absolute inset-0 rounded-xl bg-emerald-500/10 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              <span className="text-white/60 text-[10px] md:text-xs font-medium mb-1 leading-tight">
                {oddLabels[outcome]}
              </span>
              <span
                className={`text-lg md:text-xl font-black ${
                  isSelected ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {odd.toFixed(2)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
