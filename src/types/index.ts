export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  round: string;
  date: string;
  time: string;
  venue: string;
  odds: OddsMarket[];
  createdAt: string;
  updatedAt: string;
}

export interface OddsMarket {
  id: string;
  matchId: string;
  type: string;
  label: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  yesOdds: number;
  noOdds: number;
  overOdds: number;
  underOdds: number;
}

export interface BetSelection {
  id: string;
  matchId: string;
  matchLabel: string;
  marketType: string;
  marketLabel: string;
  selection: string;
  odds: number;
}

export interface MatchWithOdds {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  round: string;
  date: string;
  time: string;
  venue: string;
  odds: OddsMarket[];
}

export interface User {
  id: string;
  whatsapp: string;
  name: string | null;
  balance: number;
  bonusBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'bonus' | 'bet_place' | 'bet_win';
  amount: number;
  description: string | null;
  pixCode: string | null;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: string;
}

export interface Bet {
  id: string;
  userId: string;
  selections: string;
  totalOdds: number;
  totalStake: number;
  potentialReturn: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  betType: string;
  createdAt: string;
  updatedAt: string;
}

export interface WinnerBet {
  id: string;
  userId: string;
  team: string;
  amount: number;
  betValue: number;
  status: 'active' | 'won' | 'lost';
  createdAt: string;
}

// Teams available for winner betting
export const WORLD_CUP_TEAMS = [
  'Argentina', 'Brasil', 'França', 'Alemanha', 'Espanha', 'Inglaterra', 'Portugal',
  'Bélgica', 'Países Baixos', 'Croácia', 'Suíça', 'Itália', 'Uruguai', 'Colômbia',
  'México', 'EUA', 'Canadá', 'Japão', 'Coreia do Sul', 'Austrália', 'Marrocos',
  'Senegal', 'Nigéria', 'Gana', 'Camarões', 'Costa do Marfim', 'Arábia Saudita',
  'Irã', 'Equador', 'Peru', 'Chile', 'Dinamarca', 'Suécia', 'Polónia', 'Sérvia',
  'Áustria', 'Escócia', 'Turquia', 'República Tcheca', 'Noruega', 'Uzbequistão',
  'Tunísia', 'Argélia', 'Egito', 'Cabo Verde', 'RD do Congo', 'Panamá',
  'Haiti', 'Nova Zelândia', 'Paraguai', 'Catar', 'Iraque', 'Jordânia',
  'África do Sul', 'Bósnia e Herzegovina', 'Curaçao',
];

// Date labels for Portuguese
export const DATE_LABELS: Record<string, string> = {
  '2026-06-11': 'Qui 11 Jun',
  '2026-06-12': 'Sex 12 Jun',
  '2026-06-13': 'Sáb 13 Jun',
  '2026-06-14': 'Dom 14 Jun',
  '2026-06-15': 'Seg 15 Jun',
  '2026-06-16': 'Ter 16 Jun',
  '2026-06-17': 'Qua 17 Jun',
  '2026-06-18': 'Qui 18 Jun',
  '2026-06-19': 'Sex 19 Jun',
  '2026-06-20': 'Sáb 20 Jun',
  '2026-06-21': 'Dom 21 Jun',
  '2026-06-22': 'Seg 22 Jun',
  '2026-06-23': 'Ter 23 Jun',
  '2026-06-24': 'Qua 24 Jun',
  '2026-06-25': 'Qui 25 Jun',
  '2026-06-26': 'Sex 26 Jun',
  '2026-06-27': 'Sáb 27 Jun',
};
