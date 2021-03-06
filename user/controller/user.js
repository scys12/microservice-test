import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import BadRequest from "../errors/BadRequest.js"
import User from '../models/user.js'

const loginUser = asyncHandler(async (req, res) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      throw new BadRequest("Invalid Request Input",error.array())
    }
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,        
      })
    } else {
      throw new BadRequest("Email/Password is wrong");
    }
})

const registerUser = asyncHandler(async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()){
    throw new BadRequest("Invalid Request Input",error.array())
  }
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new BadRequest("Email already exists")
  }
  const user = await User.create({
    name:name,
    email:email,
    password:password,
    role: 'user'
  })
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  }else{
    throw new BadRequest("Invalid request data")
  }
})

export { loginUser, registerUser }