import express from 'express'
import { check } from 'express-validator'
import {
  loginUser, 
  registerUser, 
  updateUser, 
  deleteUser, 
  getUser, 
  getAllUsers 
} from '../controller/user.js'

const router = express.Router()

router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  loginUser
)

router.post(
  '/register',
  check('name', 'Name is required').isLength({ min: 6}),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  registerUser
)

router.get(
  '/',
  getAllUsers
)

router.route('/:id')
  .get(getUser)
  .put(
    check('name', 'Name is required').isLength({ min: 6}),
    check('email', 'Please include a valid email').isEmail(),    
    updateUser
  )
  .delete(deleteUser)

router.get('/ping', async (req, res) => res.send('pong'))

export default router