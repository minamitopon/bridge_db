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
    const res = JSON.parse(JSON.stringify(rows)).map((datum) => {
      const info: Match = {
        uuid: datum.uuid,
        name: datum.name,
        team_open: datum.team_open,
        team_close: datum.team_close,
      };
      const players: MatchPlayers = {
        uuid: datum.uuid,
        north_open: datum.north_open,
        east_open: datum.east_open,
        south_open: datum.south_open,
        west_open: datum.west_open,
        north_close: datum.north_close,
        east_close: datum.east_close,
        south_close: datum.south_close,
        west_close: datum.west_close,
      };
      const progress: MatchProgress = {
        uuid: datum.uuid,
        round: datum.round,
        startBoard: datum.startBoard,
        lastBoard: datum.lastBoard,
        imp_open: datum.imp_open,
        imp_close: datum.imp_close,
      };
      return new matchRecord(info, players, progress);
    });

    return res;
  } catch (e) {
    console.log(e);
    return "";
  }
});
