import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../../sql";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const conn = await dbConnection;
  try {
    const [rows, fields] = await conn.execute(
      generateQueryOfSearchPlayers(query.val)
    );
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const generateQueryOfSearchPlayers = (name) => {
  return `
    SELECT * FROM matchinfo_test
    WHERE players LIKE '%${name}%'
  `;
};
