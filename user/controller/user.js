import asyncHandler from "express-async-handler"
import { validationResult } from "express-validator"
import BadRequest from "../errors/BadRequest.js"
import NotFound from "../errors/NotFound.js"
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

const updateUser = asyncHandler(async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()){
    throw new BadRequest("Invalid Request Input",error.array())
  }
  const { name, email } = req.body
  
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.json(users)
})

const getUser =  asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')
  if (user) {
    res.json(user)
  }else{
    throw new NotFound("User Not Found")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  
})

export { 
  loginUser, 
  registerUser, 
  updateUser, 
  getAllUsers, 
  getUser, 
  deleteUser 
}