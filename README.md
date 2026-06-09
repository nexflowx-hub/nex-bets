<div align="center">

<img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
<img src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
<img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer" alt="Framer Motion" />
<img src="https://img.shields.io/badge/Zustand-5-orange?style=flat-square" alt="Zustand" />
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />

<br /><br />

<h1>⚡ NeX Bets</h1>

<h3>O Epicentro do FIFA World Cup 2026</h3>

<p>
  <strong>Plataforma premium de apostas desportivas</strong> de alta performance com cotações em tempo real, estética hacker-punk/FinTech minimal e foco total no Mundial 2026.
</p>

</div>

---

## 📑 Índice

- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#-modelo-de-dados)
- [API Routes](#-api-routes)
- [Componentes](#-componentes)
- [Sistema de Estado](#-sistema-de-estado)
- [Design System](#-design-system)
- [Instalação & Configuração](#-instalação--configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Deploy](#-deploy)
- [Fluxo de Dados em Tempo Real](#-fluxo-de-dados-em-tempo-real)
- [Segurança](#-segurança)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **NeX Bets** é uma plataforma de apostas desportivas construída como uma interface de página única (SPA) com a estética de um terminal financeiro avançado. O design combina elementos de **hacker-punk** com **FinTech minimal**, utilizando um dark mode nativo com tons de Gunmetal Gray e acentos de Neon Green.

### Características Principais

| Feature | Descrição |
|---|---|
| 🎬 **Hero Imersivo** | Background autoplay com vídeo do hino do Mundial 2026 via YouTube |
| 🔴 **Live Action** | Painel de streaming embebido + cotações ao vivo com flash verde |
| 📊 **Mercados Expandidos** | Grelha de 14 jogos com odds agrupadas por mercado (H2H, Over/Under 2.5, BTTS) |
| 🎫 **Bilhete de Apostas** | Slide-up com gestão de stake, cálculo automático de retorno potencial |
| ⚡ **Tempo Real** | Polling a cada 5s simulando Supabase Realtime Channels |
| 🎨 **Design System** | Glassmorphism, neon glow, micro-animações com Framer Motion |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                      │
│                                                               │
│  ┌──────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Zustand  │  │ Framer Motion│  │  React 19 Components  │   │
│  │ Store    │  │  Animations  │  │  (App Router RSC)     │   │
│  └────┬─────┘  └──────────────┘  └──────────┬───────────┘   │
│       │                                       │              │
│       │           fetch (5s polling)          │              │
│       ▼                                       ▼              │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Next.js API Routes (Server)            │     │
│  │  ┌───────────┐ ┌────────────┐ ┌───────────────┐  │     │
│  │  │ /api/     │ │ /api/odds/ │ │ /api/odds/    │  │     │
│  │  │ matches   │ │ stream     │ │ stream (RT)   │  │     │
│  │  └─────┬─────┘ └─────┬──────┘ └───────┬───────┘  │     │
│  └────────┼─────────────┼────────────────┼────────────┘     │
│           └─────────────┼────────────────┘                  │
│                         ▼                                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │              Prisma ORM (SQLite)                     │     │
│  │  ┌──────────────┐    ┌────────────────────┐        │     │
│  │  │ Match Model  │───▶│ OddsMarket Model   │        │     │
│  │  └──────────────┘    └────────────────────┘        │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Stack Tecnológico

### Core Framework
| Tecnologia | Versão | Função |
|---|---|---|
| **Next.js** | 16.1+ (App Router) | Framework React com Server Components e Turbopack |
| **TypeScript** | 5 | Tipagem estática e type safety |
| **React** | 19 | Biblioteca UI com Concurrent Features |

### Styling & UI
| Tecnologia | Versão | Função |
|---|---|---|
| **Tailwind CSS** | 4 | Utility-first CSS com @theme inline |
| **shadcn/ui** | New York style | Component library (50+ componentes) |
| **Lucide React** | 0.525 | Icon set (stroke-based) |
| **Framer Motion** | 12 | Animações declarativas e layouts animados |

### Data & State
| Tecnologia | Versão | Função |
|---|---|---|
| **Prisma** | 6.11+ | ORM type-safe para SQLite |
| **Zustand** | 5 | Client state management (bet slip) |
| **TanStack Query** | 5.82 | Server state (disponível para expansão) |

### Ferramentas
| Tecnologia | Função |
|---|---|
| **ESLint** | Linting com next.config |
| **PostCSS** | Processamento CSS com @tailwindcss/postcss |
| **Bun** | Runtime e package manager |

---

## 📁 Estrutura do Projeto

```
nex-bets/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados (Match + OddsMarket)
│   └── seed.ts                # Script de seed com 14 jogos do Mundial 2026
├── db/
│   └── custom.db              # Base de dados SQLite
├── public/
│   ├── logo.svg               # Logo da aplicação
│   └── robots.txt             # SEO robots
├── src/
│   ├── app/
│   │   ├── globals.css        # Design tokens, animações CSS, tema dark
│   │   ├── layout.tsx         # Root layout (dark mode, metadata, fonts)
│   │   ├── page.tsx           # Página principal (SPA client-side)
│   │   └── api/
│   │       ├── matches/
│   │       │   └── route.ts   # GET /api/matches — todos os jogos com odds
│   │       └── odds/
│   │           ├── route.ts    # GET /api/odds — todas as odds
│   │           └── stream/
│   │               └── route.ts # GET /api/odds/stream — polling real-time
│   ├── components/
│   │   ├── nexbets/            # ★ Componentes custom do NeX Bets
│   │   │   ├── Navbar.tsx      # Navegação glassmorphism fixa
│   │   │   ├── HeroSection.tsx # Hero com YouTube BG + CTA
│   │   │   ├── LiveStreamPanel.tsx # Stream + Live Odds
│   │   │   ├── MarketsGrid.tsx  # Grelha de mercados filtrável
│   │   │   ├── BetSlip.tsx      # Bilhete de apostas slide-up
│   │   │   └── Footer.tsx       # Footer responsivo
│   │   └── ui/                 # shadcn/ui (50+ componentes)
│   ├── hooks/
│   │   ├── use-mobile.ts       # Hook de responsive
│   │   └── use-toast.ts        # Hook de toast notifications
│   ├── lib/
│   │   ├── db.ts               # Prisma Client singleton
│   │   └── utils.ts            # Utilitários (cn, etc.)
│   ├── store/
│   │   └── betSlip.ts          # Zustand store para bet slip
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── .env                        # Variáveis de ambiente (DATABASE_URL)
├── next.config.ts             # Configuração Next.js (standalone output)
├── tailwind.config.ts         # Tailwind CSS config
├── postcss.config.mjs         # PostCSS config
├── tsconfig.json              # TypeScript config
├── eslint.config.mjs           # ESLint config
├── components.json            # shadcn/ui config
├── Caddyfile                  # Reverse proxy config (gateway)
├── package.json               # Dependências e scripts
└── README.md                  # Este ficheiro
```

---

## 🗄️ Modelo de Dados

### Entity-Relationship Diagram

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│        Match             │         │       OddsMarket              │
├─────────────────────────┤         ├──────────────────────────────┤
│ id         String   PK   │───────＜│ id         UUID       PK     │
│ home_team  String       │   1:N  │ match_id   String     FK     │
│ away_team  String       │         │ market     String             │
│ kickoff    DateTime     │         │ selection  String             │
│ status     String       │         │ odd        Float              │
│ score_home Int?          │         │ is_active  Boolean            │
│ score_away Int?          │         │ updated_at DateTime           │
│ updated_at DateTime      │         └──────────────────────────────┘
│ venue      String?       │
│ round      String?       │
└─────────────────────────┘
```

### DDL (Supabase-compatible)

```sql
-- Tabela de Jogos
CREATE TABLE matches (
    id         VARCHAR NOT NULL PRIMARY KEY,
    home_team  VARCHAR NOT NULL,
    away_team  VARCHAR NOT NULL,
    kickoff    TIMESTAMPTZ NOT NULL,
    status     VARCHAR DEFAULT 'scheduled',
    score_home INTEGER,
    score_away INTEGER,
    updated_at TIMESTAMPTZ,
    venue      VARCHAR,
    round      VARCHAR
);

-- Tabela de Odds/mercados
CREATE TABLE odds_markets (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id   VARCHAR REFERENCES matches(id),
    market     VARCHAR NOT NULL,
    selection  VARCHAR NOT NULL,
    odd        NUMERIC NOT NULL,
    is_active  BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ
);

-- Índices de performance
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_kickoff ON matches(kickoff);
CREATE INDEX idx_odds_match_id ON odds_markets(match_id);
CREATE INDEX idx_odds_market ON odds_markets(market);
CREATE INDEX idx_odds_active ON odds_markets(is_active);
```

### Tipos TypeScript

```typescript
export interface Match {
  id: string;
  home_team: string;
  away_team: string;
  kickoff: string;           // ISO 8601 timestamp
  status: string | null;    // 'scheduled' | 'live' | 'finished'
  score_home: number | null;
  score_away: number | null;
  updated_at: string | null;
  venue?: string | null;
  round?: string | null;
}

export interface OddsMarket {
  id: string;               // UUID
  match_id: string | null;  // FK → matches.id
  market: string;           // 'h2h' | 'over_under_2.5' | 'btts'
  selection: string;       // Nome da equipa, 'Draw', 'Over 2.5', etc.
  odd: number;              // Decimal (ex: 2.50)
  is_active: boolean | null;
  updated_at: string | null;
}

export interface MatchWithOdds extends Match {
  odds: OddsMarket[];
}

export interface BetSelection {
  id: string;
  matchId: string;
  matchLabel: string;
  market: string;
  selection: string;
  odd: number;
}
```

### Tipos de Mercado Suportados

| Market Key | Label PT | Seleções Típicas |
|---|---|---|
| `h2h` | Vencedor (Head-to-Head) | Equipa Casa, Empate, Equipa Fora |
| `over_under_2.5` | Golos 2.5 | Over 2.5, Under 2.5 |
| `btts` | Ambas Marcam | Sim, Não |

---

## 🔌 API Routes

### `GET /api/matches`

Retorna todos os jogos com odds associadas.

**Response:**
```json
[
  {
    "id": "clxxx",
    "home_team": "Brasil",
    "away_team": "Croácia",
    "kickoff": "2026-06-11T18:00:00.000Z",
    "status": "scheduled",
    "score_home": null,
    "score_away": null,
    "venue": "Maracanã, Rio de Janeiro",
    "round": "Fase de Grupos",
    "odds": [
      {
        "id": "uuid-1",
        "match_id": "clxxx",
        "market": "h2h",
        "selection": "Brasil",
        "odd": 1.85,
        "is_active": true
      }
    ]
  }
]
```

### `GET /api/odds`

Retorna todas as odds com dados dos jogos incluídos.

### `GET /api/odds/stream`

Endpoint de polling real-time. Em produção com Supabase, este endpoint seria substituído por um **WebSocket** via `supabase.from('odds_markets').on('*', handler)`.

**Response:**
```json
{
  "matches": [...],
  "timestamp": "2026-06-11T18:00:05.000Z"
}
```

---

## 🧩 Componentes

### Component Architecture

```
page.tsx (Client Page)
├── Navbar (fixed top)
│   ├── Logo (NeX Bets)
│   ├── Nav Links (Agora, Mercados, Ao Vivo)
│   └── Bet Slip Toggle (badge counter)
├── HeroSection (full viewport)
│   ├── YouTube BG (autoplay, muted, loop)
│   ├── Gradient Overlay
│   ├── Grid Pattern (cyberpunk)
│   ├── Title + Subtitle + CTAs
│   └── Stats (48 Seleções, 104 Jogos, ∞ Mercados)
├── LiveStreamPanel
│   ├── YouTube Player (with neon border)
│   └── Live Odds Cards
│       ├── Score Display (animated pulse)
│       └── Odds Buttons (flash on change)
├── MarketsGrid
│   ├── Search Input
│   ├── Round Filter Buttons
│   └── Match Rows (expandable)
│       ├── Match Info (teams, date, venue)
│       ├── Quick Odds Preview
│       └── Expanded Markets (H2H, Over/Under, BTTS)
├── BetSlip (overlay, conditional)
│   ├── Header (count + clear)
│   ├── Selections List
│   ├── Stake Input (+/- buttons, presets)
│   ├── Summary (total odds, potential return)
│   └── Place Bet Button
└── Footer (sticky bottom)
    ├── Brand Info
    ├── Platform Links
    └── Legal Links
```

### Detalhes por Componente

#### `Navbar.tsx`
- Glassmorphism (`backdrop-blur-20px`) com borda translúcida
- Badge animado (Framer Motion scale) no botão do bilhete
- Menu hamburger responsivo (mobile < 768px)
- Neon glow hover no botão Bilhete

#### `HeroSection.tsx`
- YouTube embed a 180% com overflow hidden (cover effect)
- Triplo overlay: gradiente vertical, gradiente horizontal, shimmer
- Grid pattern CSS animado (60px cells)
- Animações staggered (0.15s, 0.3s, 0.45s, 0.6s, 0.9s delays)
- Botão CTA com `shadow-[0_0_30px_rgba(0,255,136,0.4)]` hover

#### `LiveStreamPanel.tsx`
- Player YouTube com `aspect-video` e borda neon ring
- Score com `score-pulse-anim` (scale 1.15 bounce)
- Odds buttons com `odd-flash-anim` (flash verde quando odd sobe)
- Rastreamento de odd changes via `useRef<Map<string, number>>`

#### `MarketsGrid.tsx`
- Filtros por round (Fase de Grupos → Final)
- Pesquisa por nome de equipa
- Rows com expand/collapse via Framer Motion `AnimatePresence`
- Quick odds preview inline (desktop)
- Odds cards com `whileTap={{ scale: 0.97 }}` feedback
- Disabled state com `opacity-40` quando `is_active === false`

#### `BetSlip.tsx`
- Slide-up com spring animation (`damping: 25, stiffness: 300`)
- Adição inteligente: remove seleção duplicada do mesmo mercado
- Stake presets: $5, $10, $25, $50, $100
- Cálculo: `Total Odds = ∏(odds)` × `Stake`
- Layout responsivo: bottom sheet mobile, sidebar desktop

---

## 🧠 Sistema de Estado

### Zustand Store (`store/betSlip.ts`)

```
BetSlipStore
├── State
│   ├── selections: BetSelection[]   // Array de seleções
│   ├── stake: number                 // Valor da aposta (default: 10)
│   └── isOpen: boolean              // Painel visível?
│
├── Actions
│   ├── addSelection(sel)            // Adiciona/remove (toggle)
│   ├── removeSelection(id)          // Remove por ID
│   ├── setStake(amount)             // Define stake
│   ├── toggleSlip()                 // Abre/fecha painel
│   ├── clearSlip()                  // Limpa tudo
│   ├── totalOdds()                  // ∏(selections.odd)
│   └── potentialReturn()            // totalOdds() × stake
```

**Regras de negócio:**
- Uma seleção nova do mesmo `matchId + market` substitui a anterior
- Seleções de mercados diferentes do mesmo jogo coexistem
- O botão de odd fica destacado (bg green) quando selecionado

---

## 🎨 Design System

### Token de Cores

| Token | Hex | Uso |
|---|---|---|
| `--gunmetal-900` | `#0F1115` | Background principal |
| `--gunmetal-800` | `#141720` | Background secundário |
| `--gunmetal-700` | `#1A1D24` | Cards, painéis |
| `--gunmetal-600` | `#22262F` | Borders, inputs |
| `--gunmetal-500` | `#2A2F3A` | Borders ativas |
| `--gunmetal-400` | `#3A4050` | Texto disabled |
| `--gunmetal-300` | `#5A6275` | Texto secundário |
| `--neon` | `#00FF88` | Acento primário (CTAs, odds, wins) |
| `--neon-dim` | `#00CC6A` | Neon hover |
| `--neon-glow` | `#00FF8840` | Glow effects |
| `--risk-red` | `#FF4757` | Live indicator, destructive |

### Animações CSS Custom

```css
@keyframes neon-pulse    { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
@keyframes odd-flash     { 0% { background: rgba(0,255,136,0.3); } 100% { background: transparent; } }
@keyframes score-pulse   { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes live-dot      { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes shimmer       { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
```

### Efeitos

| Classe | Descrição |
|---|---|
| `.neon-glow` | `box-shadow: 0 0 10px rgba(0,255,136,0.3), 0 0 30px rgba(0,255,136,0.15)` |
| `.neon-glow-hover` | Glow amplificado no hover |
| `.neon-text-glow` | `text-shadow` com neon |
| `.glass-panel` | `backdrop-blur(20px)` + borda semi-transparente |
| `.odd-flash-anim` | Flash verde 0.8s ao atualizar odd |
| `.score-pulse-anim` | Scale bounce ao mudar score |
| `.live-dot-anim` | Pulsante 1.5s para indicadores live |
| `.shimmer-bg` | Gradiente animado para scan-line effect |

### Tipografia

| Elemento | Font | Características |
|---|---|---|
| Títulos/UI | Geist Sans | `font-sans` (semibold/bold) |
| Valores numéricos | Geist Mono | `font-mono` (tabular-nums) |
| Odds | Geist Mono Bold | `text-sm font-bold font-mono` |

---

## 🚀 Instalação & Configuração

### Pré-requisitos

- **Bun** (recomendado) ou **Node.js** ≥ 18
- **SQLite** (incluso via Prisma)

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/nexflowx-hub/nex-bets.git
cd nex-bets

# 2. Instalar dependências
bun install
# ou: npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# O DATABASE_URL é pré-configurado para SQLite local

# 4. Gerar Prisma Client
bun run db:generate
# ou: npx prisma generate

# 5. Push do schema para o banco
bun run db:push
# ou: npx prisma db push

# 6. Popular com dados do Mundial 2026
bunx tsx prisma/seed.ts
# ou: npx tsx prisma/seed.ts

# 7. Iniciar em desenvolvimento
bun run dev
# ou: npm run dev

# 8. Aceder: http://localhost:3000
```

### Variáveis de Ambiente

```env
# .env
DATABASE_URL="file:./db/custom.db"
```

---

## 📜 Scripts Disponíveis

| Script | Comando | Descrição |
|---|---|---|
| `dev` | `bun run dev` | Servidor de desenvolvimento com Turbopack (porta 3000) |
| `build` | `bun run build` | Build de produção (standalone output) |
| `start` | `bun run start` | Servidor de produção |
| `lint` | `bun run lint` | ESLint com next.config |
| `db:push` | `bun run db:push` | Sincroniza schema Prisma com banco |
| `db:generate` | `bun run db:generate` | Gera Prisma Client |
| `db:migrate` | `bun run db:migrate` | Cria e aplica migrações |
| `db:reset` | `bun run db:reset` | Reset do banco de dados |

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Ou conectar via GitHub: vercel.com → Import Project
```

**Notas para deploy:**
- `next.config.ts` usa `output: "standalone"` para otimização Edge
- Para **Supabase**: alterar `DATABASE_URL` no `.env` e substituir o polling por Realtime Channels
- Para **PostgreSQL**: atualizar `prisma/schema.prisma` → `provider = "postgresql"`

### Docker (Alternativo)

```dockerfile
FROM node:20-alpine AS base
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/db ./db

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## ⚡ Fluxo de Dados em Tempo Real

```
Cliente (React)                    Servidor (API Routes)
┌──────────────────┐              ┌─────────────────────┐
│                  │   GET /      │                     │
│   setInterval    │◄──api/──────│   Prisma Query      │
│   (5000ms)       │   matches   │   matches.findMany  │
│                  │   stream     │   include: { odds } │
│                  │─────────────►│                     │
│  setMatches()    │   Response   │                     │
│  (Zustand)       │◄─────────────│  { matches, ts }    │
│                  │              │                     │
│  Re-render:      │              │                     │
│  • Live Odds     │              │                     │
│  • MarketsGrid   │              │                     │
│  • Flash anims   │              │                     │
└──────────────────┘              └─────────────────────┘
```

**Em produção com Supabase**, substituir polling por:

```typescript
// Supabase Realtime (client-side)
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

supabase
  .channel('odds-changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'odds_markets' },
    (payload) => {
      // Update odds in real-time
      updateOdd(payload.new)
    }
  )
  .subscribe()
```

---

## 🔒 Segurança

- **No client-side secrets**: z-ai-web-dev-sdk é usado apenas no backend
- **Input sanitization**: React DOM sanitiza automaticamente
- **SQL Injection**: Prevenido via Prisma ORM (parameterized queries)
- **Environment variables**: DATABASE_URL não exposta ao cliente
- **Rate limiting**: Recomendado em produção via middleware Next.js

---

## 🗺️ Roadmap

- [x] MVP: Dark theme, Hero, Live Panel, Markets, BetSlip
- [ ] Supabase integration (Realtime Channels)
- [ ] Autenticação (NextAuth.js)
- [ ] Perfil de utilizador + histórico de apostas
- [ ] Cashier / sistema de saldo
- [ ] Notificações push para mudanças de odds
- [ ] PWA (Service Worker + offline)
- [ ] Internacionalização (next-intl)
- [ ] Dashboard de estatísticas (Recharts)
- [ ] Chat ao vivo (AI-powered)
- [ ] Mobile app (React Native / Expo)

---

## 📄 Licença

Este projeto é licensed under the **MIT License**. Veja [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Construído com ⚡ por [NeX Bets](https://github.com/nexflowx-hub)**

**FIFA World Cup 2026 — United States, Canada & Mexico**

</div>
