export interface searchQuery {
  match_name: string;
  team_name: string;
  player_name: string;
  auction: string;
  hands: string;
}

export interface handKeyword {
  spades: string;
  hearts: string;
  diamonds: string;
  clubs: string;
  hands: string;
}

export type matchRecord = {
  id: number;
  uuid: string;
  name: string;
  round: string;
  players: string;
  startBoard: string;
  lastBoard: string;
  teamOpen: string;
  teamOpenImp: string;
  teamClose: string;
  teamCloseImp: string;
};

export type imgOptions = {
  rotate?: number;
};
