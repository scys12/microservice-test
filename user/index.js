import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/db.js'
import userRoutes from './routes/users.js'
import {errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectToMongo()

const app = express()

app.use(express.json())
app.use(userRoutes);

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));