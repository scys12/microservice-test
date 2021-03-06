import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints'
import moduleName from 'requ'
import axios from 'axios'

const app = express()
app.post('/register', asyncHandler(async (req, res) => {  
  const userRegister = await axios.post(endpoints.registerUrl, req.body)
  console.log(userRegister)
}))