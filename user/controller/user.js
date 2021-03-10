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
        role: user.role,
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
  const { name, email, password, role } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    throw new BadRequest("Email already exists")
  }
  const user = await User.create({
    name:name,
    email:email,
    password:password,
    role: role
  })
  if (user) {
    res.json({ message: "account successfully created"})
  }else{
    throw new BadRequest("Invalid request data")
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()){
    throw new BadRequest("Invalid Request Input",error.array())
  }
  const email = req.body.email, name = req.body.name;
  const data = {name: name}
  if (email) {
    data.email = email
    const userExists = await User.findOne({ email })
    if (userExists) {
      throw new BadRequest("Email already exists")
    }
  }
  const user = await User.findById(req.params.id).select('-password -__v');
  if (!user) {
    throw new NotFound("User not found")
  }
  user.set(data)
  await user.save()
  res.status(200).json(user)
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password -__v')
  res.json(users)
})

const getUser =  asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password -__v')
  if (user) {
    res.json(user)
  }else{
    throw new NotFound("User Not Found")
  }
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    throw new NotFound("User Not Found")
  }
  await user.delete()  
  res.json({ message: "account successfully deleted"})
})

export { 
  loginUser, 
  registerUser, 
  updateUser, 
  getAllUsers, 
  getUser, 
  deleteUser
}