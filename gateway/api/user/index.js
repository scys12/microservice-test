import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints.js'
import axios from 'axios'
import { auth, successResponse } from '../middleware/index.js'

const userApi = express.Router()
userApi.post('/register', auth, asyncHandler(async (req, res) => {  
  const userRegister = await axios.post(endpoints.registerUrl, req.body)
  successResponse(res, userRegister.status, userRegister.data)  
}))

userApi.post('/login', asyncHandler(async (req, res) => {
  const userLogin = await axios.post(endpoints.loginUrl, req.body)
  const user = userLogin.data;
  const token = await axios.post(endpoints.newTokenUrl, user)
  res.cookie('token', token.data.access_token, {
    maxAge: 1800,
    httpOnly: true
  })
  successResponse(res, token.status, token.data)
}))

userApi.get('/:id', auth, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.get(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

userApi.get('/', auth, asyncHandler(async (req, res) => {
  const user = await axios.get(`${endpoints.userUrl}`)
  successResponse(res, user.status, user.data)
}))

userApi.put('/:id', auth, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.put(`${endpoints.userUrl}${paramsId}`, req.body)
  successResponse(res, user.status, user.data)
}))

userApi.delete('/:id', auth, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.delete(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

userApi.get('/me', auth, asyncHandler( async (req, res) => {
  const paramsId = req.user._id
  const user = await axios.get(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

export default userApi