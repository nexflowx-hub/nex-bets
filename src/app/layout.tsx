import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolão Copa 2026 — Lucre na Copa!",
  description: "O bolão mais lucrativo da Copa do Mundo 2026. Multiplicadores insanos, bônus 5X no campeão e 2X nos jogos. Saques instantâneos via PIX.",
  keywords: ["Bolão", "Copa 2026", "Apostas", "Futebol", "World Cup", "PIX"],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Bolão Copa 2026 — Lucre na Copa!",
    description: "Multiplicadores insanos e saques instantâneos via PIX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-white selection:bg-amber-400 selection:text-black`}
      >
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}