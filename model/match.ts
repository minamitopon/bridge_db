import { type matchRecord } from "../types/front/index";

export class MatchData {
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

  constructor(data: matchRecord) {
    Object.assign(this, data);
  }

  get getUuid() {
    return this.uuid;
  }

  get getName() {
    return this.name;
  }

  get getRound() {
    return this.round;
  }

  get getPlayers() {
    return this.players;
  }

  get playersAsArray() {
    return this.players?.split(",");
  }

  get getTeamOpen() {
    return this.teamOpen;
  }

  get getTeamClose() {
    return this.teamClose;
  }
}
