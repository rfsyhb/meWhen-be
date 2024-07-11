const Todo = require('../models/todoModel');

exports.getTodosByOwner = (ownerId) => Todo.getAllByOwner(ownerId);
exports.createTodo = (data) => Todo.create(data);
exports.updateTodo = (id, data) => Todo.update(id, data);
exports.deleteTodo = (id) => Todo.delete(id);
