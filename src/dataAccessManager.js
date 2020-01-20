const dal = require('./dataAccessLayer');

module.exports = {
  createUser: (data) => dal.create('users', data),
  readUser: (id) => dal.read('users', id),
  updateUser: (data) => dal.update('users', data),
  deleteUser: (id) => dal.delete('users', id),
  getAllUsers: () => dal.getAll('users'),

  createForum: (data) => dal.create('forums', data),
  readForum: (id) => dal.read('forums', id),
  updateForum: (data) => dal.update('forums', data),
  deleteForum: (id) => dal.delete('forums', id),
  getAllForums: () => dal.getAll('forums'),

  createMessage: (data) => dal.create('messages', data),
  readMessage: (id) => dal.read('messages', id),
  updateMessage: (data) => dal.update('messages', data),
  deleteMessage: (id) => dal.delete('messages', id),
  getAllMessages: () => dal.getAll('messages'),
};
