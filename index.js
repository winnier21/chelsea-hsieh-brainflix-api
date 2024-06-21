import express from "express"
import 'dotenv/config'
import cors from 'cors'
import route from './routes/videos.js'

const app = express()


app.use(express.json())
const CORS_ORIGIN = process.env.CROSS_ORIGIN || 'http://localhost:5174';
app.use(cors({ origin: CORS_ORIGIN }));
app.use('/videos', route)
app.use(express.static('public'))

const PORT = process.env.PORT || 8082
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})