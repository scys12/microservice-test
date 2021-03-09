import express from 'express'
import asyncHandler from 'express-async-handler'
import endpoints from '../endpoints.js'
import axios from 'axios'
import { authRefresh, successResponse } from '../../middleware/index.js'

const tokenApi = express.Router()
tokenApi.post('/refresh-token', authRefresh, asyncHandler(async (req, res) => {
  const token = {
    token: req.cookies.reftoken
  }
  const refreshToken = await axios.post(endpoints.refreshTokenUrl, token)
  res.cookie('token', refreshToken.data.access_token, {
    maxAge: 300000 /* 5 minutes*/,
    httpOnly: true
  })
  successResponse(res, refreshToken.status, refreshToken.data)
}))

export default tokenApi