import mongoose from 'mongoose'
import AppError from "../errors/AppError.js"
import BadRequest from '../errors/BadRequest.js'

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500
  res.status(statusCode)
  if (err instanceof AppError) {
    res.json(err.response())
  }else{
    res.json({message: 'Internal Server Error'})
  }
}

const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    throw new BadRequest('Invalid ID')
  next();
};


export { errorHandler, checkObjectId }