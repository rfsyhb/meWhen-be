const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const routes = [
  ...userRoutes,
  ...todoRoutes,
];

module.exports = routes;