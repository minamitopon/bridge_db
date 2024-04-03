import { toNumber } from "lodash";
import { type BoardInfo } from "../types/backend";

export class BoardInfoModel {
  boardInfo: BoardInfo;

  constructor(boardInfo: BoardInfo) {
    this.boardInfo = boardInfo;
  }

  get uuid() {
    return this.boardInfo.uuid;
  }

  get room() {
    return this.boardInfo.roomId === "o" ? "Open Room" : "Closed Room";
  }

  get boardNumber() {
    return this.boardInfo.boardNum;
  }

  get auction() {
    const parseAuction = this.boardInfo.auction
      .replace(/[\|mb\||\|pg\|]/g, "")
      .replace("PPP", "")
      .match(/[1-7][C|D|H|S|NT]/g);

    return parseAuction;
  }

  get fullAuction() {
    const parseAuction = this.boardInfo.auction
      .replace(/(\|mb\|)|(\|pg\|)/g, "")
      .replace("ppp", "")
      .match(/[1-7][C|D|H|S|NT]|[drp]/g);
    return parseAuction || [];
  }

  get contract() {
    let contract;
    switch (this.fullAuction?.pop()) {
      case "p":
        contract = "PO";
        break;
      case "d":
        contract =
          this.fullAuction
            ?.reverse()
            .find((call) => call !== "d" && call !== "p") + "x";
        break;
      case "r":
        contract =
          this.fullAuction
            ?.reverse()
            .find((call) => call !== "r" && call !== "d" && call !== "p") +
          "xx";
        break;
      default:
        contract = this.fullAuction?.pop();
    }
    return contract;
  }

  get play() {
    return this.boardInfo.play;
  }

  get totalTricks() {
    return this.boardInfo.tricks === "undifined"
      ? null
      : toNumber(this.boardInfo.tricks);
  }

  get result() {
    const declaration = toNumber(this.contract?.slice(0, 1));
    return this.totalTricks
      ? this.unitedResult(this.totalTricks - declaration - 6)
      : null;
  }

  get score(): number {
    return this.calcScore(this.contract, this.vulnerable);
  }

  get vulnerable(): "NV" | "V" {
    const base = [
      "EW",
      "N",
      "NS",
      "EW",
      "B",
      "NS",
      "EW",
      "B",
      "N",
      "EW",
      "B",
      "N",
      "NS",
      "B",
      "N",
      "NS",
      "EW",
    ];
    const vulOfBoard = base[this.boardNumber % 16];

    if (vulOfBoard === "N") return "NV";
    if (vulOfBoard === "B") return "V";
    if (vulOfBoard.includes(this.declare)) return "V";
    else return "NV";
  }

  get declare(): string {
    return this.findDeclare(this.fullAuction, this.boardNumber);
  }

  unitedResult(tricks) {
    if (tricks > 0) return `+${tricks}`;
    else if (tricks === 0) return `=`;
    else return tricks;
  }

  // ダブルド未対応
  calcScore(contract: string, vul: "NV" | "V"): number {
    const trump = contract[1];
    const makeCount = this.totalTricks ? this.totalTricks - 6 : null;

    // パスアウト
    if (makeCount === null) return 0;

    // ダウンした時の点数
    const downPenalty = vul === "V" ? 100 : 50;
    if (this.result < 0) return this.result * downPenalty;

    // メイクした時の得点
    const gameBonus = vul === "V" ? 450 : 250;
    const slamBonus = vul === "V" ? 750 : 500;

    const isMinor = trump === "C" || trump === "D";
    const isMajor = trump === "H" || trump === "S";
    const isNt = trump === "N";

    const declaration = toNumber(contract[0]);
    const isBelowGame = isNt
      ? declaration < 3
      : isMajor
      ? declaration < 4
      : declaration < 5;
    const isBelowSmallSlam = declaration < 6;
    const isBelowGrandSlam = declaration < 7;

    const basePoint = isMinor ? 20 : 30;

    let score = 0;
    score += makeCount * basePoint;
    if (isNt) score += 10;
    score += 50;
    if (isBelowGame) return score;
    score += gameBonus;
    if (isBelowSmallSlam) return score;
    score += slamBonus;
    if (isBelowGrandSlam) return score;
    score += slamBonus;
    return score;
  }

  findDeclare(auction, boardNum) {
    if (this.contract === "PO") return "PO";
    const contract = this.contract.replace(/x|r/, "");
    const lastTrump = contract[1];
    const lastCallerId = auction.indexOf(contract) % 4;
    const firstCallerId =
      auction.findIndex((call, index) => {
        const trump = call[1];
        return trump === lastTrump && index % 2 === lastCallerId % 2;
      }) % 4;

    const side = ["W", "N", "E", "S", "W", "N", "E", "S"];
    const orderOfCall = side.slice(boardNum % 4, (boardNum % 4) + 4);

    return orderOfCall[firstCallerId];
  }
}
