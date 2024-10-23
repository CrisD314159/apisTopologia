import postgres from "postgres";
import dotenv from 'dotenv'
dotenv.config()

const db = postgres({
  host:process.env.DB_HOST,
  password:process.env.DB_PASS,
  username:process.env.DB_USER,
  database:process.env.DB_NAME,
  port:5432,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function getUser(email){
  try {
    const user = await db`SELECT * FROM Usuario WHERE email = ${email}`;
    return user[0];
    
  } catch (error) {
    throw new Error(error.message);
    
  }
  
}