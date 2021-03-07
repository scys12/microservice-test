import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints.js'
import axios from 'axios'

const userApi = express()
userApi.post('/register', asyncHandler(async (req, res) => {  
  console.log(endpoints.registerUrl)
  const userRegister = await axios.post(endpoints.registerUrl, req.body)
}))

export default userApi