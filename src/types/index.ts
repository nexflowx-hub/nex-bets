export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: string;
  round: string;
  date: string;
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
  venue: string;
  odds: OddsMarket[];
}
