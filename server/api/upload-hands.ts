import { v4 as uuidv4 } from "uuid";
import { matchInfo } from "../../types/matchInfo";
import insertDb from "./insert-db";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const query = await readBody(event);
  const contents = query.contents.replace(/\r?\n|nt\|(.*?)pg\|\|/g, "");
  if (!contents) return;

  const uuid = uuidv4();
  const matchInfo = parseMatchInfo(contents);
  const boardRecord = parseBoardRecord(contents);
  if (!matchInfo || !boardRecord) return;
  insertDb(matchInfo, boardRecord, uuid);
  return;
});

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

const parseBoardRecord = (lin) => {
  const matchRecordArray = matchRecord(lin);
  // ボードセット情報
  const firstBoard = Number(matchRecordArray?.[3]);
  const lastBoard = Number(matchRecordArray?.[4]);
  const totalBoards = lastBoard - firstBoard + 1;
  const allBoardArray = createBoardNumArray(firstBoard, totalBoards);

  const regForRecords = /qx(.*?)(?=qx)|qx(.*?)$/gs;
  const boardRecord = lin
    .replace(/\r?\n|nt\|(.*?)pg\|\|/g, "")
    .match(regForRecords);

  const records: any = [];
  boardRecord?.forEach((record, index) => {
    const rec = {
      boardNum: allBoardArray[index],
      roomId: index % 2 ? "c" : "o",
      ...generateBoardRecord(record),
    };
    records.push(rec);
  });

  return records;
};

const createBoardNumArray = (start, length) => {
  let arr: number[] = [];
  for (let i = 0; i < length; i++) {
    const num: number = start + i;
    arr.push(num);
    arr.push(num);
  }
  return arr;
};

const generateBoardRecord = (record) => {
  // ハンド情報
  const regForHand = /(?<=md\|)(.+?)(?=\|sv)/g;
  const handArray = record.match(regForHand)?.[0];

  // オークション情報
  const regForAuction = /(?<=mb\|)(.+?)(?=\|pc)/g;
  const auctionArray = record.match(regForAuction)?.[0];

  // バル状況
  const regForVulnerability = /(?<=sv\|)(.+?)(?=\|mb)/gs;
  const vulnerabilityArray = record.match(regForVulnerability)?.[0];

  // プレイ情報
  const regForPlay = /(?<=pc\|)(.+?)(?=mc|pg\|\|pg)/gs;
  const playArray = record.match(regForPlay)?.[0];

  return {
    vul: vulnerabilityArray,
    auction: auctionArray,
    hands: handArray,
    play: playArray,
  };
};
