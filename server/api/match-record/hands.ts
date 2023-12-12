import { defineEventHandler, readBody } from "h3";
import { dbConnection } from "../sql";

export default defineEventHandler(async (event) => {
  const conditions = await readBody(event);
  const conn = await dbConnection;

  let results;
  const handConditions: string[] = [];
  try {
    for (const condition in conditions.contents) {
      handConditions.push(generateQuery(condition));
    }
    const query = `SELECT * FROM matchInfo_test LIMIT 1000`;
    results = await conn.execute(query);
  } catch (e) {
    console.error(`DB error: ${e}`);
  } finally {
    conn.releaseConnection;
    return JSON.stringify(results[0]);
  }
});

// TODO: 必要な要件の実装
// １、カード指定での検索
// ２、ワイルドカードでの検索
// ３、枚数未指定での検索
// ４、DBに合わせた変換(a->A, 10->T, etc)
const generateQuery = (condition): string => {
  const cards = condition.toUpperCase();
  return cards;
};
