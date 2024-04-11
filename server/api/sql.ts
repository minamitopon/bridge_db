import mysql from "mysql2/promise";

export const dbConnection = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "pass",
  database: "boardDB",
  // namedPlaceholders: true,
});
