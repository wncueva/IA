import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

