import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config()

export const db = postgres({
  host:process.env.DB_HOST,
  password:process.env.DB_PASS,
  username:process.env.DB_USER,
  database:process.env.DB_NAME,
  port:5432,
  ssl: {
    rejectUnauthorized: false
  }
})