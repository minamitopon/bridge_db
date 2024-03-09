import { defineEventHandler, getQuery } from "h3";
import { dbConnection } from "../../sql";
import { type SearchResult, type Hands } from "../../../../types/backend";

export default defineEventHandler(async (e) => {
  const query = await getQuery(e);

  const conn = await dbConnection;
  try {
    const tmpResult: SearchResult[] = [];
    /**
     * ハンドの方がレコード数が多いので、先に条件に合致したUUIDだけ絞り込む
     */
    if (
      query.match_name ||
      query.team_name ||
      query.player_name ||
      query.auction
    ) {
      const statement = `
        select * from matches as ms
        inner join players as ps
        on ms.uuid = ps.uuid
        inner join match_progress as mp
        on ms.uuid = mp.uuid
        where ${generateConditons(query)};
      `;

      const [rows] = (await conn.execute(
        statement
      )) as unknown[][] as SearchResult[][];
      tmpResult.push(...rows);
      if (query.hands) {
        const uuids = tmpResult.map((r) => r.uuid);
        const statement = `
            select uuid, board from hands
            where ${uuids ? `uuid in (?) and ` : ``}
            ${parseHandCondition(query.hands)};
          `;

        const [rows] = (await conn.execute(statement, [
          uuids,
        ])) as unknown[][] as Hands[][];
        const narrowedUuids = rows.map((r) => r.uuid);
        const response = tmpResult
          .filter((r) => narrowedUuids.includes(r.uuid))
          .map((r) => {
            const board = rows.find((row) => row.uuid === r.uuid);
            return Object.assign({}, r, board);
          });
        return JSON.stringify(parseSearchResults(response));
      }
      return JSON.stringify(parseSearchResults(rows));
    } else {
      const statement = `
        with bd as (select uuid, board from hands where ${parseHandCondition(
          query.hands
        )})
        select * from matches as ms
        inner join players as ps
        on ms.uuid = ps.uuid
        inner join match_progress as mp
        on ms.uuid = mp.uuid
        inner join bd
        on ms.uuid = bd.uuid;
      `;
      const [rows] = (await conn.execute(
        statement
      )) as unknown[][] as SearchResult[][];
      return JSON.stringify(parseSearchResults(rows));
    }
  } catch (e) {
    console.log(e);
    return { status: "error" };
  }
});

const generateConditons = (query) => {
  const conditions: string[] = [];
  for (const condition in query) {
    if (!query[condition]) continue;
    switch (condition) {
      case "match_name":
        conditions.push(conditionOfMatchName(query[condition]));
        break;
      case "team_name":
        conditions.push(conditionOfTeamName(query[condition]));
        break;
      case "player_name":
        conditions.push(conditionOfPlayerName(query[condition]));
        break;
      case "auction":
        conditions.push(conditionOfAuction(query[condition]));
        break;
      case "hand":
        conditions.push(conditionOfHand(query[condition]));
        break;
      default:
        continue;
    }
  }
  return `${conditions.join(" and ")}`;
};

const conditionOfMatchName = (match_name: string) => {
  return `
  ms.name in '%${match_name}%'
  `;
};

const conditionOfTeamName = (team_name) => {
  return `
  concat(ms.team_open, ms.team_close) in '%${team_name}%'
  `;
};

const conditionOfPlayerName = (player_name) => {
  return `
  concat(ps.north_open, ps.east_open, ps.south_open, ps.west_open, ps.north_close, ps.east_close, ps.south_close, ps.west_close) like '%${player_name}%'
  `;
};

const conditionOfAuction = (auction) => {
  return `
  concat(ms.team_open, ms.team_close) in '%${auction}%'
  `;
};

const conditionOfHand = (hand) => {
  const cardHolding = parseHandCondition(hand);
  return `
  (
    select uuid, board from hands
    where ${handColumnsRegexpCondition(hand)}
  ) as handsConditions`;
};

const parseHandCondition = (hand) => {
  /**
   * A, K, Q, J は大文字。
   * 10 は T として扱う。
   * H は(A, K, Q, J, T)として扱う。
   * X, x は9~2の任意の1枚として扱う。
   * (x) は9~2の任意の複数枚として扱う。
   * 使用可能文字のバリデーションはフロントが担う
   */
  const cardRank = [
    "A",
    "K",
    "Q",
    "J",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "X",
    "G",
  ];
  const parsedHand = hand
    .toUpperCase()
    .replace("10", "T")
    .replace("(X)", "G")
    .split("")
    .sort((x, y) => {
      return cardRank.indexOf(x) - cardRank.indexOf(y);
    });
  const isAmbiguous: boolean = parsedHand.some((c) => c === "G");
  const honers = parsedHand.filter((c) => /[A|K|Q|J|T]/.test(c)).join("");
  const numOfCards = isAmbiguous ? parsedHand.length - 1 : parsedHand.length;
  const specificCards = parsedHand.filter((c) => c !== "X").join("");
  const reg = `^${specificCards}.{${numOfCards - specificCards.length}}$`;
  if (isAmbiguous) {
    return {
      parsedHand,
      numOfCards,
    };
  } else {
    return handColumnsRegexpCondition(reg);
  }
};

const handColumns = [
  "north_spade",
  "north_heart",
  "north_diamond",
  "north_club",
  "south_spade",
  "south_heart",
  "south_diamond",
  "south_club",
  "east_spade",
  "east_heart",
  "east_diamond",
  "east_club",
  "west_spade",
  "west_heart",
  "west_diamond",
  "west_club",
];

const handColumnsRegexpCondition = (reg) => {
  const condition: string[] = [];
  for (const column of handColumns) {
    condition.push(`${column} regexp '${reg}'`);
  }
  return condition.join(" or ");
};

/** フロントでモデルに使用できる形にして返却 */
const parseSearchResults = (results: SearchResult[]) => {
  return results.map((result) => {
    return {
      info: {
        uuid: result.uuid,
        name: result.name,
        team_open: result.team_open,
        team_close: result.team_close,
      },
      players: {
        uuid: result.uuid,
        north_open: result.north_open,
        east_open: result.east_open,
        south_open: result.south_open,
        west_open: result.west_open,
        north_close: result.north_close,
        east_close: result.east_close,
        south_close: result.south_close,
        west_close: result.west_close,
      },
      progress: {
        uuid: result.uuid,
        round: result.round,
        startBoard: result.startBoard,
        lastBoard: result.lastBoard,
        imp_open: result.imp_open,
        imp_close: result.imp_close,
      },
      board: result.board ?? null,
    };
  });
};
