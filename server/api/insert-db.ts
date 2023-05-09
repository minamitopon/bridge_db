import { matchInfo } from "../../types/matchInfo";
import { boardRecord } from "../../types/boardRecord";
import { dbConnection } from "./sql";

export default async (
  matchInfo: matchInfo,
  boardRecord: boardRecord[],
  uuid: string
) => {
  const conn = await dbConnection;

  try {
    const [rows, fields] = await conn.execute(
      generateQueryOfInsertMatchInfo(matchInfo, uuid)
    );
    for (let record of boardRecord) {
      await conn.execute(generateQueryOfInsertBoardInfo(record, uuid));
    }
    return;
  } catch (e) {
    console.log(e);
    return "";
  }
};

const generateQueryOfInsertMatchInfo = (matchInfo: matchInfo, uuid: string) => {
  const query = `
    INSERT INTO matchinfo_test (
      uuid,
      name,
      round,
      players,
      startBoard,
      lastBoard,
      teamOpen,
      teamOpenImp,
      teamClose,
      teamCloseImp
    ) VALUES (
      '${uuid}',
      '${matchInfo.name}',
      '${matchInfo.round}',
      '${matchInfo.players}',
      '${matchInfo.startBoard}',
      '${matchInfo.lastBoard}',
      '${matchInfo.teamOpen}',
      '${matchInfo.teamOpenImp}',
      '${matchInfo.teamClose}',
      '${matchInfo.teamCloseImp}'
    );`;
  return query;
};

const generateQueryOfInsertBoardInfo = (
  boardRecord: boardRecord,
  uuid: string
) => {
  const query = `
    INSERT INTO boardinfo_test (
      matchId,
      roomId,
      players,
      boardNum,
      vul,
      auction,
      hands,
      play
    ) VALUES (
      '${uuid}',
      '${boardRecord.roomId}',
      '${boardRecord.players}',
      '${boardRecord.boardNum}',
      '${boardRecord.vul}',
      '${boardRecord.auction}',
      '${boardRecord.hands}',
      '${boardRecord.play}'
    );
  `;
  return query;
};
