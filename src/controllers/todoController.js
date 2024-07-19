const todoService = require('../services/todoService');

exports.getTodosByOwner = async (request, h) => {
  const { id: ownerId } = request.auth.credentials;
  try {
    const todos = await todoService.getTodosByOwner(ownerId);
    return h
      .response({ status: 'success', message: 'ok', data: { todos } })
      .code(200)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.createTodo = async (request, h) => {
  const { id: ownerId } = request.auth.credentials;
  const data = { ...request.payload, ownerId }; // Add ownerId to payload
  try {
    const newTodo = await todoService.createTodo(data);
    return h
      .response({
        status: 'success',
        message: 'Todo created',
        data: { newTodo },
      })
      .code(201)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.updateTodo = async (request, h) => {
  const { id } = request.params;
  const data = request.payload;
  try {
    const updatedTodo = await todoService.updateTodo(id, data);
    if (updatedTodo) {
      return h
        .response({
          status: 'success',
          message: 'Todo updated',
          data: { updatedTodo },
        })
        .code(200)
        .type('application/json');
    }
    return h
      .response({ status: 'fail', message: 'Todo not found' })
      .code(404)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};

exports.deleteTodo = async (request, h) => {
  const { id } = request.params;
  try {
    const deletedTodo = await todoService.deleteTodo(id);
    if (deletedTodo) {
      return h
        .response({
          status: 'success',
          message: 'Todo deleted',
          data: { deletedTodo },
        })
        .code(200)
        .type('application/json');
    }
    return h
      .response({ status: 'fail', message: 'Todo not found' })
      .code(404)
      .type('application/json');
  } catch (error) {
    return h
      .response({ status: 'error', message: error.message })
      .code(500)
      .type('application/json');
  }
};
