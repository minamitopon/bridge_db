import { defineEventHandler, getQuery } from "h3";
import { dbConnection } from "../../sql";
import {
  type Match,
  type MatchPlayers,
  type MatchProgress,
} from "../../../../types/front/matchRecord";
import { matchRecord } from "../../../../model/matchRecord";
export default defineEventHandler(async (e) => {
  const query = await getQuery(e);
  const keyword = `%${query.keyword}%` as string;

  const conn = await dbConnection;
  try {
    if (!keyword) return { status: "empty keyword" };
    const statement = `
    SELECT * FROM matches
    INNER JOIN players
    ON matches.uuid = players.uuid
    INNER JOIN match_progress
    ON matches.uuid = match_progress.uuid
    WHERE CONCAT(matches.name, matches.team_open, matches.team_close, players.north_open, players.east_open, players.south_open, players.west_open, players.north_close, players.east_close, players.south_close, players.west_close)
    LIKE ?;
    `;
    const [rows, fields] = await conn.execute(statement, [keyword]);

    return JSON.stringify(rows);
  } catch (e) {
    console.log(e);
    return "";
  }
});
