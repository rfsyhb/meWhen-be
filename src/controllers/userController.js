const userService = require('../services/userService');

exports.registerUser = async (request, h) => {
  const newUser = await userService.registerUser(request.payload);
  if (newUser) {
    return h
      .response({
        status: 'success',
        message: 'User created',
        data: { userId: newUser.id },
      })
      .code(201)
      .type('application/json');
  }
  return h
    .response({ status: 'fail', message: 'Username already exist' })
    .code(400)
    .type('application/json');
};

exports.loginUser = async (request, h) => {
  const token = await userService.loginUser(request.payload);
  if (token) {
    return h
      .response({
        status: 'success',
        message: 'Login successful',
        data: { token },
      })
      .code(200)
      .type('application/json');
  }
  return h
    .response({ status: 'fail', message: 'Invalid username or password' })
    .code(400)
    .type('application/json');
};

exports.getUsers = (request, h) => {
  const users = userService.getUsers();
  return h
    .response({ status: 'success', message: 'ok', data: { users } })
    .code(200)
    .type('application/json');
};

exports.getUserById = (request, h) => {
  const user = userService.getUserById(request.params.id);
  if (user) {
    return h
      .response({ status: 'success', message: 'ok', data: { user } })
      .code(200)
      .type('application/json');
  }
  return h
    .response({ status: 'fail', message: 'User not found' })
    .code(404)
    .type('application/json');
};
