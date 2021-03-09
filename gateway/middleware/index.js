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

const authRefresh = function (req, res, next) {
  const reftoken = req.cookies.reftoken
  const token = req.cookies.token
  if (!reftoken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  if (token) {
    return res.status(400).json({ message: 'User has been authenticated' });    
  }
  next()
}

const notAuth = function (req, res, next) {
  const token = req.cookies.token
  if (token) {
    return res.status(400).json({ message: 'User has been authenticated' });
  }
  next()
}

const auth = function(req, res, next) {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ message: 'Server Error' });
  }
};

const isAdmin = function (req, res, next) {
  if(req.user.role != "admin"){
    return res.status(401).json({ message: 'Not authorized request' });
  }
  return next();
}

export {
  errorHandler,
  successResponse,
  auth,
  isAdmin,
  notAuth,
  authRefresh,
}