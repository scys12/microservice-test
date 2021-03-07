const errorHandler = function(err, req, res, next) {
  const ret = err.response.data;
  res.
    status(err.response.status || 500).
    send(ret);
};

const successResponse = function(res, statusCode, body) {
  res.status(statusCode).send(body)
}

export {
  errorHandler,
  successResponse
}