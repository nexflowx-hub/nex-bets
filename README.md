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
  <strong>Plataforma premium de apostas desportivas</strong> com cotações reais, autenticação via WhatsApp, sistema PIX de pagamentos e foco total no Mundial 2026 — EUA, Canadá & México.
</p>

</div>

---

## 📑 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Arquitetura](#-arquitetura)
- [Stack Tecnológico](#-stack-tecnológico)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#-modelo-de-dados)
- [API Endpoints](#-api-endpoints)
- [Componentes](#-componentes)
- [Sistema de Estado](#-sistema-de-estado)
- [Design System](#-design-system)
- [Promoções & Lógica de Negócio](#-promoções--lógica-de-negócio)
- [Instalação & Configuração](#-instalação--configuração)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Segurança](#-segurança)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## 🎯 Visão Geral

O **NeX Bets** é uma plataforma de apostas desportivas premium construída como uma SPA (Single Page Application) com a estética de um terminal financeiro avançado. O design combina elementos de **hacker-punk** com **FinTech minimal**, utilizando um dark mode nativo com tons de Gunmetal Gray e acentos de Neon Green.

O sistema cobre os **72 jogos da fase de grupos** da FIFA World Cup 2026 (11 de junho a 27 de junho) com cotações reais, integração de streaming ao vivo via canal GETV, autenticação por WhatsApp, carteira digital com sistema PIX de depósitos e saques, e apostas no campeão do mundial com promoção 2x.

---

## 🚀 Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| ⚽ **72 Jogos da Fase de Grupos** | Cobertura completa do Mundial 2026 (11–27 jun) com cotações reais em H2H, Over/Under 2.5 e BTTS |
| 📺 **Streaming ao Vivo** | Integração com canal GETV para transmissão de jogos em tempo real |
| 💳 **Sistema PIX** | Depósitos e saques via PIX com geração automática de código |
| 📱 **Autenticação WhatsApp** | Login/cadastro simplificado usando número de WhatsApp |
| 💰 **Gestão de Saldo** | Saldo principal + saldo bônus com transações rastreáveis |
| 🎁 **Bônus de Depósito** | Deposite R$100+ e receba R$50 de bônus automaticamente |
| 🏆 **Aposta no Campeão** | Aposta especial no vencedor do Mundial com promoção 2x (R$100 apostados = R$200 de valor) |
| 🎫 **Bilhete de Apostas** | Sistema completo de seleções múltiplas com cálculo automático de retorno |
| ⚡ **Atualização em Tempo Real** | Polling a cada 10s para atualização de odds e placares |
| 🎨 **Dark Hacker-Punk UI** | Estética FinTech com glassmorphism, neon glow e micro-animações |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTE (Browser)                               │
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Zustand     │  │ Framer Motion│  │ React 19     │  │   shadcn/ui    │  │
│  │  Stores      │  │  Animations  │  │  Components  │  │   Components   │  │
│  │  (betSlip +  │  │              │  │  (App Router) │  │   (50+)        │  │
│  │   userStore) │  │              │  │              │  │                │  │
│  └──────┬───────┘  └──────────────┘  └──────┬───────┘  └────────────────┘  │
│         │                                      │                            │
│         │           fetch (10s polling)         │                            │
│         ▼                                      ▼                            │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                     Next.js API Routes (Server)                       │    │
│  │                                                                      │    │
│  │  ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────────┐  │    │
│  │  │ /api/auth/  │ │ /api/wallet/ │ │ /api/bets/   │ │ /api/winner- │  │    │
│  │  │ whatsapp    │ │ balance,     │ │ place,       │ │ bet/place,   │  │    │
│  │  │             │ │ deposit,     │ │ history      │ │ history      │  │    │
│  │  │             │ │ withdraw,    │ │              │ │              │  │    │
│  │  │             │ │ transactions │ │              │ │              │  │    │
│  │  └──────┬──────┘ └──────┬───────┘ └──────┬───────┘ └──────┬──────┘  │    │
│  │         └───────────────┼───────────────┼────────────────┘          │    │
│  │                         │               │                           │    │
│  │  ┌──────────────────────┼───────────────┼───────────────────────┐  │    │
│  │  │ /api/matches         │ /api/odds     │ /api/teams             │  │    │
│  │  └──────────────────────┼───────────────┼───────────────────────┘  │    │
│  └─────────────────────────┼───────────────┼──────────────────────────┘    │
│                            ▼               ▼                                │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                      Prisma ORM (SQLite)                               │   │
│  │                                                                       │   │
│  │  ┌────────┐ ┌────────┐ ┌───────────┐ ┌────────────┐ ┌─────────────┐  │   │
│  │  │ Match  │ │ Odds   │ │ User      │ │ Bet        │ │ Transaction │  │   │
│  │  │        │ │ Market │ │           │ │            │ │             │  │   │
│  │  └────────┘ └────────┘ └───────────┘ └────────────┘ └─────────────┘  │   │
│  │                                  ┌──────────────────┐                 │   │
│  │                                  │   WinnerBet      │                 │   │
│  │                                  └──────────────────┘                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
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
| **Zustand** | 5 | Client state management (betSlip + userStore) |
| **TanStack Query** | 5.82 | Server state (disponível para expansão) |

### Autenticação & Pagamentos
| Tecnologia | Função |
|---|---|
| **Autenticação WhatsApp** | Login/cadastro via número WhatsApp (sem senha) |
| **Sistema PIX** | Geração de código PIX para depósitos e saques |

### Ferramentas
| Tecnologia | Função |
|---|---|
| **ESLint** | Linting com next.config |
| **PostCSS** | Processamento CSS com @tailwindcss/postcss |
| **Bun** | Runtime e package manager |
| **date-fns** | Manipulação e formatação de datas |

---

## 📁 Estrutura do Projeto

```
nex-bets/
├── prisma/
│   ├── schema.prisma              # Schema do banco (6 modelos)
│   └── seed.ts                    # Seed com 72 jogos da fase de grupos
├── db/
│   └── custom.db                  # Base de dados SQLite
├── public/
│   ├── logo.svg                   # Logo da aplicação
│   └── robots.txt                 # SEO robots
├── src/
│   ├── app/
│   │   ├── globals.css            # Design tokens, animações CSS, tema dark
│   │   ├── layout.tsx             # Root layout (dark mode, metadata, fonts)
│   │   ├── page.tsx               # Página principal (SPA client-side)
│   │   └── api/
│   │       ├── auth/
│   │       │   └── whatsapp/
│   │       │       └── route.ts   # POST — Autenticação WhatsApp
│   │       ├── wallet/
│   │       │   ├── balance/
│   │       │   │   └── route.ts   # GET — Consultar saldo
│   │       │   ├── deposit/
│   │       │   │   └── route.ts   # POST — Depósito PIX (+ bônus)
│   │       │   ├── withdraw/
│   │       │   │   └── route.ts   # POST — Saque PIX
│   │       │   └── transactions/
│   │       │       └── route.ts   # GET — Histórico de transações
│   │       ├── bets/
│   │       │   ├── place/
│   │       │   │   └── route.ts   # POST — Registrar aposta
│   │       │   └── history/
│   │       │       └── route.ts   # GET — Histórico de apostas
│   │       ├── winner-bet/
│   │       │   ├── place/
│   │       │   │   └── route.ts   # POST — Aposta no campeão (2x)
│   │       │   └── history/
│   │       │       └── route.ts   # GET — Histórico apostas campeão
│   │       ├── matches/
│   │       │   └── route.ts       # GET — Todos os jogos com odds
│   │       ├── teams/
│   │       │   └── route.ts       # GET — 48 seleções do Mundial
│   │       └── odds/
│   │           ├── route.ts       # GET — Todas as odds
│   │           └── stream/
│   │               └── route.ts   # GET — Polling real-time
│   ├── components/
│   │   ├── nexbets/               # ★ Componentes custom do NeX Bets (10)
│   │   │   ├── Navbar.tsx         # Navegação glassmorphism fixa
│   │   │   ├── HeroSection.tsx    # Hero com vídeo BG + CTA
│   │   │   ├── LiveStreamPanel.tsx # Stream GETV + cotações ao vivo
│   │   │   ├── MarketsGrid.tsx    # Grelha de mercados filtrável
│   │   │   ├── BetSlip.tsx        # Bilhete de apostas slide-up
│   │   │   ├── AuthDialog.tsx     # Modal de autenticação WhatsApp
│   │   │   ├── WalletPanel.tsx    # Painel da carteira (saldo, dep, saque)
│   │   │   ├── PromotionBanner.tsx # Banner de promoções
│   │   │   ├── WinnerBetSection.tsx # Seção de aposta no campeão
│   │   │   └── Footer.tsx         # Footer responsivo
│   │   └── ui/                    # shadcn/ui (50+ componentes)
│   ├── hooks/
│   │   ├── use-mobile.ts          # Hook de responsive
│   │   └── use-toast.ts           # Hook de toast notifications
│   ├── lib/
│   │   ├── db.ts                  # Prisma Client singleton
│   │   └── utils.ts               # Utilitários (cn, etc.)
│   ├── store/
│   │   ├── betSlip.ts             # Zustand store — bilhete de apostas
│   │   └── userStore.ts           # Zustand store — estado do utilizador
│   └── types/
│       └── index.ts               # TypeScript interfaces + constantes
├── .env                           # Variáveis de ambiente (DATABASE_URL)
├── next.config.ts                 # Configuração Next.js (standalone output)
├── tailwind.config.ts            # Tailwind CSS config
├── postcss.config.mjs            # PostCSS config
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
├── components.json               # shadcn/ui config
├── Caddyfile                     # Reverse proxy config (gateway)
├── package.json                  # Dependências e scripts
└── README.md                     # Este ficheiro
```

---

## 🗄️ Modelo de Dados

### Entity-Relationship Diagram

```
┌─────────────────────────┐         ┌──────────────────────────────┐
│         User             │         │         Match                 │
├─────────────────────────┤         ├──────────────────────────────┤
│ id         String   PK   │         │ id          String     PK    │
│ whatsapp   String  UNIQUE│         │ homeTeam    String          │
│ name       String?       │         │ awayTeam    String          │
│ balance    Float         │  1:N    │ homeScore   Int             │
│ bonusBalance Float        │───────▶│ awayScore   Int             │
│ createdAt  DateTime      │         │ status      String          │
│ updatedAt  DateTime      │         │ round       String          │
├─────────────────────────┤         │ date        String          │
│  │ bets           [Bet] │         │ time        String          │
│  │ transactions [Trans] │         │ venue       String          │
│  │ winnerBets [WnrBet]  │         │ createdAt   DateTime        │
└──┼──────────────────────┤         │ updatedAt   DateTime        │
   │                      │         └──────────┬───────────────────┘
   │                      │                    │ 1:N
   │  ┌──────────────────┼────────────────────┼─────────────────┐
   │  │                  │                    │                 │
   ▼  ▼                  ▼                    ▼                 ▼
┌─────────────────┐ ┌────────────────┐ ┌──────────────────────────┐
│      Bet        │ │  Transaction   │ │      OddsMarket          │
├─────────────────┤ ├────────────────┤ ├──────────────────────────┤
│ id      String PK│ │ id      String PK│ │ id        String   PK   │
│ userId  String FK │ │ userId  String FK │ │ matchId   String  FK   │
│ selections String│ │ type    String    │ │ type      String       │
│ totalOdds Float  │ │ amount  Float     │ │ label     String       │
│ totalStake Float │ │ description String││ homeOdds  Float         │
│ potentialReturn  │ │ pixCode String?   │ │ drawOdds  Float         │
│   Float          │ │ status  String   │ │ awayOdds  Float         │
│ status   String  │ │ createdAt DateTime│ │ yesOdds   Float         │
│ betType  String  │ └────────────────┘ │ noOdds    Float         │
│ createdAt DateTime│                   │ overOdds  Float         │
│ updatedAt DateTime│                   │ underOdds Float         │
└─────────────────┘                    │ createdAt DateTime      │
                                        └──────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                      WinnerBet                                  │
├─────────────────────────────────────────────────────────────────┤
│ id        String   PK                                           │
│ userId    String   FK → User                                     │
│ team      String        (seleção do Mundial)                     │
│ amount    Float         (valor apostado)                          │
│ betValue  Float         (valor com promo 2x = amount * 2)        │
│ status    String        (active / won / lost)                     │
│ createdAt DateTime                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Relacionamentos

| Relação | Tipo | Descrição |
|---|---|---|
| `User → Bet` | 1:N | Um utilizador pode ter múltiplas apostas |
| `User → Transaction` | 1:N | Um utilizador pode ter múltiplas transações |
| `User → WinnerBet` | 1:N | Um utilizador pode ter múltiplas apostas de campeão |
| `Match → OddsMarket` | 1:N | Um jogo possui múltiplos mercados de odds |
| `User → Bet (onDelete: Cascade)` | Cascade | Remover utilizador remove apostas |
| `Match → OddsMarket (onDelete: Cascade)` | Cascade | Remover jogo remove odds |

### Detalhes dos Modelos

#### User
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `whatsapp` | String (unique) | Número WhatsApp (login) |
| `name` | String? | Nome do utilizador |
| `balance` | Float (default: 0) | Saldo principal em reais |
| `bonusBalance` | Float (default: 0) | Saldo bônus em reais |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Data de atualização |

#### Match
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `homeTeam` | String | Seleção da casa |
| `awayTeam` | String | Seleção visitante |
| `homeScore` | Int (default: 0) | Golos da casa |
| `awayScore` | Int (default: 0) | Golos do visitante |
| `status` | String | `upcoming` / `live` / `finished` |
| `round` | String | Fase da competição |
| `date` | String | Data do jogo (YYYY-MM-DD) |
| `time` | String | Hora do jogo |
| `venue` | String | Estádio / local |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Data de atualização |

#### OddsMarket
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `matchId` | String (FK) | Referência para Match |
| `type` | String | Tipo de mercado (`h2h`, `over_under_2.5`, `btts`) |
| `label` | String | Rótulo do mercado |
| `homeOdds` / `drawOdds` / `awayOdds` | Float | Odds para mercado H2H |
| `overOdds` / `underOdds` | Float | Odds para mercado Over/Under |
| `yesOdds` / `noOdds` | Float | Odds para mercado BTTS |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Data de atualização |

#### Bet
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `userId` | String (FK) | Referência para User |
| `selections` | String | Seleções em formato JSON |
| `totalOdds` | Float | Odds totais (produto das odds) |
| `totalStake` | Float | Valor total apostado (R$) |
| `potentialReturn` | Float | Retorno potencial (R$) |
| `status` | String | `pending` / `won` / `lost` / `cancelled` |
| `betType` | String | Tipo de aposta (default: `match`) |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Data de atualização |

#### Transaction
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `userId` | String (FK) | Referência para User |
| `type` | String | `deposit` / `withdrawal` / `bonus` / `bet_place` / `bet_win` |
| `amount` | Float | Valor (positivo ou negativo) |
| `description` | String? | Descrição da transação |
| `pixCode` | String? | Código PIX gerado |
| `status` | String | `pending` / `confirmed` / `failed` |
| `createdAt` | DateTime | Data de criação |

#### WinnerBet
| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `userId` | String (FK) | Referência para User |
| `team` | String | Seleção apostada como campeã |
| `amount` | Float | Valor efetivamente debitado (R$) |
| `betValue` | Float | Valor com promoção 2x (amount × 2) |
| `status` | String | `active` / `won` / `lost` |
| `createdAt` | DateTime | Data de criação |

---

## 🔌 API Endpoints

Todas as APIs retornam JSON. Requisições de leitura utilizam `GET` com query params; mutações utilizam `POST` com body JSON.

---

### 1. Autenticação WhatsApp

#### `POST /api/auth/whatsapp`

Autentica ou registra um utilizador via número de WhatsApp. Se o número não existir, cria uma nova conta com saldo zero.

**Request:**
```json
{
  "whatsapp": "+5511999999999",
  "name": "João Silva"
}
```

**Response (200 — Login existente ou novo registro):**
```json
{
  "success": true,
  "user": {
    "id": "clx1abc2d3e4f",
    "whatsapp": "+5511999999999",
    "name": "João Silva",
    "balance": 0,
    "bonusBalance": 0
  }
}
```

**Response (400 — WhatsApp ausente):**
```json
{
  "success": false,
  "error": "WhatsApp number is required"
}
```

---

### 2. Consultar Saldo

#### `GET /api/wallet/balance?userId={userId}`

Retorna o saldo principal e bônus do utilizador.

**Response (200):**
```json
{
  "success": true,
  "balance": 250.00,
  "bonusBalance": 50.00
}
```

**Response (404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### 3. Depósito via PIX

#### `POST /api/wallet/deposit`

Realiza um depósito via PIX. **Depósitos de R$100 ou mais geram automaticamente R$50 de bônus**.

**Request:**
```json
{
  "userId": "clx1abc2d3e4f",
  "amount": 150.00
}
```

**Response (200 — Com bônus aplicado):**
```json
{
  "success": true,
  "newBalance": 150.00,
  "newBonusBalance": 50.00,
  "bonusApplied": true,
  "bonusAmount": 50,
  "pixCode": "PIX_1718123456789_a1b2c3"
}
```

**Response (200 — Sem bônus, depósito < R$100):**
```json
{
  "success": true,
  "newBalance": 50.00,
  "newBonusBalance": 0,
  "bonusApplied": false,
  "bonusAmount": 0,
  "pixCode": "PIX_1718123456790_d4e5f6"
}
```

> **Lógica de Bônus:** `amount >= 100` → `bonusApplied = true`, `bonusAmount = 50`. O bônus é creditado em `bonusBalance` separado do saldo principal.

---

### 4. Saque via PIX

#### `POST /api/wallet/withdraw`

Realiza um saque via PIX. Utiliza `bonusBalance` primeiro, depois `balance`. Requer uma chave PIX de destino.

**Request:**
```json
{
  "userId": "clx1abc2d3e4f",
  "amount": 100.00,
  "pixKey": "joao@email.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "newBalance": 50.00,
  "newBonusBalance": 0,
  "pixCode": "PIX_1718123456800_g7h8i9",
  "amount": 100.00
}
```

**Response (400 — Saldo insuficiente):**
```json
{
  "success": false,
  "error": "Saldo insuficiente para saque"
}
```

> **Ordem de débito:** O sistema usa `bonusBalance` primeiro e depois `balance` para completar o saque.

---

### 5. Histórico de Transações

#### `GET /api/wallet/transactions?userId={userId}`

Retorna as últimas 50 transações do utilizador ordenadas por data descendente.

**Response (200):**
```json
{
  "success": true,
  "transactions": [
    {
      "id": "clx1txn1",
      "userId": "clx1abc2d3e4f",
      "type": "deposit",
      "amount": 150.0,
      "description": "Depósito via PIX - R$ 150.00",
      "pixCode": "PIX_1718123456789_a1b2c3",
      "status": "confirmed",
      "createdAt": "2026-06-11T18:00:00.000Z"
    },
    {
      "id": "clx1txn2",
      "userId": "clx1abc2d3e4f",
      "type": "bonus",
      "amount": 50.0,
      "description": "Bônus de primeira aposta - R$ 50.00",
      "pixCode": null,
      "status": "confirmed",
      "createdAt": "2026-06-11T18:00:00.000Z"
    },
    {
      "id": "clx1txn3",
      "userId": "clx1abc2d3e4f",
      "type": "bet_place",
      "amount": -25.0,
      "description": "Aposta #clx1bet1 - R$ 25.00",
      "pixCode": null,
      "status": "confirmed",
      "createdAt": "2026-06-11T18:05:00.000Z"
    }
  ]
}
```

---

### 6. Registrar Aposta

#### `POST /api/bets/place`

Registra uma aposta em jogos. O sistema calcula as odds totais (produto), valida o saldo e cria as transações.

**Request:**
```json
{
  "userId": "clx1abc2d3e4f",
  "selections": [
    {
      "id": "sel-1",
      "matchId": "clxmatch1",
      "matchLabel": "Brasil vs Croácia",
      "marketType": "h2h",
      "marketLabel": "Vencedor",
      "selection": "Brasil",
      "odds": 1.85
    },
    {
      "id": "sel-2",
      "matchId": "clxmatch5",
      "matchLabel": "Argentina vs México",
      "marketType": "over_under_2.5",
      "marketLabel": "Gols 2.5",
      "selection": "Over 2.5",
      "odds": 2.10
    }
  ],
  "totalStake": 25.00
}
```

**Response (200):**
```json
{
  "success": true,
  "betId": "clx1bet1",
  "totalOdds": 3.885,
  "potentialReturn": 97.13,
  "newBalance": 125.00
}
```

**Response (400 — Saldo insuficiente):**
```json
{
  "success": false,
  "error": "Saldo insuficiente para aposta"
}
```

> **Cálculo:** `totalOdds = 1.85 × 2.10 = 3.885` · `potentialReturn = 3.885 × 25 = R$97.13`

---

### 7. Histórico de Apostas

#### `GET /api/bets/history?userId={userId}`

Retorna as últimas 20 apostas do utilizador.

**Response (200):**
```json
{
  "success": true,
  "bets": [
    {
      "id": "clx1bet1",
      "userId": "clx1abc2d3e4f",
      "selections": "[{\"id\":\"sel-1\",\"matchId\":\"clxmatch1\",\"matchLabel\":\"Brasil vs Croácia\",\"marketType\":\"h2h\",\"marketLabel\":\"Vencedor\",\"selection\":\"Brasil\",\"odds\":1.85},{\"id\":\"sel-2\",\"matchId\":\"clxmatch5\",\"matchLabel\":\"Argentina vs México\",\"marketType\":\"over_under_2.5\",\"marketLabel\":\"Gols 2.5\",\"selection\":\"Over 2.5\",\"odds\":2.1}]",
      "totalOdds": 3.885,
      "totalStake": 25.0,
      "potentialReturn": 97.13,
      "status": "pending",
      "betType": "match",
      "createdAt": "2026-06-11T18:05:00.000Z",
      "updatedAt": "2026-06-11T18:05:00.000Z"
    }
  ]
}
```

---

### 8. Aposta no Campeão (Promoção 2x)

#### `POST /api/winner-bet/place`

Registra uma aposta no vencedor do Mundial. **Promoção 2x: o valor da aposta é dobrado**. Exemplo: apostar R$100 resulta em `betValue = R$200`.

**Request:**
```json
{
  "userId": "clx1abc2d3e4f",
  "team": "Brasil",
  "amount": 100.00
}
```

**Response (200):**
```json
{
  "success": true,
  "winnerBetId": "clx1w1",
  "team": "Brasil",
  "amount": 100.00,
  "betValue": 200.00,
  "newBalance": 50.00
}
```

**Response (400 — Saldo insuficiente):**
```json
{
  "success": false,
  "error": "Saldo insuficiente para aposta"
}
```

> **Regra da promoção:** O sistema debita `amount` (R$100) do saldo, mas registra `betValue = amount × 2` (R$200) para cálculo de payout. Válida durante a fase de grupos.

---

### 9. Histórico de Apostas no Campeão

#### `GET /api/winner-bet/history?userId={userId}`

Retorna todas as apostas de campeão do utilizador.

**Response (200):**
```json
{
  "success": true,
  "winnerBets": [
    {
      "id": "clx1w1",
      "userId": "clx1abc2d3e4f",
      "team": "Brasil",
      "amount": 100.0,
      "betValue": 200.0,
      "status": "active",
      "createdAt": "2026-06-11T19:00:00.000Z"
    }
  ]
}
```

---

### 10. Listar Seleções do Mundial

#### `GET /api/teams`

Retorna as 48 seleções disponíveis para apostas de campeão.

**Response (200):**
```json
{
  "success": true,
  "teams": [
    "Argentina", "Brasil", "França", "Alemanha", "Espanha", "Inglaterra",
    "Portugal", "Bélgica", "Países Baixos", "Croácia", "Suíça", "Itália",
    "Uruguai", "Colômbia", "México", "EUA", "Canadá", "Japão",
    "Coreia do Sul", "Austrália", "Marrocos", "Senegal", "Nigéria", "Gana",
    "Camarões", "Costa do Marfim", "Arábia Saudita", "Irã", "Equador",
    "Peru", "Chile", "Dinamarca", "Suécia", "Polónia", "Sérvia",
    "Áustria", "Escócia", "Turquia", "República Tcheca", "Noruega",
    "Uzbequistão", "Tunísia", "Argélia", "Egito", "Cabo Verde",
    "RD do Congo", "Panamá", "Haiti", "Nova Zelândia", "Paraguai",
    "Catar", "Iraque", "Jordânia", "África do Sul", "Bósnia e Herzegovina",
    "Curaçao"
  ]
}
```

---

### 11. Listar Jogos com Odds

#### `GET /api/matches`

Retorna todos os 72 jogos da fase de grupos com odds associadas, ordenados por data.

**Response (200):**
```json
[
  {
    "id": "clxmatch1",
    "homeTeam": "Brasil",
    "awayTeam": "Croácia",
    "homeScore": 0,
    "awayScore": 0,
    "status": "upcoming",
    "round": "Fase de Grupos",
    "date": "2026-06-11",
    "time": "18:00",
    "venue": "Maracanã, Rio de Janeiro",
    "odds": [
      {
        "id": "clxodds1",
        "matchId": "clxmatch1",
        "type": "h2h",
        "label": "Vencedor",
        "homeOdds": 1.85,
        "drawOdds": 3.40,
        "awayOdds": 4.20,
        "yesOdds": 0,
        "noOdds": 0,
        "overOdds": 0,
        "underOdds": 0
      },
      {
        "id": "clxodds2",
        "matchId": "clxmatch1",
        "type": "over_under_2.5",
        "label": "Gols 2.5",
        "homeOdds": 0,
        "drawOdds": 0,
        "awayOdds": 0,
        "yesOdds": 0,
        "noOdds": 0,
        "overOdds": 1.95,
        "underOdds": 1.85
      }
    ],
    "createdAt": "2026-06-01T00:00:00.000Z",
    "updatedAt": "2026-06-11T17:55:00.000Z"
  }
]
```

---

### 12. Odds (Streaming)

#### `GET /api/odds`

Retorna todas as odds com dados dos jogos incluídos.

#### `GET /api/odds/stream`

Endpoint de polling real-time (10s). Retorna odds atualizadas com timestamp.

---

## 🧩 Componentes

### Arquitetura de Componentes

```
page.tsx (Client Page)
├── Navbar (fixed top)
│   ├── Logo (NeX Bets)
│   ├── Saldo do utilizador (se autenticado)
│   ├── Botão Carteira
│   └── Botão Bilhete (badge com contador)
├── HeroSection (full viewport)
│   ├── YouTube BG (autoplay, muted, loop)
│   ├── Gradient Overlay
│   ├── Grid Pattern (cyberpunk)
│   ├── Título + Subtítulo + CTAs
│   └── Estatísticas (48 Seleções, 72 Jogos, 3 Mercados)
├── PromotionBanner
│   ├── Bônus de Depósito (R$100+ → R$50)
│   └── Promoção Campeão 2x
├── LiveStreamPanel
│   ├── Player GETV (com borda neon)
│   └── Live Odds Cards
│       ├── Placar (animated pulse)
│       └── Odds Buttons (flash verde)
├── MarketsGrid
│   ├── Pesquisa por equipa
│   ├── Filtros por data (11 Jun → 27 Jun)
│   └── Match Rows (expandable)
│       ├── Info do jogo (equipas, data, horário, estádio)
│       ├── Quick Odds Preview
│       └── Mercados Expandidos (H2H, Over/Under, BTTS)
├── WinnerBetSection
│   ├── Grid de 48 seleções
│   ├── Input de valor
│   └── Indicador de promoção 2x
├── Footer (sticky bottom)
│   ├── Info da marca
│   ├── Links da plataforma
│   └── Links legais
├── BetSlip (overlay, conditional)
│   ├── Header (contagem + limpar)
│   ├── Lista de seleções
│   ├── Input de stake (+/- botões, presets)
│   ├── Resumo (odds total, retorno potencial)
│   └── Botão Confirmar Aposta
├── WalletPanel (slide-over)
│   ├── Saldo (principal + bônus)
│   ├── Depósito (input + PIX)
│   ├── Saque (input + chave PIX)
│   └── Histórico de transações
└── AuthDialog (modal)
    ├── Input de WhatsApp
    ├── Input de nome (opcional)
    └── Botão Entrar
```

### Descrição dos 10 Componentes Custom

| Componente | Descrição |
|---|---|
| **`Navbar.tsx`** | Navegação glassmorphism fixa no topo com `backdrop-blur-20px`, badge animado no botão do bilhete, menu hamburger responsivo, e display de saldo do utilizador autenticado |
| **`HeroSection.tsx`** | Hero section full-viewport com YouTube embed de fundo a 180%, triplo overlay (gradiente vertical, horizontal, shimmer), grid pattern CSS animado, e estatísticas do Mundial |
| **`LiveStreamPanel.tsx`** | Painel de streaming ao vivo com player GETV via YouTube, placar animado (`score-pulse-anim`), e odds buttons com flash verde ao atualizar (`odd-flash-anim`) |
| **`MarketsGrid.tsx`** | Grelha de mercados com filtros por data (17 dias do Mundial), pesquisa por nome de equipa, rows expandíveis via Framer Motion, e odds cards com feedback `whileTap={{ scale: 0.97 }}` |
| **`BetSlip.tsx`** | Bilhete de apostas slide-up com spring animation (`damping: 25, stiffness: 300`), seleções múltiplas com stakes individuais, presets de valor, e cálculo automático de retorno |
| **`AuthDialog.tsx`** | Modal de autenticação via WhatsApp com input de número, nome opcional, e integração com `userStore` do Zustand |
| **`WalletPanel.tsx`** | Painel lateral da carteira digital com display de saldo (principal + bônus), formulários de depósito e saque PIX, e listagem de transações |
| **`PromotionBanner.tsx`** | Banner promocional destacando bônus de depósito (R$100+ → R$50) e promoção 2x para apostas no campeão, com CTAs para navegação |
| **`WinnerBetSection.tsx`** | Seção dedicada à aposta no campeão do Mundial com grid das 48 seleções, input de valor, destaque da promoção 2x, e histórico de apostas |
| **`Footer.tsx`** | Footer responsivo e sticky com informações da marca, links da plataforma e links legais |

---

## 🧠 Sistema de Estado

A aplicação utiliza **dois stores Zustand** para gerir o estado client-side:

### Zustand Store: `betSlip` (`src/store/betSlip.ts`)

Gerencia o bilhete de apostas com suporte a múltiplas seleções e stakes individuais.

```
BetSlipStore
├── Estado
│   ├── selections: BetSelection[]     // Array de seleções ativas
│   ├── stakes: Record<string, number> // Stake por seleção (default: R$10)
│   └── isOpen: boolean                // Painel visível?
│
├── Ações
│   ├── addSelection(sel)              // Adiciona seleção (ignora duplicados por ID)
│   ├── removeSelection(id)            // Remove seleção por ID
│   ├── clearSlip()                    // Limpa todas as seleções
│   ├── setStake(id, amount)           // Define stake para seleção específica
│   ├── toggleSlip()                   // Abre/fecha painel
│   ├── totalOdds()                    // ∏(selections.odds)
│   ├── totalStake()                   // Σ(stakes[id])
│   └── potentialReturn()               // totalOdds() × totalStake()
```

**Regras de negócio:**
- Seleções duplicadas (mesmo `id`) são ignoradas
- Cada seleção tem stake independente com default de R$10
- `potentialReturn = totalOdds × totalStake`
- Ao confirmar, envia `selections` + `totalStake` para `POST /api/bets/place`

### Zustand Store: `userStore` (`src/store/userStore.ts`)

Gerencia o estado de autenticação e saldo do utilizador.

```
UserStore
├── Estado
│   ├── user: User | null         // Utilizador autenticado
│   ├── isLoading: boolean        // Carregando autenticação?
│   └── isAuthenticated: boolean  // Está autenticado?
│
├── Ações
│   ├── setUser(user)                  // Define utilizador (após login)
│   ├── logout()                       // Limpa estado (logout)
│   └── updateUserBalance(bal, bonus?) // Atualiza saldos em tempo real
```

**Fluxo:**
1. Utilador insere WhatsApp no `AuthDialog`
2. `POST /api/auth/whatsapp` retorna dados do user
3. `userStore.setUser(data)` atualiza estado global
4. Após depósitos/apostas, `updateUserBalance()` reflete mudanças sem reload

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
| `--neon` | `#00FF88` | Acento primário (CTAs, odds, vitórias) |
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

### Tipografia

| Elemento | Font | Características |
|---|---|---|
| Títulos/UI | Geist Sans | `font-sans` (semibold/bold) |
| Valores numéricos | Geist Mono | `font-mono` (tabular-nums) |
| Odds | Geist Mono Bold | `text-sm font-bold font-mono` |

---

## 🎁 Promoções & Lógica de Negócio

### Bônus de Depósito

```
Regra: deposit amount >= R$100 → bônus = R$50

┌──────────────────────────────────────────────┐
│  Fluxo do Depósito                          │
│                                              │
│  1. POST /api/wallet/deposit { amount: 150 } │
│  2. Gerar código PIX                         │
│  3. Verificar: 150 >= 100 ✓                  │
│  4. Criar transação "deposit" (R$150)        │
│  5. Criar transação "bonus" (R$50)           │
│  6. Atualizar: balance += 150                │
│              bonusBalance += 50              │
│  7. Retornar: bonusApplied: true             │
└──────────────────────────────────────────────┘
```

### Promoção Campeão 2x (Winner Bet)

```
Regra: betValue = amount × 2 (valor da aposta é dobrado)

┌──────────────────────────────────────────────────┐
│  Fluxo da Aposta no Campeão                       │
│                                                    │
│  1. POST /api/winner-bet/place { team, amount }   │
│  2. Calcular: betValue = amount × 2                │
│  3. Verificar: balance >= amount (NÃO betValue)    │
│  4. Criar WinnerBet { amount, betValue }            │
│  5. Criar transação "bet_place" (-amount)          │
│  6. Atualizar: balance -= amount                   │
│  7. Retornar: { amount: 100, betValue: 200 }       │
│                                                    │
│  Exemplo:                                          │
│    • Utilizador aposta R$100 no Brasil             │
│    • Débito: R$100 do saldo                        │
│    • Valor registrado: R$200 (para payout)         │
│    • Se Brasil vencer → payout = R$200             │
│    • Lucro efetivo: R$100 (100% de ROI)            │
└──────────────────────────────────────────────────┘
```

### Ordem de Débito em Saques

```
Saque de R$80 com balance=30, bonusBalance=60:
  1. Usa bonusBalance primeiro: min(60, 80) = 60
  2. Restante: 80 - 60 = 20
  3. Usa balance: min(30, 20) = 20
  4. Resultado: bonusBalance=0, balance=10
```

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

# 6. Popular com 72 jogos da fase de grupos
bunx tsx prisma/seed.ts
# ou: npx tsx prisma/seed.ts

# 7. Iniciar em desenvolvimento
bun run dev
# ou: npm run dev
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

## 🔒 Segurança

- **No client-side secrets**: `z-ai-web-dev-sdk` é usado apenas no backend
- **Input sanitization**: React DOM sanitiza automaticamente
- **SQL Injection**: Prevenido via Prisma ORM (parameterized queries)
- **Environment variables**: `DATABASE_URL` não exposta ao cliente
- **Cascade deletes**: Utilizadores e jogos removidos limpam registros relacionados
- **Saldo protegido**: Validação server-side de saldo antes de apostas e saques

---

## 🗺️ Roadmap

- [x] MVP: Dark theme, Hero, Live Panel, Markets, BetSlip
- [x] Sistema de autenticação WhatsApp
- [x] Carteira digital com PIX (depósito/saque)
- [x] Sistema de bônus de depósito (R$100+ → R$50)
- [x] Aposta no Campeão com promoção 2x
- [x] 72 jogos da fase de grupos com odds reais
- [x] Integração de streaming GETV
- [ ] Supabase integration (Realtime Channels via WebSocket)
- [ ] Perfil de utilizador com avatar e estatísticas
- [ ] Notificações push para mudanças de odds e resultados
- [ ] Cash Out (encerrar aposta antes do final)
- [ ] Apostas ao vivo (in-play) com odds dinâmicas
- [ ] PWA (Service Worker + offline)
- [ ] Internacionalização (next-intl — EN, ES, PT)
- [ ] Dashboard de estatísticas (Recharts)
- [ ] Chat ao vivo (AI-powered)
- [ ] Mobile app (React Native / Expo)

---

## 📄 Licença

Este projeto é licenciado sob a **MIT License**. Veja [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**Construído com ⚡ por [NeX Bets](https://github.com/nexflowx-hub)**

**FIFA World Cup 2026 — United States, Canada & Mexico**

</div>
