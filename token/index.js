import express from 'express'
import dotenv from 'dotenv'
import {json} from 'body-parser'
import routes from './routes/token'

dotenv.config()

const app= express()

app.use(json())
app.use(routes)

const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));