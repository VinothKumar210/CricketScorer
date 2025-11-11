export interface PlayerStats {
  id: string;
  name: string;
  team: string;
  role: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  highestScore: number;
  fifties?: number;
  hundreds?: number;
  wickets?: number;
  bestBowling?: string;
  economy?: number;
  fiveWickets?: number;
  catches: number;
  stumpings?: number;
  dismissals?: number;
}

export interface PlayerOption {
  id: string;
  name: string;
  team: string;
}

export interface PlayerComparisonData {
  [key: string]: PlayerStats;
}
