'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, Clock, CheckCircle, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useBetSlipStore } from '@/store/betSlip';
import { MatchWithOdds, DATE_LABELS } from '@/types';

interface MarketsGridProps {
  matches: MatchWithOdds[];
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function MarketsGrid({ matches }: MarketsGridProps) {
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [collapsedDates, setCollapsedDates] = useState<Set<string>>(new Set());
  const addSelection = useBetSlipStore((s) => s.addSelection);

  // Extract unique dates from matches
  const dates = useMemo(() => {
    const d = Array.from(new Set(matches.map((m) => m.date))).sort();
    return d;
  }, [matches]);

  // Group matches by date
  const groupedByDate = useMemo(() => {
    const filtered = matches.filter((m) => {
      const matchesSearch =
        !search ||
        m.homeTeam.toLowerCase().includes(search.toLowerCase()) ||
        m.awayTeam.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filterDate === 'all' || m.date === filterDate;
      return matchesSearch && matchesFilter;
    });

    const groups: Record<string, MatchWithOdds[]> = {};
    filtered.forEach((m) => {
      if (!groups[m.date]) groups[m.date] = [];
      groups[m.date].push(m);
    });

    // Sort keys
    const sortedKeys = Object.keys(groups).sort();
    return sortedKeys.map((date) => ({
      date,
      label: DATE_LABELS[date] || date,
      matches: groups[date],
    }));
  }, [matches, search, filterDate]);

  const toggleDateCollapse = (date: string) => {
    setCollapsedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return (
          <Badge variant="destructive" className="bg-[#FF4757]/10 text-[#FF4757] border-[#FF4757]/20 text-[10px] px-1.5 py-0">
            <span className="w-1.5 h-1.5 bg-[#FF4757] rounded-full animate-live-dot mr-1" />
            AO VIVO
          </Badge>
        );
      case 'finished':
        return (
          <Badge variant="secondary" className="bg-white/5 text-[#8B949E] text-[10px] px-1.5 py-0">
            <CheckCircle className="w-3 h-3 mr-0.5" />
            FINALIZADO
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="bg-[#FFD700]/10 text-[#FFD700] text-[10px] px-1.5 py-0">
            <Clock className="w-3 h-3 mr-0.5" />
            A BREVAR
          </Badge>
        );
    }
  };

