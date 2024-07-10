const jwt = require('jsonwebtoken');
const serverInstance = require('./serverInstance');

// Middleware to verif token JWT
const verifyToken = (request, h) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return h
      .response({ message: 'Authorization header is required' })
      .code(401)
      .takeover();
  }

  const token = authorization.split(' ')[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.instanceId !== serverInstance.id) {
      return h
        .response({ message: 'Invalid token, instance diff' })
        .code(401)
        .takeover();
    }

    const currrentTime = Math.floor(Date.now() / 1000);
    if (currrentTime >= decoded.exp) {
      return h.response({ message: 'Token expired' }).code(401).takeover();
    }

    request.auth = { credentials: decoded };
    return h.continue; // Continue the request lifecycle if the token is valid and not expired
  } catch (error) {
    return h.response({ message: 'Invalid token' }).code(401).takeover();
  }
};

module.exports = verifyToken;
