import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userApi  from './api/user/index.js'
dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser());

app.use(userApi)

const PORT = process.env.PORT || 8080
const ENV = process.env.ENV
app.listen(PORT, () => console.log(`Server started in ${ENV} mode on port ${PORT}`));