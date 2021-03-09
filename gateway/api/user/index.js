import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints.js'
import axios from 'axios'
import { auth, isAdmin, notAuth, successResponse } from '../../middleware/index.js'

const userApi = express.Router()
userApi.post('/register', auth, isAdmin, asyncHandler(async (req, res) => {  
  const userRegister = await axios.post(endpoints.registerUrl, req.body)
  successResponse(res, userRegister.status, userRegister.data)  
}))

userApi.post('/login', notAuth, asyncHandler(async (req, res) => {
  const userLogin = await axios.post(endpoints.loginUrl, req.body)
  const user = userLogin.data;
  const token = await axios.post(endpoints.newTokenUrl, user)
  res.cookie('token', token.data.access_token, {
    maxAge: 300000 /* 5 minutes*/,
    httpOnly: true
  })
  res.cookie('reftoken', token.data.refresh_token, {
    maxAge: 604800000 /* 7 days*/,
    httpOnly: true
  })
  successResponse(res, token.status, token.data)
}))

userApi.get('/me', auth, asyncHandler( async (req, res) => {
  const paramsId = req.user._id
  const user = await axios.get(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

userApi.post('/logout', auth, asyncHandler( async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('reftoken');
  successResponse(res, 200, {message: 'Successfully logout'})
}))

userApi.get('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.get(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

userApi.get('/', auth, isAdmin, asyncHandler(async (req, res) => {
  const user = await axios.get(`${endpoints.userUrl}`)
  successResponse(res, user.status, user.data)
}))

userApi.put('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.put(`${endpoints.userUrl}${paramsId}`, req.body)
  successResponse(res, user.status, user.data)
}))

userApi.delete('/:id', auth, isAdmin, asyncHandler(async (req, res) => {
  const paramsId = req.params.id
  const user = await axios.delete(`${endpoints.userUrl}${paramsId}`)
  successResponse(res, user.status, user.data)
}))

export default userApi