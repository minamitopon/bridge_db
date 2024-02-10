import { dbConnection } from "../../sql";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (e) => {
  const query = await getQuery(e);
  const uuid = query.uuid as string;
  const conn = await dbConnection;

  try {
    const [rows, fields] = await conn.execute(generateQuery(uuid));
    return JSON.stringify(rows);
  } catch (e) {
    throw new Error();
  }
});

const generateQuery = (uuid: string) => {
  return `
  SELECT * FROM match_progress
  WHERE uuid = '${uuid}'
  LIMIT 1;
`;
};
