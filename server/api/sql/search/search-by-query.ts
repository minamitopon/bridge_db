import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../../sql";

export default defineEventHandler(async (event) => {
  const param = await readBody(event);
  const conn = await dbConnection;
  try {
    if (param.query.matchName || param.query.teamName || param.query.teamName) {
      const [rows, fields] = await conn.execute(generateQuery(param));
      return JSON.stringify(rows);
    } else if (param.query.auction || param.query.hands) {
      const [rows, fields] = await conn.execute(generateBoardInfoQuery(param));
      return JSON.stringify(rows);
    }
  } catch (e) {
    console.log(e);
    return "";
  }
});

const generateQuery = (query) => {
  return `
    SELECT *
    FROM matchinfo_test
    WHERE ${generateWhereQuery(query)};`;
};

const generateWhereQuery = (param) => {
  const conditions: string[] = [];
  if (param.query.matchName) {
    conditions.push(`(name LIKE '%${param.query.matchName}%')`);
  }
  if (param.query.teamName) {
    conditions.push(
      `(teamOpen LIKE '%${param.query.teamName}%' OR teamClose LIKE '%${param.query.teamName}%')`
    );
  }
  if (param.query.playerName) {
    conditions.push(`(players LIKE '%${param.query.playerName}%')`);
  }

  return conditions.join(" AND ");
};

const generateBoardInfoQuery = (param) => {
  return `
    SELECT *
    FROM boardinfo_test
    WHERE ${generateQueryForBoard(param)};`;
};

const generateQueryForBoard = (param) => {
  const conditions: string[] = [];

  if (param.query.hands) {
    conditions.push(`(hands LIKE '%${param.query.hands}%')`);
  }
  if (param.query.auction) {
    conditions.push(`(auction LIKE '%${param.query.auction}%')`);
  }

  return conditions.join(" AND ");
};
