import { dbConnection } from "../sql";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (e) => {
  const conn = await dbConnection;
  console.log("ok");

  try {
    const [rows, fields] = await conn.execute(selectLatestRecord);
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const selectLatestRecord = `
  SELECT * FROM matches
  ORDER BY id
  DESC
  LIMIT 100;
`;
