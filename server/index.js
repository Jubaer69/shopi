import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './lib/db.js'
import BuyerRouter from './routes/buyer.router.js'
import AdminRouter from './routes/admin.router.js'

dotenv.config()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
const corsconfig = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}
app.use(cors(corsconfig))

const PORT = process.env.PORT || 4000;

app.get('/', (req,res) => {
    return res.send('this is my server')
})

app.use('/api/v4/buyer', BuyerRouter)
app.use('/api/v4/admin', AdminRouter)


app.listen(PORT, () => {
    connectDb()
    return console.log('the server is running successfully at '+PORT)
})