  return (
    <section id="markets" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8E8E8] mb-8">
          Mercados <span className="text-[#00FF88]">de Apostas</span>
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
            <Input
              placeholder="Procurar equipa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[#161B22] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E]"
            />
          </div>
          <div className="flex gap-2 flex-wrap overflow-x-auto max-w-full pb-1">
            <button
              onClick={() => setFilterDate('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                filterDate === 'all'
                  ? 'bg-[#00FF88] text-[#0F1115]'
                  : 'bg-[#161B22] text-[#8B949E] hover:bg-white/5'
              }`}
            >
              Todos
            </button>
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setFilterDate(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  filterDate === d
                    ? 'bg-[#00FF88] text-[#0F1115]'
                    : 'bg-[#161B22] text-[#8B949E] hover:bg-white/5'
                }`}
              >
                {DATE_LABELS[d] || d}
              </button>
            ))}
          </div>
        </div>

        {/* Match count */}
        <div className="mb-4 text-xs text-[#8B949E]">
          {groupedByDate.reduce((acc, g) => acc + g.matches.length, 0)} jogos encontrados
        </div>

        {/* Grouped Matches by Date */}
        <div className="space-y-4">
          {groupedByDate.map((group) => {
            const isCollapsed = collapsedDates.has(group.date);
            return (
              <motion.div
                key={group.date}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                {/* Date Header */}
                <button
                  onClick={() => toggleDateCollapse(group.date)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-[#161B22] rounded-xl border border-[#00FF88]/10 hover:border-[#00FF88]/20 transition-colors group"
                >
                  <Calendar className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-sm font-semibold text-[#E8E8E8]">{group.label}</span>
                  <span className="text-xs text-[#8B949E]">({group.matches.length} jogos)</span>
                  <div className="ml-auto">
                    {isCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-[#8B949E] group-hover:text-[#00FF88] transition-colors" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-[#8B949E] group-hover:text-[#00FF88] transition-colors" />
                    )}
                  </div>
                </button>

                {/* Matches under this date */}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden space-y-2"
                    >
                      {group.matches.map((match) => {
                        const isExpanded = expandedId === match.id;
                        const h2h = match.odds.find((o) => o.type === 'h2h');
                        const ou = match.odds.find((o) => o.type === 'over_under_2.5');
                        const btts = match.odds.find((o) => o.type === 'btts');

                        return (
                          <motion.div
                            key={match.id}
                            layout
                            className="bg-[#161B22] rounded-xl border border-white/[0.05] overflow-hidden"
                          >
                            {/* Header Row */}
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : match.id)}
                              className="w-full p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                            >
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="hidden sm:block w-12 text-right text-xs text-[#8B949E]">
                                  {match.time}
                                </div>
                                <div className="flex-1 flex items-center justify-between gap-4">
                                  <div className="flex-1 text-right">
                                    <span className="text-sm font-medium text-[#E8E8E8]">{match.homeTeam}</span>
                                  </div>
                                  <div className="flex items-center gap-2 px-3">
                                    {match.status === 'live' ? (
                                      <>
                                        <span className="text-lg font-bold text-[#00FF88]">{match.homeScore}</span>
                                        <span className="text-xs text-[#8B949E]">-</span>
                                        <span className="text-lg font-bold text-[#00FF88]">{match.awayScore}</span>
                                      </>
                                    ) : (
                                      <span className="text-xs text-[#8B949E]">vs</span>
                                    )}
                                  </div>
                                  <div className="flex-1 text-left">
                                    <span className="text-sm font-medium text-[#E8E8E8]">{match.awayTeam}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {getStatusBadge(match.status)}
                                  {/* Quick H2H Odds */}
                                  {h2h && (
                                    <div className="hidden md:flex items-center gap-1">
                                      <span className="text-[10px] text-[#8B949E] bg-[#1A1F27] rounded px-1.5 py-0.5 font-bold text-[#00FF88]">{h2h.homeOdds.toFixed(2)}</span>
                                      <span className="text-[10px] text-[#8B949E] bg-[#1A1F27] rounded px-1.5 py-0.5 font-bold text-[#00FF88]">{h2h.drawOdds.toFixed(2)}</span>
                                      <span className="text-[10px] text-[#8B949E] bg-[#1A1F27] rounded px-1.5 py-0.5 font-bold text-[#00FF88]">{h2h.awayOdds.toFixed(2)}</span>
                                    </div>
                                  )}
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-[#8B949E]" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-[#8B949E]" />
                                  )}
                                </div>
                              </div>
                            </button>

                            {/* Expanded Markets */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 space-y-4 border-t border-white/[0.05] pt-4">
                                    {/* H2H */}
                                    {h2h && (
                                      <div>
                                        <p className="text-xs text-[#8B949E] mb-2 font-medium uppercase tracking-wider">{h2h.label}</p>
                                        <div className="grid grid-cols-3 gap-2">
                                          {[
                                            { label: match.homeTeam, key: '1', odds: h2h.homeOdds },
                                            { label: 'Empate', key: 'X', odds: h2h.drawOdds },
                                            { label: match.awayTeam, key: '2', odds: h2h.awayOdds },
                                          ].map((opt) => (
                                            <button
                                              key={opt.key}
                                              onClick={() =>
                                                addSelection({
                                                  id: `${match.id}-${h2h.type}-${opt.key}`,
                                                  matchId: match.id,
                                                  matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
                                                  marketType: h2h.type,
                                                  marketLabel: h2h.label,
                                                  selection: opt.label,
                                                  odds: opt.odds,
                                                })
                                              }
                                              className="bg-[#1A1F27] hover:bg-[#00FF88]/10 border border-white/[0.05] hover:border-[#00FF88]/30 rounded-lg p-3 text-center transition-all"
                                            >
                                              <span className="text-xs text-[#8B949E] block truncate">{opt.label}</span>
                                              <span className="text-sm font-bold text-[#00FF88]">{opt.odds.toFixed(2)}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Over/Under */}
                                    {ou && (
                                      <div>
                                        <p className="text-xs text-[#8B949E] mb-2 font-medium uppercase tracking-wider">{ou.label}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                          {[
                                            { label: 'Over 2.5', key: 'over', odds: ou.overOdds },
                                            { label: 'Under 2.5', key: 'under', odds: ou.underOdds },
                                          ].map((opt) => (
                                            <button
                                              key={opt.key}
                                              onClick={() =>
                                                addSelection({
                                                  id: `${match.id}-${ou.type}-${opt.key}`,
                                                  matchId: match.id,
                                                  matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
                                                  marketType: ou.type,
                                                  marketLabel: ou.label,
                                                  selection: opt.label,
                                                  odds: opt.odds,
                                                })
                                              }
                                              className="bg-[#1A1F27] hover:bg-[#00FF88]/10 border border-white/[0.05] hover:border-[#00FF88]/30 rounded-lg p-3 text-center transition-all"
                                            >
                                              <span className="text-xs text-[#8B949E] block">{opt.label}</span>
                                              <span className="text-sm font-bold text-[#00FF88]">{opt.odds.toFixed(2)}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* BTTS */}
                                    {btts && (
                                      <div>
                                        <p className="text-xs text-[#8B949E] mb-2 font-medium uppercase tracking-wider">{btts.label}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                          {[
                                            { label: 'Sim', key: 'yes', odds: btts.yesOdds },
                                            { label: 'Não', key: 'no', odds: btts.noOdds },
                                          ].map((opt) => (
                                            <button
                                              key={opt.key}
                                              onClick={() =>
                                                addSelection({
                                                  id: `${match.id}-${btts.type}-${opt.key}`,
                                                  matchId: match.id,
                                                  matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
                                                  marketType: btts.type,
                                                  marketLabel: btts.label,
                                                  selection: opt.label,
                                                  odds: opt.odds,
                                                })
                                              }
                                              className="bg-[#1A1F27] hover:bg-[#00FF88]/10 border border-white/[0.05] hover:border-[#00FF88]/30 rounded-lg p-3 text-center transition-all"
                                            >
                                              <span className="text-xs text-[#8B949E] block">{opt.label}</span>
                                              <span className="text-sm font-bold text-[#00FF88]">{opt.odds.toFixed(2)}</span>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {groupedByDate.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-8 h-8 text-[#2D333B] mx-auto mb-2" />
            <p className="text-sm text-[#8B949E]">Nenhum jogo encontrado</p>
          </div>
        )}
      </div>
    </section>
  );
}
