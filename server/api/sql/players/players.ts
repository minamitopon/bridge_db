import { dbConnection } from "../../sql";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (e) => {
  try {
    const body = await readBody(e);
    const conditions = body.map((uuid) => `'${uuid}'`);

    const statement = `
    SELECT * FROM players
    WHERE uuid IN (${conditions});
    `;
    const conn = await dbConnection;
    const [rows, fields] = await conn.execute(statement);
    return [rows];
  } catch (e) {
    return new Error(e);
  }
});
