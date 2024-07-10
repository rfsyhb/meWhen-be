/**
 * data   : id, ownerId, title, completed
 * flow   : model -> service -> controller -> routes
 * method : getAllByOwner, create, update, delete
 */
const { nanoid } = require('nanoid');

class Todo {
  constructor() {
    this.todos = [
      {
        id: 'static-id-1',
        ownerId: 'static-user-id-1',
        title: 'Learn Node.js',
        completed: false,
      },
      {
        id: 'static-id-2',
        ownerId: 'static-user-id-2',
        title: 'Learn Hapi.js',
        completed: true,
      },
      {
        id: 'static-id-3',
        ownerId: 'static-user-id-2',
        title: 'Learn Express.js',
        completed: true,
      },
    ];
  }

  getAllByOwner(ownerId) {
    return this.todos.filter((todo) => todo.ownerId === ownerId); // retrieve all todos by ownerId
  }

  create(data) {
    const { title, ownerId } = data;
    const id = nanoid(16);
    const completed = false;

    const newTodo = { id, ownerId, title, completed };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id, data) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return null;
    }

    this.todos[index] = { ...this.todos[index], ...data };
    return this.todos[index];
  }

  delete(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);

    if (index !== -1) {
      return this.todos.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = new Todo();