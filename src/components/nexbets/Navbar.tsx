'use client';

import { useState } from 'react';
import { Zap, LayoutGrid, Receipt, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useBetSlipStore } from '@/store/betSlip';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const selections = useBetSlipStore((s) => s.selections);
  const toggleSlip = useBetSlipStore((s) => s.toggleSlip);

  const navLinks = [
    { href: '#live', label: 'Ao Vivo', icon: Zap },
    { href: '#markets', label: 'Mercados', icon: LayoutGrid },
    { href: '#bets', label: 'Apostas', icon: Receipt },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#00FF88]" />
          <span className="text-xl font-bold text-[#00FF88] neon-glow-text tracking-wider">
            NeX Bets
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#8B949E] hover:text-[#00FF88] transition-colors flex items-center gap-2"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={toggleSlip}
            variant="outline"
            size="sm"
            className="relative border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88]/10 hover:text-[#00FF88]"
          >
            <Receipt className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Boletim</span>
            {selections.length > 0 && (
              <motion.span
                key={selections.length}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#00FF88] text-[#0F1115] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {selections.length}
              </motion.span>
            )}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-[#8B949E]">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#161B22] border-white/[0.08]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg text-[#E8E8E8] hover:text-[#00FF88] transition-colors flex items-center gap-3 p-3 rounded-lg hover:bg-white/5"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
