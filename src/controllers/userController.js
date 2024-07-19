const userService = require('../services/userService');

exports.registerUser = async (request, h) => {
  try {
    const newUser = await userService.registerUser(request.payload);
    if (newUser) {
      return h
        .response({
          status: 'success',
          message: 'User registered successfully',
          data: { userId: newUser.id },
        })
        .code(201)
        .type('application/json');
    }
    return h
      .response({ status: 'fail', message: 'Username already exist' })
      .code(400)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.loginUser = async (request, h) => {
  try {
    const token = await userService.loginUser(request.payload);
    if (token) {
      return h
        .response({
          status: 'success',
          message: 'User logged in successfully',
          data: { token },
        })
        .code(200)
        .type('application/json');
    }
    return h
      .response({ status: 'fail', message: 'Invalid username or password' })
      .code(400)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.getUsers = async (request, h) => {
  try {
    const users = await userService.getUsers();
    return h
      .response({ status: 'success', message: 'ok', data: { users } })
      .code(200)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.getOwnProfile = async (request, h) => {
  const { id: ownerId } = request.auth.credentials;
  try {
    const user = await userService.getOwnProfile(ownerId);
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
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};
