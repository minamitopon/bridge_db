import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../sql";

export default defineEventHandler(async (event) => {
  const query = await readBody(event);
  const uuid = query.uuid;
  const conn = await dbConnection;
  try {
    const [rows, fields] = await conn.execute(selectBoardDataByUuid(uuid));
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const selectBoardDataByUuid = (uuid) => {
  return `
    SELECT * FROM boardinfo_test
    WHERE matchId = '${uuid}';
  `;
};
