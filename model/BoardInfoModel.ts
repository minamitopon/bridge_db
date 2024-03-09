import { type BoardInfo } from "../types/backend";

export class BoardInfoModel {
  boardInfo: BoardInfo;

  constructor(boardInfo: BoardInfo) {
    this.boardInfo = boardInfo;
  }

  get uuid() {
    return this.boardInfo.uuid;
  }
}
