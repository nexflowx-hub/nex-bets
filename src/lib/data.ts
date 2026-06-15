export interface TeamOdd {
  team: string;
  odd: number;
  flag: string;
}

export interface MatchOdd {
  '1': number;
  'X': number;
  '2': number;
}

export interface Match {
  id: string;
  date: string;
  time: string;
  home: string;
  away: string;
  odds: MatchOdd;
  group?: string;
}

export const outrightWinnerOdds: TeamOdd[] = [
  { team: 'Brasil', odd: 10.00, flag: '🇧🇷' },
  { team: 'Espanha', odd: 5.50, flag: '🇪🇸' },
  { team: 'França', odd: 5.75, flag: '🇫🇷' },
  { team: 'Inglaterra', odd: 8.50, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { team: 'Portugal', odd: 8.50, flag: '🇵🇹' },
  { team: 'Argentina', odd: 10.00, flag: '🇦🇷' },
  { team: 'Alemanha', odd: 14.00, flag: '🇩🇪' },
];

export const groupStageMatches: Match[] = [
  { id: 'm1', date: 'Qua, 17 Jun', time: '14:00', home: 'Portugal', away: 'RD Congo', odds: { '1': 1.29, 'X': 5.80, '2': 10.00 }, group: 'B' },
  { id: 'm2', date: 'Sex, 19 Jun', time: '21:30', home: 'Brasil', away: 'Haiti', odds: { '1': 1.12, 'X': 9.90, '2': 20.00 }, group: 'A' },
  { id: 'm3', date: 'Ter, 23 Jun', time: '14:00', home: 'Portugal', away: 'Uzbequistão', odds: { '1': 1.27, 'X': 6.30, '2': 10.00 }, group: 'B' },
  { id: 'm4', date: 'Qua, 24 Jun', time: '19:00', home: 'Escócia', away: 'Brasil', odds: { '1': 6.80, 'X': 4.60, '2': 1.45 }, group: 'A' },
  { id: 'm5', date: 'Sáb, 27 Jun', time: '20:30', home: 'Colômbia', away: 'Portugal', odds: { '1': 3.55, 'X': 3.30, '2': 2.15 }, group: 'B' },
  { id: 'm6', date: 'Seg, 15 Jun', time: '13:00', home: 'Espanha', away: 'Cabo Verde', odds: { '1': 1.08, 'X': 13.00, '2': 22.00 }, group: 'C' },
  { id: 'm7', date: 'Qua, 17 Jun', time: '17:00', home: 'Inglaterra', away: 'Croácia', odds: { '1': 1.75, 'X': 3.75, '2': 4.85 }, group: 'D' },
];

export const countryFlags: Record<string, string> = {
  'Brasil': '🇧🇷', 'Espanha': '🇪🇸', 'França': '🇫🇷', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Portugal': '🇵🇹', 'Argentina': '🇦🇷', 'Alemanha': '🇩🇪', 'RD Congo': '🇨🇩',
  'Haiti': '🇭🇹', 'Uzbequistão': '🇺🇿', 'Escócia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Colômbia': '🇨🇴',
  'Cabo Verde': '🇨🇻', 'Croácia': '🇭🇷', 'Egito': '🇪🇬', 'Bósnia': '🇧🇦',
  'Bélgica': '🇧🇪', 'Costa do Marfim': '🇨🇮', 'Equador': '🇪🇨', 'Suíça': '🇨🇭'
};

export const CHAMPION_BONUS = 5;
export const MATCH_BONUS_THRESHOLD = 100;
export const MATCH_BONUS_MULTIPLIER = 2;

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}