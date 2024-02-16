import { Match, MatchPlayers, MatchProgress } from "../types/front/matchRecord";

export class matchRecord {
  info: Match;
  players: MatchPlayers;
  progress: MatchProgress;

  constructor(info: Match, players: MatchPlayers, progress: MatchProgress) {
    this.info = info;
    this.players = players;
    this.progress = progress;
  }

  get uuid() {
    return this.info.uuid;
  }

  get teamName() {
    return {
      open: this.info.team_open,
      close: this.info.team_close,
    };
  }

  get openRoomPlayers() {
    return {
      north: this.players.north_open,
      east: this.players.east_open,
      south: this.players.south_open,
      west: this.players.west_open,
    };
  }

  get closeRoomPlayers() {
    return {
      north: this.players.north_close,
      east: this.players.east_close,
      south: this.players.south_close,
      west: this.players.west_close,
    };
  }
}