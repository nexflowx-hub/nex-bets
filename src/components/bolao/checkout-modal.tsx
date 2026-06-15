'use client';

import { useBetStore } from '@/store/bet-store';
import { formatCurrency, outrightWinnerOdds, groupStageMatches, CHAMPION_BONUS, MATCH_BONUS_THRESHOLD, MATCH_BONUS_MULTIPLIER } from '@/lib/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const FAKE_PIX_CODE =
  '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef123456789014223BolaoCopa2026@teste.com5204000053039865802BR5925BOLAO COPA 2026 - APOSTA6009SAO PAULO62070503***6304ABCD';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutStep,
    setCheckoutStep,
    formData,
    setFormData,
    isSubmitting,
    setIsSubmitting,
    selectedWinner,
    winnerStake,
    selectedMatches,
    matchesStake,
  } = useBetStore();

  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string }>({});

  // Compute champion odd and potential
  const winnerOdd = outrightWinnerOdds.find((t) => t.team === selectedWinner)?.odd ?? 1;
  const winnerPotential = winnerStake * winnerOdd * CHAMPION_BONUS;

  // Compute matches odds product and potential
  const matchSelectionEntries = Object.entries(selectedMatches);
  const matchesOddsProduct = matchSelectionEntries.reduce((product, [matchId, selection]) => {
    const match = groupStageMatches.find((m) => m.id === matchId);
    if (match) {
      return product * (match.odds[selection as keyof typeof match.odds] ?? 1);
    }
    return product;
  }, 1);

  const isMatchesBonusActive = matchesStake >= MATCH_BONUS_THRESHOLD;
  const finalMatchesOdd = isMatchesBonusActive ? matchesOddsProduct * MATCH_BONUS_MULTIPLIER : matchesOddsProduct;
  const hasMatches = matchSelectionEntries.length > 0;
  const matchesPotential = hasMatches ? matchesStake * finalMatchesOdd : 0;

  const totalInvestment = winnerStake + (hasMatches ? matchesStake : 0);
  const totalPotential = winnerPotential + matchesPotential;

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { nome?: string; whatsapp?: string } = {};
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: formData.nome,
          whatsapp: formData.whatsapp,
          email: formData.email,
          cpf: formData.cpf,
          championTeam: selectedWinner,
          championStake: winnerStake,
          championOdd: winnerOdd,
          matchSelections: selectedMatches,
          matchesStake,
          totalInvestment,
          totalPotential,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar aposta');
      }

      setCheckoutStep(2);
    } catch {
      toast.error('Erro ao processar aposta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(FAKE_PIX_CODE);
      setCopied(true);
      toast.success('Código PIX copiado!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Erro ao copiar código PIX');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsCheckoutOpen(false);
      setCheckoutStep(1);
    }
  };

  const truncatedCode = FAKE_PIX_CODE.slice(0, 30) + '...';

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const direction = checkoutStep === 1 ? 0 : 1;

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-[#0f172a] border-white/10 rounded-3xl max-w-xl p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <DialogHeader className="mb-6">
            <DialogTitle className="text-white text-xl font-bold text-center">
              {checkoutStep === 1 ? 'Finalizar Aposta' : 'Pague via PIX'}
            </DialogTitle>
          </DialogHeader>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                checkoutStep === 1
                  ? 'w-8 bg-emerald-500'
                  : 'w-2 bg-emerald-500/40'
              }`}
            />
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                checkoutStep === 2
                  ? 'w-8 bg-emerald-500'
                  : 'w-2 bg-white/20'
              }`}
            />
          </div>

          {/* Step 1: User Data Form */}
          <AnimatePresence mode="wait" custom={direction}>
            {checkoutStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Potential Return Highlight */}
                <div className="text-center mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-sm text-emerald-300/70 mb-1">
                    Retorno Potencial
                  </p>
                  <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                    R$ {formatCurrency(totalPotential)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nome Completo */}
                  <div className="space-y-1.5">
                    <Label htmlFor="nome" className="text-white/80 text-sm">
                      Nome Completo <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={(e) => handleFieldChange('nome', e.target.value)}
                      className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 rounded-xl"
                    />
                    {errors.nome && (
                      <p className="text-red-400 text-xs mt-1">{errors.nome}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp" className="text-white/80 text-sm">
                      WhatsApp <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                      className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 rounded-xl"
                    />
                    {errors.whatsapp && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* Email + CPF Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-white/80 text-sm">
                        Email <span className="text-white/30">(Opcional)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cpf" className="text-white/80 text-sm">
                        CPF{' '}
                        <span className="text-white/30">
                          (Opcional - Saque Rápido)
                        </span>
                      </Label>
                      <Input
                        id="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleFieldChange('cpf', e.target.value)}
                        className="bg-black/50 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Investment Summary */}
                  <div className="rounded-xl bg-white/5 border border-white/10 p-3 space-y-2 text-sm">
                    <div className="flex justify-between text-white/60">
                      <span>Aposta Campeão</span>
                      <span>R$ {formatCurrency(winnerStake)}</span>
                    </div>
                    {hasMatches && (
                      <div className="flex justify-between text-white/60">
                        <span>Aposta Jogos ({matchSelectionEntries.length} jogos)</span>
                        <span>R$ {formatCurrency(matchesStake)}</span>
                      </div>
                    )}
                    <div className="border-t border-white/10 pt-2 flex justify-between font-semibold text-white">
                      <span>Total</span>
                      <span>R$ {formatCurrency(totalInvestment)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      `GERAR PIX DE R$ ${formatCurrency(totalInvestment)}`
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 2: PIX Payment */}
            {checkoutStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Amount */}
                <div className="text-center mb-6">
                  <p className="text-white/60 text-sm mb-1">Valor a pagar</p>
                  <p className="text-4xl font-black text-emerald-400">
                    R$ {formatCurrency(totalInvestment)}
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-48 h-48 mx-auto bg-white p-2 rounded-xl shadow-2xl"
                  >
                    <rect width="100" height="100" fill="#ffffff" />
                    <path
                      d="M10,10 h20 v20 h-20 z M15,15 h10 v10 h-10 z M70,10 h20 v20 h-20 z M75,15 h10 v10 h-10 z M10,70 h20 v20 h-20 z M15,75 h10 v10 h-10 z"
                      fill="#000"
                    />
                    <path
                      d="M40,10 h20 v10 h-20 z M45,25 h15 v5 h-15 z M10,40 h15 v15 h-15 z M30,40 h10 v20 h-10 z M50,40 h40 v10 h-40 z M70,55 h20 v15 h-20 z M40,70 h25 v10 h-25 z M80,80 h10 v10 h-10 z M40,85 h15 v5 h-15 z M60,85 h10 v10 h-10 z"
                      fill="#000"
                    />
                  </svg>
                </div>

                {/* PIX Code */}
                <div className="mb-6">
                  <Label className="text-white/80 text-sm block mb-2">
                    Código PIX
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      readOnly
                      value={truncatedCode}
                      className="bg-black/50 border-white/10 text-white/60 rounded-xl flex-1 text-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleCopyPix}
                      variant="outline"
                      className="bg-white/10 border-white/10 text-white hover:bg-white/20 rounded-xl px-4 shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    {copied ? 'Copiado!' : 'Copiar Código'}
                  </p>
                </div>

                {/* Instructions */}
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
                  <p className="text-white/70 text-sm leading-relaxed">
                    Abra o app do seu banco, escaneie o QR Code ou cole o código
                    PIX acima para pagar. O pagamento será confirmado
                    automaticamente em até 2 minutos.
                  </p>
                </div>

                {/* Waiting Indicator */}
                <div className="flex items-center justify-center gap-3 py-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-400 text-sm font-medium animate-pulse">
                    Aguardando confirmação de pagamento...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
