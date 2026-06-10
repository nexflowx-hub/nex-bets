'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Zap, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* YouTube Background - GETV Channel */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed?listType=user_uploads&list=getv&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] min-w-[180vw] min-h-[180vh]"
          allow="autoplay; encrypted-media"
          title="GETV Background"
          style={{ border: 0 }}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1115]/95 via-[#0F1115]/80 to-[#0F1115]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,136,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-[#E8E8E8] mb-4">
            O EPICENTRO DO{' '}
            <span className="text-[#00FF88] neon-glow-text">MUNDIAL 2026</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-[#8B949E] max-w-2xl mx-auto mb-8"
        >
          Odds em tempo real. Mercados expandidos. Experiência sem precedentes
          na Copa do Mundo FIFA 2026™.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-[#00FF88] text-[#0F1115] font-bold hover:bg-[#00FF88]/90 neon-glow text-base px-8"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Apostar Agora
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-[#00FF88]/40 text-[#00FF88] hover:bg-[#00FF88]/10 hover:text-[#00FF88] text-base px-8"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Ver Mercados
          </Button>
          <Button
            size="lg"
            className="bg-[#25D366] text-white font-bold hover:bg-[#25D366]/90 text-base px-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Registar via WhatsApp
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { icon: Zap, value: '72+', label: 'Jogos' },
            { icon: BarChart3, value: '72+', label: 'Mercados' },
            { icon: TrendingUp, value: '0.0s', label: 'Latência' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <stat.icon className="w-5 h-5 text-[#00FF88]" />
                <span className="text-2xl sm:text-3xl font-bold text-[#E8E8E8]">
                  {stat.value}
                </span>
              </div>
              <span className="text-sm text-[#8B949E]">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
