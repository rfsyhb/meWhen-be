/**
 * data   : id, name, username, password
 * flow   : model -> service -> controller -> routes
 * methods: register, login, getAll, getUserById
 */
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const supabase = require('../utils/supabaseClient');

class User {
  static async register(data) {
    const { name, username, password } = data; // Destructuring data

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    // Check if username already exist
    if (existingUser) {
      return null;
    }

    const id = nanoid(16); // Generate random id
    const hashedPassword = bcrypt.hashSync(password, 10); // Hashing password

    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{ id, name, username, password: hashedPassword }])
      .single()
      .select();

    // catch error if exist
    if (insertError) {
      throw new Error(insertError.message);
    }

    return newUser; // Return new user object after success registration
  }

  static async login(data) {
    const { username, password } = data; // Destructuring data

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

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

  static async getAll() {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, username');

    if (error) {
      throw new Error(error.message);
    }

    return users; // Return all users data
  }

  static async getOwnProfile(id) {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, username')
      .eq('id', id)
      .single();

    if (error) {
      return null;
    }

    return user;
  }
}

module.exports = User;
