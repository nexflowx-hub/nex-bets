'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useUserStore } from '@/store/userStore';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [whatsapp, setWhatsapp] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phone = whatsapp.replace(/\D/g, '');
    if (phone.length < 10) {
      setError('Número de WhatsApp inválido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp: `+55${phone}`,
          name: name.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Erro ao fazer login' }));
        throw new Error(data.error || 'Erro ao fazer login');
      }

      const data = await res.json();
      setUser(data.user);
      setWhatsapp('');
      setName('');
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#161B22] border-white/[0.08] max-w-md sm:mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#E8E8E8] flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            Entrar via WhatsApp
          </DialogTitle>
          <DialogDescription className="text-[#8B949E] text-sm">
            Insira seu número de WhatsApp para fazer login ou criar uma conta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label className="text-sm text-[#E8E8E8]">Número WhatsApp</Label>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-2 bg-[#1A1F27] rounded-l-lg border border-r-0 border-white/[0.08] text-sm text-[#8B949E]">
                +55
              </span>
              <Input
                type="tel"
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="flex-1 bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E] rounded-l-none"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-[#E8E8E8]">Nome <span className="text-[#8B949E]">(opcional)</span></Label>
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#1A1F27] border-white/[0.08] text-[#E8E8E8] placeholder:text-[#8B949E]"
              disabled={isLoading}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: error ? 1 : 0 }}
            className="min-h-[24px]"
          >
            {error && (
              <p className="text-xs text-[#FF4757] bg-[#FF4757]/10 rounded-lg p-2 flex items-center gap-1">
                <X className="w-3 h-3" />
                {error}
              </p>
            )}
          </motion.div>

          <Button
            type="submit"
            disabled={isLoading || whatsapp.replace(/\D/g, '').length < 10}
            className="w-full bg-[#25D366] text-white font-bold hover:bg-[#25D366]/90 py-6 text-base disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <MessageCircle className="w-5 h-5 mr-2" />
            )}
            Entrar
          </Button>

          <p className="text-[10px] text-[#2D333B] text-center">
            Ao entrar, você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
