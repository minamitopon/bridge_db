import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../../sql";

export default defineEventHandler(async (event) => {
  const keywords = await readBody(event);
  const conn = await dbConnection;
  try {
    const [rows, fields] = await conn.execute(
      generateQueryOfSearch(keywords.contents)
    );
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const generateQueryOfSearch = (keywords) => {
  const conditions: string[] = [];
  if (keywords.matchName) {
    conditions.push(`name LIKE '%${keywords.matchName}%'`);
  }
  if (keywords.teamName) {
    conditions.push(
      `teamOpen LIKE '%${keywords.teamName}%' OR teamClose LIKE '%${keywords.teamName}%'`
    );
  }
  if (keywords.playerName) {
    conditions.push(`players LIKE '%${keywords.playerName}%'`);
  }
  return `SELECT * FROM matchinfo_test WHERE ${conditions.join(" AND ")}`;
};
