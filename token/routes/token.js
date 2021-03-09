import express from 'express'
import asyncHandler from 'express-async-handler'
import jwt, { decode } from 'jsonwebtoken'

const routes = express.Router()

routes.post('/new-token', asyncHandler(async (req, res) => {
  const payload = req.body
  const secret = process.env.JWT_SECRET
  const refreshSecret = process.env.JWT_REFRESH_SECRET
  console.log(refreshSecret)
  const options = {
    expiresIn: "5m"
  }
  const refreshOptions = {
    expiresIn: "7d"
  }
  const accessToken = jwt.sign(payload, secret, options)
  const refreshToken = jwt.sign(payload, refreshSecret, refreshOptions)
  return res.status(200).send({
    message: 'success',
    access_token: accessToken,
    refresh_token: refreshToken,
  })
}))

routes.post('/refresh-token', asyncHandler(async (req, res) => {
  const {token} = req.body
  try {
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Token is not valid' });
      } else {
        const secret = process.env.JWT_SECRET
        const {_id, name, email, role} = decoded
        const data = {
          _id, name, email, role
        }
        const accessToken = jwt.sign(data, secret, {
          expiresIn: "5m"
        });
        return res.json({access_token: accessToken})
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ message: 'Server Error' });
  }
}))

export default routes
