import { dbConnection } from "../../sql";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (e) => {
  const query = await getQuery(e);
  const uuid = query.uuid;
  const conn = await dbConnection;

  try {
    const [rows, fields] = await conn.execute(generateQuery(uuid));
    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});

const generateQuery = (uuid) => {
  return `
  SELECT * FROM players
  WHERE uuid = '${uuid}'
  LIMIT 1;
`;
};
