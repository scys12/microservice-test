import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import routes from './routes/token.js'
import { errorHandler } from './middleware/index.js'

dotenv.config()

const app= express()
const { json } = bodyParser

app.use(json())
app.use(routes)
app.use(errorHandler)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));