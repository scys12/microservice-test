import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser());
const PORT = process.env.PORT || 8079
app.listen(PORT, () => console.log(`Server started in ${ENV} mode on port ${PORT}`));