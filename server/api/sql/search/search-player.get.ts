import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../../sql";

export default defineEventHandler(async (event) => {
  const query = await readBody(event);
  const conn = await dbConnection;
  try {
    const [rows, fields] = await conn.execute(searchPlayer);
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const searchPlayer = `
`;
