import AppError from "../errors/AppError.js"

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  if (err instanceof AppError) {
    res.json(err.response())
  }else{
    res.json({message: 'Internal Server Error'})
  }
}

export { errorHandler }