'use client';

import { motion } from 'framer-motion';
import { Trophy, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useRef, useEffect, useState } from 'react';

const YOUTUBE_VIDEO_ID = 'uYgWXKXiS2I';
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&playlist=${YOUTUBE_VIDEO_ID}&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

const floatingBalls = [
  { emoji: '\u26BD', delay: 0, size: 'text-5xl', top: 'top-[15%]', left: 'left-[8%]', opacity: 'opacity-20' },
  { emoji: '\u26BD', delay: 1.2, size: 'text-7xl', top: 'top-[25%]', right: 'right-[10%]', opacity: 'opacity-15' },
  { emoji: '\u26BD', delay: 2.4, size: 'text-4xl', top: 'top-[60%]', left: 'left-[15%]', opacity: 'opacity-10' },
  { emoji: '\u26BD', delay: 0.8, size: 'text-6xl', top: 'top-[70%]', right: 'right-[18%]', opacity: 'opacity-10' },
  { emoji: '\u26BD', delay: 3.6, size: 'text-3xl', top: 'top-[40%]', left: 'left-[5%]', opacity: 'opacity-20' },
  { emoji: '\u26BD', delay: 4.2, size: 'text-5xl', bottom: 'bottom-[10%]', left: 'left-[30%]', opacity: 'opacity-10' },
  { emoji: '\u26BD', delay: 1.8, size: 'text-4xl', top: 'top-[10%]', left: 'left-[45%]', opacity: 'opacity-15' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [videoScale, setVideoScale] = useState(1.5);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const containerW = container.offsetWidth;
      const containerH = container.offsetHeight;
      // 16:9 aspect ratio for YouTube
      const videoW = containerW;
      const videoH = containerW * 9 / 16;
      const scaleX = containerW / videoW;
      const scaleY = containerH / videoH;
      const scale = Math.max(scaleX, scaleY);
      setVideoScale(scale * 1.1); // slight extra to avoid edges
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden text-center bg-[#020617] pt-24 pb-20 border-b border-amber-500/20 min-h-[480px] md:min-h-[560px]"
    >
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe
          src={YOUTUBE_EMBED_URL}
          title="Copa 2026 Background"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-0 pointer-events-none"
          style={{
            width: `${(1 / videoScale) * 100}%`,
            height: `${(1 / videoScale) * 100}%`,
            transform: `translate(-50%, -50%) scale(${videoScale})`,
          }}
        />
      </div>

      {/* Dark gradient overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#020617]/70 via-[#020617]/50 to-[#020617] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#020617]/60 via-transparent to-[#020617]/60 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,rgba(30,27,75,0.5)_0%,rgba(2,6,23,0.7)_100%)] pointer-events-none" />

      {/* Amber glow at top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-amber-500/30 blur-[120px] rounded-full pointer-events-none z-[2]" />

      {/* Vignette effect */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.8) 100%)',
      }} />

      {/* Floating soccer balls */}
      {floatingBalls.map((ball, i) => (
        <span
          key={i}
          className={`absolute z-[3] ${ball.size} ${ball.opacity} animate-float pointer-events-none select-none ${
            ball.top || ''
          } ${ball.bottom ? ball.bottom : ''} ${ball.left || ''} ${ball.right ? ball.right : ''}`}
          style={{ animationDelay: `${ball.delay}s` }}
        >
          {ball.emoji}
        </span>
      ))}

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-3xl px-4 flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge pill */}
        <motion.div variants={itemVariants}>
          <Badge
            className="border-amber-400/60 bg-black/50 backdrop-blur-md text-amber-400 px-5 py-2 text-sm font-semibold rounded-full gap-2 shadow-lg shadow-amber-500/10"
          >
            <Trophy className="size-4" />
            BOLÃO FESTIVAL 2026 ABERTO
          </Badge>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          variants={itemVariants}
        >
          LUCRE NA{' '}
          <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-none">
            COPA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          variants={itemVariants}
        >
          O evento mais lucrativo do ano. Multiplicadores insanos e saques
          instantâneos via PIX.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-3 mt-2" variants={itemVariants}>
          <a
            href="#outright-winner"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-8 py-3.5 text-base font-bold text-black shadow-lg shadow-amber-500/30 transition-all hover:bg-amber-300 hover:shadow-amber-500/50 hover:scale-105 active:scale-[0.98]"
          >
            <Trophy className="size-5" />
            Apostar Agora
          </a>
          <a
            href="#outright-winner"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/15 hover:border-white/30 active:scale-[0.98] shadow-lg"
          >
            <Play className="size-4" />
            Ver Cotações
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}