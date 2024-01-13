import { dbConnection } from "../../sql";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (e) => {
  const param = await getQuery(e);
  const uuid = param?.uuid;
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
  WHERE uuid = ${uuid}
  LIMIT 1;
`;
};
