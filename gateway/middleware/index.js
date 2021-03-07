import jwt from 'jsonwebtoken'

const errorHandler = function(err, req, res, next) {
  const ret = err.response.data || { message: "Internal Server Error"};
  res.
    status(err.response.status || 500).
    send(ret);
};

const successResponse = function(res, statusCode, body) {
  res.status(statusCode).send(body)
}

const auth = function(req, res, next) {
  const token = req.cookies.token;
  console.log(req.cookies)
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};

export {
  errorHandler,
  successResponse,
  auth,
}