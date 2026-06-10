'use client';

import { Zap, Shield, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-[#00FF88]" />
              <span className="text-lg font-bold text-[#00FF88]">NeX Bets</span>
            </div>
            <p className="text-sm text-[#8B949E] leading-relaxed">
              Plataforma premium de apostas para a FIFA World Cup 2026™.
              Odds em tempo real e experiência incomparável.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-[#E8E8E8] mb-3 uppercase tracking-wider">
              Plataforma
            </h3>
            <ul className="space-y-2">
              {['Ao Vivo', 'Mercados', 'Resultados', 'Estatísticas'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#8B949E] hover:text-[#00FF88] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#E8E8E8] mb-3 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2">
              {['Termos de Uso', 'Privacidade', 'Jogo Responsável', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#8B949E] hover:text-[#00FF88] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Security */}
          <div>
            <h3 className="text-sm font-semibold text-[#E8E8E8] mb-3 uppercase tracking-wider">
              Segurança
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#8B949E]">
              <Shield className="w-4 h-4 text-[#00FF88]" />
              <span>SSL Encrypted</span>
            </div>
            <p className="text-xs text-[#2D333B] mt-2">
              Conexão segura de ponta a ponta
            </p>
          </div>
        </div>

        <Separator className="bg-white/[0.08] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2D333B]">
          <p>© 2026 NeX Bets. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            FIFA World Cup 2026™ é marca registada
          </p>
        </div>
      </div>
    </footer>
  );
}
