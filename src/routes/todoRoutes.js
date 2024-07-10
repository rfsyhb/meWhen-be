const todoController = require('../controllers/todoController');
const verifyToken = require('../utils/auth');

module.exports = [
  {
    method: 'GET',
    path: '/todos',
    handler: todoController.getTodosByOwner,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'POST',
    path: '/todos/create',
    handler: todoController.createTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'PUT',
    path: '/todos/update/{id}',
    handler: todoController.updateTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
  {
    method: 'DELETE',
    path: '/todos/delete/{id}',
    handler: todoController.deleteTodo,
    options: {
      pre: [{ method: verifyToken }],
    },
  },
];
