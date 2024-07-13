const jwt = require('jsonwebtoken');
const serverInstance = require('./serverInstance');

const generateToken = (user) => {
  if (!user || !user.id) {
    return null;
  }

  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
    instanceId: serverInstance.id,
    iat: Math.floor(Date.now() / 1000), // is used to determine the time at which a JWT was created
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // updated to 24 hours (60 seconds * 60 minutes * 24 hours)
    // exp: Math.floor(Date.now() / 1000) + 60 * 60, // is used to determine the time at which a JWT becomes invalid (60 seconds * 60 minutes = 1 hour)
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS256' });
};

module.exports = generateToken;
