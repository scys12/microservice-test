const errorHandler = (err, req, res, next) => {
  const statusCode = 500
  res.status(statusCode)
  res.json({message: 'Internal Server Error'})
}

export { errorHandler }