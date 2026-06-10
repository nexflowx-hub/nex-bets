'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useCallback, useRef } from 'react';
import { MatchWithOdds } from '@/types';

const Navbar = dynamic(() => import('@/components/nexbets/Navbar'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/nexbets/HeroSection'), { ssr: false });
const LiveStreamPanel = dynamic(() => import('@/components/nexbets/LiveStreamPanel'), { ssr: false });
const MarketsGrid = dynamic(() => import('@/components/nexbets/MarketsGrid'), { ssr: false });
const BetSlip = dynamic(() => import('@/components/nexbets/BetSlip'), { ssr: false });
const Footer = dynamic(() => import('@/components/nexbets/Footer'), { ssr: false });

export default function Home() {
  const [matches, setMatches] = useState<MatchWithOdds[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await fetch('/api/matches');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setMatches(data);
      setError(null);
    } catch {
      if (isInitial) setError('Erro ao carregar dados');
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    fetchData(true);
    intervalRef.current = setInterval(() => fetchData(false), 10000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData, mounted]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F1115]">
        <div className="w-8 h-8 border-2 border-[#00FF88]/30 border-t-[#00FF88] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0F1115]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#00FF88]/30 border-t-[#00FF88] rounded-full animate-spin" />
              <span className="text-sm text-[#8B949E]">Carregando mercados...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <button onClick={() => fetchData(true)} className="text-[#00FF88] text-sm hover:underline">
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <LiveStreamPanel matches={matches} />
            <MarketsGrid matches={matches} />
          </>
        )}
      </main>
      <Footer />
      <BetSlip />
    </div>
  );
}
