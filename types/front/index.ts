export interface searchQuery {
  matchName: string;
  teamName: string;
  playerName: string;
  auction: string;
  hands: string;
}

export type matchRecord = {
  id: number;
  uuid: string;
  name: string;
  round: string;
  players: string;
  startBoarrd: string;
  lastBoarrd: string;
  teamOpen: string;
  teamOpenImp: string;
  teamClose: string;
  teamCloseImp: string;
};
