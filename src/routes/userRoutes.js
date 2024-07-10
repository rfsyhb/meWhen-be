const userController = require('../controllers/userController');
const verifyToken = require('../utils/auth');

module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: userController.getUsers,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userController.getUserById,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'POST',
    path: '/users/register',
    handler: userController.registerUser,
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: userController.loginUser,
  },
];
