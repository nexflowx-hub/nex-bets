'use client';

import { motion } from 'framer-motion';
import { Monitor, Radio, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBetSlipStore } from '@/store/betSlip';
import { MatchWithOdds } from '@/types';

interface LiveStreamPanelProps {
  matches: MatchWithOdds[];
}

export default function LiveStreamPanel({ matches }: LiveStreamPanelProps) {
  const addSelection = useBetSlipStore((s) => s.addSelection);
  const liveMatches = matches.filter((m) => m.status === 'live');

  return (
    <section id="live" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 bg-[#FF4757] rounded-full animate-live-dot" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E8E8E8]">
            Transmissão <span className="text-[#00FF88]">Ao Vivo</span>
          </h2>
          <span className="bg-[#FF4757]/10 text-[#FF4757] text-xs font-bold px-2 py-1 rounded-full border border-[#FF4757]/20">
            LIVE
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden border border-[#00FF88]/20 neon-glow">
              <div className="aspect-video bg-[#0F1115]">
                <iframe
                  src="https://www.youtube.com/embed?listType=user_uploads&list=getv&autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&playsinline=1"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  title="GETV Live Stream"
                  style={{ border: 0 }}
                />
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#0F1115]/80 backdrop-blur-sm rounded-full px-3 py-1">
                <Radio className="w-3 h-3 text-[#FF4757] animate-live-dot" />
                <span className="text-xs font-medium text-white">AO VIVO</span>
              </div>
            </div>
            {/* Ver no GETV link */}
            <div className="mt-3">
              <a
                href="https://www.youtube.com/@getv/streams"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#00FF88] hover:text-[#00FF88]/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver no GETV
              </a>
            </div>
          </div>

          {/* Live Matches */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-[#00FF88]" />
              <h3 className="text-sm font-semibold text-[#8B949E] uppercase tracking-wider">
                Jogos em Curso
              </h3>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {liveMatches.length === 0 ? (
                <div className="text-center py-8">
                  <Radio className="w-8 h-8 text-[#2D333B] mx-auto mb-2" />
                  <p className="text-sm text-[#8B949E]">Nenhum jogo ao vivo</p>
                </div>
              ) : (
                liveMatches.map((match, i) => {
                  const h2h = match.odds.find((o) => o.type === 'h2h');
                  return (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-[#161B22] rounded-lg p-3 border border-white/[0.05]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#8B949E]">{match.round}</span>
                        <span className="flex items-center gap-1 text-[10px] text-[#FF4757] font-bold">
                          <span className="w-1.5 h-1.5 bg-[#FF4757] rounded-full animate-live-dot" />
                          AO VIVO
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-right flex-1">
                          <p className="text-sm font-medium text-[#E8E8E8]">{match.homeTeam}</p>
                        </div>
                        <div className="flex items-center gap-2 mx-3">
                          <span className="text-xl font-bold text-[#00FF88] animate-score-pulse">{match.homeScore}</span>
                          <span className="text-xs text-[#8B949E]">-</span>
                          <span className="text-xl font-bold text-[#00FF88] animate-score-pulse">{match.awayScore}</span>
                        </div>
                        <div className="text-left flex-1">
                          <p className="text-sm font-medium text-[#E8E8E8]">{match.awayTeam}</p>
                        </div>
                      </div>
                      {h2h && (
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { label: '1', odds: h2h.homeOdds },
                            { label: 'X', odds: h2h.drawOdds },
                            { label: '2', odds: h2h.awayOdds },
                          ].map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() =>
                                addSelection({
                                  id: `${match.id}-${h2h.type}-${opt.label}`,
                                  matchId: match.id,
                                  matchLabel: `${match.homeTeam} vs ${match.awayTeam}`,
                                  marketType: h2h.type,
                                  marketLabel: h2h.label,
                                  selection: opt.label,
                                  odds: opt.odds,
                                })
                              }
                              className="bg-[#1A1F27] hover:bg-[#00FF88]/10 border border-white/[0.05] hover:border-[#00FF88]/30 rounded p-1.5 text-center transition-all"
                            >
                              <span className="text-[10px] text-[#8B949E]">{opt.label}</span>
                              <p className="text-xs font-bold text-[#00FF88]">{opt.odds.toFixed(2)}</p>
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
