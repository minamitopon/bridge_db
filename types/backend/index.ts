export interface SearchResult {
  id: number;
  uuid: string;
  name: string;
  team_open: string;
  team_close: string;
  north_open: string;
  east_open: string;
  south_open: string;
  west_open: string;
  north_close: string;
  east_close: string;
  south_close: string;
  west_close: string;
  round: string;
  startBoard: number;
  lastBoard: number;
  imp_open: number;
  imp_close: number;
  board?: string;
}

export interface Hands {
  id: number;
  uuid: string;
  board: string;
  north_spade: string;
  north_heart: string;
  north_diamond: string;
  north_club: string;
  south_spade: string;
  south_heart: string;
  south_diamond: string;
  south_club: string;
  east_spade: string;
  east_heart: string;
  east_diamond: string;
  east_club: string;
  west_spade: string;
  west_heart: string;
  west_diamond: string;
  west_club;
}
