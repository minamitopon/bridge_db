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

  get score() {
    return this.calcScore(this.contract, "");
  }

  get vulnerable() {
    const vul = [
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
    return vul[this.boardNumber % 16];
  }

  get declare() {
    return this.findDeclare(this.fullAuction, this.boardNumber);
  }

  unitedResult(tricks) {
    if (tricks > 0) return `+${tricks}`;
    else if (tricks === 0) return `=`;
    else return tricks;
  }

  // バル未対応
  calcScore(contract, vul) {
    const trump = contract[1];
    const makeCount = this.totalTricks ? this.totalTricks - 6 : null;

    if (makeCount === null) return null;
    if (this.result < 0) return this.result * 50;
    let score = 0;
    switch (trump) {
      case "C":
      case "D": {
        const declaration = contract[0];
        score += makeCount * 20;
        score += 50;
        if (declaration < 5) break;
        score += 250;
        if (declaration < 6) break;
        score += 500;
        if (declaration < 7) break;
        score += 500;
        break;
      }
      case "H":
      case "S": {
        const declaration = contract[0];
        score += makeCount * 30;
        score += 50;
        if (declaration < 4) break;
        score += 250;
        if (declaration < 6) break;
        score += 500;
        if (declaration < 7) break;
        score += 500;
        break;
      }
      case "N": {
        const declaration = contract[0];
        score += makeCount * 30 + 10;
        score += 50;
        if (declaration < 3) break;
        score += 250;
        if (declaration < 6) break;
        score += 500;
        if (declaration < 7) break;
        score += 500;
        break;
      }
      default:
        break;
    }
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
