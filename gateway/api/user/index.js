import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints.js'
import axios from 'axios'
import { successResponse } from '../middleware/index.js'

const userApi = express.Router()
userApi.post('/register', asyncHandler(async (req, res) => {  
  const userRegister = await axios.post(endpoints.registerUrl, req.body)
  successResponse(res, userRegister.status, userRegister.data)  
}))

export default userApi