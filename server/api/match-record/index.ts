import { defineEventHandler } from "h3";
import { dbConnection } from "../sql";

export default defineEventHandler(async (event) => {
  const conn = await dbConnection;
  let results;
  try {
    const query = `SELECT * FROM matchInfo_test LIMIT 1000`;
    results = await conn.execute(query);
  } catch (e) {
    console.error(`DB error: ${e}`);
  } finally {
    conn.releaseConnection;
    return JSON.stringify(results[0]);
  }
});
