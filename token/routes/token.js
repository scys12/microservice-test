import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const routes = express.Router()

routes.post('/new-token', asyncHandler(async (req, res) => {
  const payload = req.body
  const secret = process.env.JWT_SECRET
  const options = {
    expiresIn: "30m"
  }
  const accessToken = jwt.sign(payload, secret, options)
  return res.status(200).send({
    message: 'success',
    access_token: accessToken
  })
}))

routes.post('/refresh-token', asyncHandler(async (req, res) => {
  
}))

export default routes