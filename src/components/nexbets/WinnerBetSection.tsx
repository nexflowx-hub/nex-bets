'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trophy, AlertTriangle, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/store/userStore';
import { WORLD_CUP_TEAMS } from '@/types';

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const QUICK_AMOUNTS = [100, 200, 500, 1000];

// Flag emoji helper for some known teams
function getTeamFlag(team: string): string {
  const flagMap: Record<string, string> = {
    'Argentina': '🇦🇷', 'Brasil': '🇧🇷', 'França': '🇫🇷', 'Alemanha': '🇩🇪',
    'Espanha': '🇪🇸', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Portugal': '🇵🇹', 'Bélgica': '🇧🇪',
    'Países Baixos': '🇳🇱', 'Croácia': '🇭🇷', 'Suíça': '🇨🇭', 'Itália': '🇮🇹',
    'Uruguai': '🇺🇾', 'Colômbia': '🇨🇴', 'México': '🇲🇽', 'EUA': '🇺🇸',
    'Canadá': '🇨🇦', 'Japão': '🇯🇵', 'Coreia do Sul': '🇰🇷', 'Austrália': '🇦🇺',
    'Marrocos': '🇲🇦', 'Senegal': '🇸🇳', 'Nigéria': '🇳🇬', 'Gana': '🇬🇭',
    'Camarões': '🇨🇲', 'Costa do Marfim': '🇨🇮', 'Arábia Saudita': '🇸🇦',
    'Irã': '🇮🇷', 'Equador': '🇪🇨', 'Peru': '🇵🇪', 'Chile': '🇨🇱',
    'Dinamarca': '🇩🇰', 'Suécia': '🇸🇪', 'Polónia': '🇵🇱', 'Sérvia': '🇷🇸',
    'Áustria': '🇦🇹', 'Escócia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Turquia': '🇹🇷',
    'República Tcheca': '🇨🇿', 'Noruega': '🇳🇴', 'Uzbequistão': '🇺🇿',
    'Tunísia': '🇹🇳', 'Argélia': '🇩🇿', 'Egito': '🇪🇬', 'Cabo Verde': '🇨🇻',
    'RD do Congo': '🇨🇩', 'Panamá': '🇵🇦', 'Haiti': '🇭🇹', 'Nova Zelândia': '🇳🇿',
    'Paraguai': '🇵🇾', 'Catar': '🇶🇦', 'Iraque': '🇮🇶', 'Jordânia': '🇯🇴',
    'África do Sul': '🇿🇦', 'Bósnia e Herzegovina': '🇧🇦', 'Curaçao': '🇨🇼',
  };
  return flagMap[team] || '⚽';
}

