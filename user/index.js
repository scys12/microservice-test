import express from 'express'
import dotenv from 'dotenv'
import connectToMongo from './config/db.js'
import userRoutes from './routes/users.js'
dotenv.config()

connectToMongo()

const app = express()

app.use(express.json())
app.use('/users', userRoutes);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));