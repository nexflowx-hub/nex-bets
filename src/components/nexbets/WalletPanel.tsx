'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X, Wallet, ArrowDownCircle, ArrowUpCircle, Copy, Check,
  Loader2, Gift, History, TabsIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUserStore } from '@/store/userStore';
import { Transaction } from '@/types';

interface WalletPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    deposit: 'Carregamento',
    withdrawal: 'Levantamento',
    bonus: 'Bónus',
    bet_place: 'Aposta',
    bet_win: 'Ganho',
  };
  return labels[type] || type;
}

function getTypeColor(type: string): string {
  if (type === 'deposit' || type === 'bonus' || type === 'bet_win') return 'text-[#00FF88]';
  if (type === 'bet_place' || type === 'withdrawal') return 'text-[#FF4757]';
  return 'text-[#8B949E]';
}

export default function WalletPanel({ isOpen, onClose, onOpenAuth }: WalletPanelProps) {
  const { user, isAuthenticated, updateUserBalance } = useUserStore();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  // Deposit state
  const [depositAmount, setDepositAmount] = useState('');
  const [pixCode, setPixCode] = useState('');
  const [isGeneratingPix, setIsGeneratingPix] = useState(false);
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [depositError, setDepositError] = useState<string | null>(null);

  // Withdraw state
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const quickDepositAmounts = [50, 100, 200, 500];

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchTransactions();
    }
  }, [isOpen, isAuthenticated]);

  const fetchTransactions = async () => {
    if (!user) return;
    setLoadingTx(true);
    try {
      const res = await fetch(`/api/wallet/transactions?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch {
      // ignore
    } finally {
      setLoadingTx(false);
    }
  };

  const handleGeneratePix = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) {
      setDepositError('Insira um valor válido');
      return;
    }
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }

    setIsGeneratingPix(true);
    setDepositError(null);
    setPixGenerated(false);
    setPixCopied(false);

    try {
      const res = await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user!.id,
          amount,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erro ao gerar PIX' }));
        throw new Error(data.error || 'Erro ao gerar PIX');
      }

      const data = await res.json();
      setPixCode(data.pixCode || `00020126580014br.gov.bcb.pix0136nexbets-${Date.now()}5204000053039865802BR5925NEXBETS6009SAOPAULO62070503***6304ABCD`);
      setPixGenerated(true);

      // Update balance if already confirmed
      if (data.newBalance !== undefined) {
        updateUserBalance(data.newBalance, data.newBonusBalance);
      }
    } catch (err) {
      setDepositError(err instanceof Error ? err.message : 'Erro ao gerar PIX');
    } finally {
      setIsGeneratingPix(false);
    }
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode).then(() => {
      setPixCopied(true);
      setTimeout(() => setPixCopied(false), 2000);
    });
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      setWithdrawError('Insira um valor válido');
      return;
    }
    if (!pixKey.trim()) {
      setWithdrawError('Insira sua chave PIX');
      return;
    }
    if (!isAuthenticated) {
      onOpenAuth();
      return;
    }

    setIsWithdrawing(true);
    setWithdrawError(null);
    setWithdrawSuccess(false);

    try {
      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user!.id,
          amount,
          pixKey: pixKey.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erro ao levantar' }));
        throw new Error(data.error || 'Erro ao levantar');
      }

      const data = await res.json();
      if (data.newBalance !== undefined) {
        updateUserBalance(data.newBalance, data.newBonusBalance);
      }
      setWithdrawSuccess(true);
      setWithdrawAmount('');
      setPixKey('');
      fetchTransactions();

      setTimeout(() => setWithdrawSuccess(false), 2000);
    } catch (err) {
      setWithdrawError(err instanceof Error ? err.message : 'Erro ao levantar');
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50"
          onClick={onClose}
        />

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
                <Wallet className="w-5 h-5 text-[#00FF88]" />
                <h2 className="text-lg font-bold text-[#E8E8E8]">Carteira</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-[#8B949E] hover:text-white">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Balance */}
            <div className="p-4 bg-[#1A1F27]/50">
              <p className="text-xs text-[#8B949E] mb-1">Saldo Disponível</p>
              <p className="text-2xl font-bold text-[#E8E8E8] font-mono">
                {isAuthenticated ? formatCurrency(user?.balance ?? 0) : 'R$ 0,00'}
              </p>
              {isAuthenticated && (user?.bonusBalance ?? 0) > 0 && (
                <p className="text-xs text-[#FFD700] mt-1 flex items-center gap-1">
                  <Gift className="w-3 h-3" />
                  Bónus: {formatCurrency(user?.bonusBalance ?? 0)}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.08]">
              <button
                onClick={() => setActiveTab('deposit')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'deposit'
                    ? 'text-[#00FF88] border-b-2 border-[#00FF88]'
                    : 'text-[#8B949E] hover:text-[#E8E8E8]'
                }`}
              >
                <ArrowDownCircle className="w-4 h-4" />
                Carregar Saldo
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'withdraw'
                    ? 'text-[#00FF88] border-b-2 border-[#00FF88]'
                    : 'text-[#8B949E] hover:text-[#E8E8E8]'
                }`}
              >
                <ArrowUpCircle className="w-4 h-4" />
                Levantar
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'deposit' ? (
                  <motion.div
                    key="deposit"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="p-4 space-y-4"
                  >
                    {/* Bonus promo */}
                    <div className="bg-[#00FF88]/5 border border-[#00FF88]/10 rounded-lg p-3 flex items-start gap-2">
                      <Gift className="w-4 h-4 text-[#00FF88] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#00FF88]">
                        Carregamentos acima de <span className="font-bold">R$ 100</span> recebem <span className="font-bold">R$ 50</span> de bónus!
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-[#E8E8E8]">Valor do Carregamento</Label>
                      <Input
                        type="number"
                        placeholder="R$ 0,00"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E] text-lg font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {quickDepositAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setDepositAmount(String(amt))}
                          className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                            depositAmount === String(amt)
                              ? 'bg-[#00FF88]/20 text-[#00FF88] border border-[#00FF88]/30'
                              : 'bg-[#1A1F27] text-[#8B949E] hover:bg-white/5 border border-white/[0.05]'
                          }`}
                        >
                          R$ {amt}
                        </button>
                      ))}
                    </div>

                    {depositError && (
                      <p className="text-xs text-[#FF4757] bg-[#FF4757]/10 rounded-lg p-2">{depositError}</p>
                    )}

                    {pixGenerated ? (
                      <div className="space-y-3">
                        <div className="bg-[#1A1F27] rounded-lg p-3 border border-[#00FF88]/20">
                          <p className="text-xs text-[#8B949E] mb-2">Código PIX Copia e Cola</p>
                          <p className="text-xs text-[#E8E8E8] font-mono break-all leading-relaxed bg-[#0F1115] rounded p-2">
                            {pixCode}
                          </p>
                        </div>
                        <Button
                          onClick={handleCopyPix}
                          variant="outline"
                          className="w-full border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10"
                        >
                          {pixCopied ? (
                            <><Check className="w-4 h-4 mr-2" /> Copiado!</>
                          ) : (
                            <><Copy className="w-4 h-4 mr-2" /> Copiar Código PIX</>
                          )}
                        </Button>
                        <p className="text-[10px] text-[#8B949E] text-center">
                          Após o pagamento, o saldo será atualizado automaticamente
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={handleGeneratePix}
                        disabled={isGeneratingPix || !depositAmount}
                        className="w-full bg-[#00FF88] text-[#0F1115] font-bold hover:bg-[#00FF88]/90 neon-glow py-6 text-base disabled:opacity-50"
                      >
                        {isGeneratingPix ? (
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                          'Gerar PIX'
                        )}
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="withdraw"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-4 space-y-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-sm text-[#E8E8E8]">Valor do Levantamento</Label>
                      <Input
                        type="number"
                        placeholder="R$ 0,00"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E] text-lg font-mono"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-[#E8E8E8]">Chave PIX</Label>
                      <Input
                        type="text"
                        placeholder="CPF, telefone, e-mail ou chave aleatória"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        className="bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E]"
                      />
                    </div>

                    {withdrawError && (
                      <p className="text-xs text-[#FF4757] bg-[#FF4757]/10 rounded-lg p-2">{withdrawError}</p>
                    )}
                    {withdrawSuccess && (
                      <p className="text-xs text-[#00FF88] bg-[#00FF88]/10 rounded-lg p-2">
                        Levantamento solicitado com sucesso!
                      </p>
                    )}

                    <Button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing || !withdrawAmount || !pixKey}
                      className="w-full bg-[#00FF88] text-[#0F1115] font-bold hover:bg-[#00FF88]/90 neon-glow py-6 text-base disabled:opacity-50"
                    >
                      {isWithdrawing ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        'Levantar'
                      )}
                    </Button>

                    <p className="text-[10px] text-[#8B949E] text-center">
                      Levantamentos são processados em até 24h
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Transaction History */}
              <Separator className="bg-white/[0.08]" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-[#8B949E]" />
                  <h3 className="text-sm font-semibold text-[#8B949E] uppercase tracking-wider">
                    Histórico
                  </h3>
                </div>
                {loadingTx ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-[#8B949E]" />
                  </div>
                ) : transactions.length === 0 ? (
                  <p className="text-xs text-[#2D333B] text-center py-4">Nenhuma transação encontrada</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {transactions.slice(0, 10).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-2 border-b border-white/[0.03] last:border-0">
                        <div>
                          <p className="text-xs font-medium text-[#E8E8E8]">{getTypeLabel(tx.type)}</p>
                          <p className="text-[10px] text-[#2D333B]">{formatDate(tx.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-bold font-mono ${getTypeColor(tx.type)}`}>
                            {tx.type === 'deposit' || tx.type === 'bonus' || tx.type === 'bet_win' ? '+' : '-'}
                            {formatCurrency(tx.amount)}
                          </p>
                          <p className="text-[10px] text-[#2D333B]">{tx.status === 'confirmed' ? 'Confirmado' : tx.status === 'pending' ? 'Pendente' : 'Falhou'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