export default function WinnerBetSection() {
  const [search, setSearch] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user, isAuthenticated, updateUserBalance } = useUserStore();

  const filteredTeams = useMemo(() => {
    if (!search) return WORLD_CUP_TEAMS;
    return WORLD_CUP_TEAMS.filter((t) =>
      t.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const betAmount = parseFloat(amount) || 0;
  const doubledValue = betAmount * 2;

  const handleConfirmBet = async () => {
    if (!selectedTeam) {
      setError('Selecione uma equipa');
      return;
    }
    if (!betAmount || betAmount <= 0) {
      setError('Insira um valor válido');
      return;
    }
    if (!isAuthenticated) {
      setError('Faça login para apostar');
      return;
    }

    setIsPlacing(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/winner-bet/place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user!.id,
          team: selectedTeam,
          amount: betAmount,
          betValue: doubledValue,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erro ao confirmar aposta' }));
        throw new Error(data.error || 'Erro ao confirmar aposta');
      }

      const data = await res.json();
      if (data.newBalance !== undefined) {
        updateUserBalance(data.newBalance, data.newBonusBalance);
      }
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedTeam(null);
        setAmount('');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao confirmar aposta');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <section id="winner-bet" className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-6 h-6 text-[#FFD700]" />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#E8E8E8]">
            Apostar no <span className="text-[#FFD700]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>Vencedor</span>
          </h2>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Badge className="bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/20 text-[10px]">
            <Trophy className="w-3 h-3 mr-1" />
            Promoção 2x
          </Badge>
          <span className="text-xs text-[#8B949E]">Válida até final da Fase de Grupos</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Team Selection */}
          <div className="lg:col-span-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]" />
              <Input
                placeholder="Procurar equipa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-[#161B22] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E]"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[500px] overflow-y-auto pr-1">
              {filteredTeams.map((team, i) => {
                const isSelected = selectedTeam === team;
                return (
                  <motion.button
                    key={team}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01, duration: 0.1 }}
                    onClick={() => setSelectedTeam(isSelected ? null : team)}
                    className={`flex items-center gap-2 p-3 rounded-lg border transition-all text-left ${
                      isSelected
                        ? 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]'
                        : 'bg-[#161B22] border-white/[0.05] text-[#E8E8E8] hover:bg-white/[0.03] hover:border-[#FFD700]/10'
                    }`}
                  >
                    <span className="text-lg">{getTeamFlag(team)}</span>
                    <span className="text-xs font-medium truncate">{team}</span>
                  </motion.button>
                );
              })}
            </div>

            {filteredTeams.length === 0 && (
              <div className="text-center py-8">
                <Search className="w-8 h-8 text-[#2D333B] mx-auto mb-2" />
                <p className="text-sm text-[#8B949E]">Nenhuma equipa encontrada</p>
              </div>
            )}
          </div>

          {/* Bet Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#161B22] rounded-xl border border-white/[0.05] p-4 sticky top-20">
              <h3 className="text-sm font-semibold text-[#E8E8E8] mb-4">Sua Aposta</h3>

              {selectedTeam ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-[#FFD700]/5 border border-[#FFD700]/10 rounded-lg p-3">
                    <span className="text-2xl">{getTeamFlag(selectedTeam)}</span>
                    <div>
                      <p className="text-sm font-medium text-[#E8E8E8]">{selectedTeam}</p>
                      <p className="text-[10px] text-[#FFD700]">Vencedor do Mundial</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-[#8B949E]">Valor da Aposta</p>
                    <Input
                      type="number"
                      placeholder="R$ 0,00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E] text-lg font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {QUICK_AMOUNTS.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(String(amt))}
                        className={`py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                          amount === String(amt)
                            ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                            : 'bg-[#1A1F27] text-[#8B949E] hover:bg-white/5 border border-white/[0.05]'
                        }`}
                      >
                        R$ {amt}
                      </button>
                    ))}
                  </div>

                  {betAmount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#FFD700]/5 border border-[#FFD700]/10 rounded-lg p-3 text-center"
                    >
                      <p className="text-xs text-[#8B949E]">Valor da Aposta (2x Promoção)</p>
                      <p className="text-xl font-bold text-[#FFD700] font-mono" style={{ textShadow: '0 0 10px rgba(255,215,0,0.3)' }}>
                        {formatCurrency(doubledValue)}
                      </p>
                      <p className="text-[10px] text-[#8B949E] mt-1">
                        Sua aposta de {formatCurrency(betAmount)} vale {formatCurrency(doubledValue)}!
                      </p>
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-[#FF4757] bg-[#FF4757]/10 rounded-lg p-2 flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        {error}
                      </motion.p>
                    )}
                    {success && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-[#00FF88] bg-[#00FF88]/10 rounded-lg p-2 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 shrink-0" />
                        Aposta confirmada!
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleConfirmBet}
                    disabled={isPlacing || !betAmount || !selectedTeam}
                    className="w-full bg-[#FFD700] text-[#0F1115] font-bold hover:bg-[#FFD700]/90 py-6 text-sm disabled:opacity-50"
                    style={{ boxShadow: '0 0 10px rgba(255,215,0,0.2)' }}
                  >
                    {isPlacing ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Trophy className="w-4 h-4 mr-2" />
                    )}
                    Confirmar Aposta
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-10 h-10 text-[#2D333B] mx-auto mb-3" />
                  <p className="text-sm text-[#8B949E]">Selecione uma equipa para apostar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
