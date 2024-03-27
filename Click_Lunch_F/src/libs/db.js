import { createPool } from "mysql2/promise";
export const conn = createPool({
  database: "clicklunch",
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
});