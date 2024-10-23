import express from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors())

app.use('/apiAuth', router)


app.listen(3000, ()=>{
  console.log("Server running on port 3000")
})