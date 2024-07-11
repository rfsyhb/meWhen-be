const User = require('../models/userModel');

exports.registerUser = (data) => User.register(data);
exports.loginUser = (data) => User.login(data);
exports.getUsers = () => User.getAll();
exports.getUserById = (id) => User.getUserById(id);
