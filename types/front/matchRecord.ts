export interface Match {
  id: number;
  uuid: string;
  name: string;
  team_open: string;
  team_close: string;
}

export interface MatchPlayers {
  id: number;
  uuid: string;
  north_open: string;
  east_open: string;
  south_open: string;
  west_open: string;
  north_close: string;
  east_close: string;
  south_close: string;
  west_close: string;
}

export interface MatchProgress {
  id: number;
  uuid: string;
  round: string;
  startBoard: number;
  lastBoard: number;
  imp_open: number;
  imp_close: number;
}
