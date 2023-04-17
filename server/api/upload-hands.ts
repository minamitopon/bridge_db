import { v4 as uuidv4 } from "uuid";
import { boardRecord } from "../../types/boardRecord";
import { matchInfo } from "../../types/matchInfo";
import insertDb from "./insert-db";
import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  const url = event.node.req.url;
  if (!url) return;
  const contents = pickContents(url);

  const uuid = uuidv4();
  const matchInfo = parseMatchInfo(contents);
  const boardRecord = parseBoardRecord(contents);
  if (!matchInfo || !boardRecord) return;
  insertDb(matchInfo, boardRecord, uuid);
  return;
});

const pickContents = (url: string) => {
  const reg = /.*?contents=/g;
  const contents = url.replace(reg, "");
  return contents;
};

const analyzeUrlParams = (contents: string) => {};

const parseMatchInfo = (lin: string) => {
  const reg = /vg\|[^|]*|/g;
  const matchData = lin.match(reg)?.[0].replace(/\+/g, " ");
  if (!matchData) return;
  const matchInfoArray = matchData.split(",");
  const matchInfo: matchInfo = {
    name: matchInfoArray[0].replace(/vg\|/g, ""),
    round: matchInfoArray[1],
    startBoard: matchInfoArray[3],
    lastBoard: matchInfoArray[4],
    teamOpen: matchInfoArray[5],
    teamOpenImp: matchInfoArray[6],
    teamClose: matchInfoArray[7],
    teamCloseImp: matchInfoArray[8],
  };
  return matchInfo;
};

const matchRecord = (lin: string) => {
  const reg = /vg\|[^|]*|/g;
  const matchData = lin.match(reg)?.[0].replace(/\+/g, " ");
  if (!matchData) return null;
  const matchInfoArray = matchData.split(",");
  return matchInfoArray;
};

const parseBoardRecord = (lin: string) => {
  const boardRecord: boardRecord[] = [];
  const matchRecordArray = matchRecord(lin);
  // ボードセット情報
  const firstBoard = Number(matchRecordArray?.[3]);
  const lastBoard = Number(matchRecordArray?.[4]);
  const totalBoards = lastBoard - firstBoard + 1;

  const boardNumArray = new Array(totalBoards * 2)
    .fill(firstBoard)
    .map((b, i) => b + i);
  const allBoardArray = boardNumArray.concat(boardNumArray).sort();

  // ハンド情報
  const regForHand = /md\|[^|]*\|/g;
  const handArray = lin.match(regForHand);

  // オークション情報
  const regForAuction = /mb\|(.*?)\|pc/g;
  const auctionArray = lin.match(regForAuction);

  // バル状況
  const vulnerability = [
    "e",
    "o",
    "n",
    "e",
    "b",
    "n",
    "e",
    "b",
    "o",
    "e",
    "b",
    "o",
    "n",
    "b",
    "o",
    "n",
  ];

  // プレイ情報
  const regForPlay = /pc\|(.*?)(mc|pg\|\|%0D%0Apg)/g;
  const playArray = lin.match(regForPlay);

  for (let i = 0; i < totalBoards * 2; i++) {
    const boardInfo: boardRecord = {
      boardNum: allBoardArray[i],
      vul: vulnerability[allBoardArray[i] % 16],
      roomId: i % 2 ? "c" : "o",
      auction: auctionArray?.[i],
      hands: handArray?.[i],
      play: playArray?.[i],
    };
    boardRecord.push(boardInfo);
  }
  return boardRecord;
};
