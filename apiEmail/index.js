import express from 'express'
import cors from 'cors'
import { router } from './routes/routes.js'

const app =  express()
app.use(cors())
app.use(express.json())
app.use('/epa', router)

app.listen(4000, ()=>{
    console.log('Server running on port 4000')
})
