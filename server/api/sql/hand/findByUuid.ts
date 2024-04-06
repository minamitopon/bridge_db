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
    return new Error(e);
  }
});

const generateQuery = (uuid) => {
  return `
  SELECT * FROM hands
  WHERE uuid = '${uuid}';
`;
};
