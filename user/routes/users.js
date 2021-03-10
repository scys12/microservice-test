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
import { checkObjectId } from '../middleware/index.js'

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
  check('role', 'Please enter the right role').isIn(['admin', 'user']),
  registerUser
)

router.get(
  '/',
  getAllUsers
)

router.route('/:id')
  .get(
    checkObjectId('id'),
    getUser
  )
  .put(
    checkObjectId('id'),
    check('name', 'Name is required').isLength({ min: 6}),
    updateUser
  )
  .delete(
    checkObjectId('id'),
    deleteUser
  )

export default router