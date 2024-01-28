import { Match, MatchPlayers, MatchProgress } from "../types/front/matchRecord";

export class matchRecord {
  info: Match;
  players: MatchPlayers;
  progress: MatchProgress;

  constructor(info, players, progress) {
    this.info = info;
    this.players = players;
    this.progress = progress;
  }

  get uuid() {
    return this.info.uuid;
  }

  get teamName() {
    return {
      open: this.info.teamOpen,
      close: this.info.teamClose,
    };
  }

  get openRoomPlayers() {
    return {
      north: this.players.northOpen,
      east: this.players.eastOpen,
      south: this.players.southOpen,
      west: this.players.westOpen,
    };
  }

  get closeRoomPlayers() {
    return {
      north: this.players.northClose,
      east: this.players.eastClose,
      south: this.players.southClose,
      west: this.players.westClose,
    };
  }
}
