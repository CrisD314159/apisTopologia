import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/routes.js';

dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())

app.use('/epa', router)

app.listen(8000, ()=>{
  console.log("Server running on port 8000")
})