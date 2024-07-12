/**
 * data   : id, name, username, password
 * flow   : model -> service -> controller -> routes
 * methods: register, login, getAll, getUserById
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

class User {
  constructor() {
    this.users = [
      {
        id: 'static-user-id-1',
        name: 'Rafi Syihab',
        username: 'rafi123',
        password: bcrypt.hashSync('password123', 10),
      },
      {
        id: 'static-user-id-2',
        name: 'John Doe',
        username: 'john123',
        password: bcrypt.hashSync('password123', 10),
      },
    ];
  }

  async register(data) {
    const { name, username, password } = data; // Destructuring data

    const isExist = this.users.find((user) => user.username === username);
    if (isExist) {
      return null;
    }

    const id = nanoid(16); // Generate random id
    const hashedPassword = bcrypt.hashSync(password, 10); // Hashing password

    // Create new user object
    const newUser = {
      id,
      name,
      username,
      password: hashedPassword,
    };

    this.users.push(newUser);
    return newUser; // Return new user object after success registration
  }

  async login(data) {
    const { username, password } = data; // Destructuring data

    const user = this.users.find((userData) => userData.username === username);
    if (!user) {
      return null;
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    const token = generateToken(user); // Generate token
    return token; // Return token after success login
  }

  getAll() {
    return this.users.map(({ password, ...user }) => user); // Return all users without password
  }

  getOwnProfile(id) {
    const user = this.users.find((userData) => userData.id === id);
    if (user) {
      const { password, ...filteredData } = user;
      return filteredData; // Return user data without password
    }

    return null;
  }
}

module.exports = new User();
