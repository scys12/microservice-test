import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userApi  from './api/user/index.js'
import tokenApi  from './api/user/index.js'
import { errorHandler } from './api/middleware/index.js'
dotenv.config()

const app = express()
const { json } = bodyParser

app.use(json())
app.use(cookieParser());

app.use('/user', userApi)
app.use('/token', tokenApi)

app.use(errorHandler)

const PORT = process.env.PORT || 8080
const ENV = process.env.ENV
app.listen(PORT, () => console.log(`Server started in ${ENV} mode on port ${PORT}`));