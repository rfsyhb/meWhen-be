/**
 * data   : id, ownerId, title, completed
 * flow   : model -> service -> controller -> routes
 * method : getAllByOwner, create, update, delete
 */
const { nanoid } = require('nanoid');
const supabase = require('../utils/supabaseClient');

class Todo {
  static async getAllByOwner(ownerId) {
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*')
      .eq('owner_id', ownerId);

    if (error) {
      throw new Error(error.message);
    }

    return todos; // retrieve all todos by ownerId
  }

  static async create(data) {
    const { title, ownerId } = data;
    const id = nanoid(16);
    const completed = false;

    const { data: newTodo, error } = await supabase
      .from('todos')
      .insert([{ id, owner_id: ownerId, title, completed }])
      .single()
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return newTodo;
  }

  static async update(id, data) {
    const { data: updatedTodo, error } = await supabase
      .from('todos')
      .update(data)
      .eq('id', id)
      .single()
      .select();

    if (error) {
      throw new Error(error.message);
    }

    if (!updatedTodo) {
      return null; // No rows were updated, meaning the todo with the given id does not exist
    }

    return updatedTodo;
  }

  static async delete(id) {
    const { data: deletedTodo, error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .single()
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return deletedTodo;
  }
}

module.exports = Todo;
