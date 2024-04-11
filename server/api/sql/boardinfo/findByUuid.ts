import { dbConnection } from "../../sql";
import { defineEventHandler, getQuery } from "h3";
import mysql from "mysql2/promise";

export default defineEventHandler(async (e) => {
  const query = await getQuery(e);
  const uuid = query.uuid;
  const conn = await dbConnection;

  try {
    const statement = `
    select * from boardinfo
    where uuid = ?;
    `;
    const [rows, fields] = await conn.execute(statement, [uuid]);
    return JSON.stringify(rows);
  } catch (e) {
    return new Error(e);
  }
});
