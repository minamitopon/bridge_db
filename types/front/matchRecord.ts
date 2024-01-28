export interface Match {
  id: number;
  uuid: string;
  name: string;
  teamOpen: string;
  teamClose: string;
}

export interface MatchPlayers {
  id: number;
  uuid: string;
  northOpen: string;
  eastOpen: string;
  southOpen: string;
  westOpen: string;
  northClose: string;
  eastClose: string;
  southClose: string;
  westClose: string;
}

export interface MatchProgress {
  id: number;
  uuid: string;
  round: string;
  startBoard: number;
  lastBoard: number;
  impOpen: number;
  impClose: number;
}
