const todoService = require('../services/todoService');

exports.getTodosByOwner = (request, h) => {
  const { id: ownerId } = request.auth.credentials;
  const todos = todoService.getTodosByOwner(ownerId);
  return h
    .response({ status: 'success', message: 'ok', data: { todos } })
    .code(200)
    .type('application/json');
};

exports.createTodo = (request, h) => {
  const { id: ownerId } = request.auth.credentials;
  const data = { ...request.payload, ownerId }; // Add ownerId to payload
  const newTodo = todoService.createTodo(data);
  return h
    .response({ status: 'success', message: 'Todo created', data: { newTodo } })
    .code(201)
    .type('application/json');
};

exports.updateTodo = (request, h) => {
  const { id } = request.params.id;
  const data = request.payload;
  const updatedTodo = todoService.updateTodo(id, data);
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
};

exports.deleteTodo = (request, h) => {
  const { id } = request.params.id;
  const deletedTodo = todoService.deleteTodo(id);
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
};
