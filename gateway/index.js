import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userApi  from './api/user/index.js'
import tokenApi  from './api/token/index.js'
import { errorHandler } from './middleware/index.js'

dotenv.config()

const app = express()
const { json } = bodyParser

app.use(json())
app.use(cookieParser());

const routes = express.Router()
routes.use('/user', userApi)
routes.use('/token', tokenApi)

app.use('/api/v1', routes)

app.all('*', async (req , res) => { 
  return res.status(404).json({ message: 'Request not found' });
});

app.use(errorHandler)

const PORT = process.env.PORT || 8080
const ENV = process.env.ENV
app.listen(PORT, () => console.log(`Server started in ${ENV} mode on port ${PORT}`));