const _ = require('lodash');
const uuid = require('uuid/v4');
const storage = require('./fixtures.json');

module.exports = {
  create: (namespace, data) => {
    const newData = { id: uuid(), ...data };
    const { id } = newData;

    storage[namespace] = storage[namespace] || [];
    if (_.some(storage[namespace], { id })) {
      return null;
    }
    storage[namespace].push(newData);
    return newData;
  },
  read: (namespace, id) => {
    if (!storage[namespace]) {
      return null;
    }
    return _.find(storage[namespace], { id });
  },
  update: (namespace, data) => {
    const { id } = data;

    if (!storage[namespace]) {
      return null;
    }
    const index = _.findIndex(storage[namespace], (o) => o.id === id);

    if (index < 0) {
      return null;
    }
    storage[namespace][index] = data;
    return data;
  },
  delete: (namespace, id) => {
    if (!storage[namespace]) {
      return false;
    }
    const index = _.findIndex(storage[namespace], (o) => o.id === id);

    if (index < 0) {
      return false;
    }
    storage[namespace].splice(index, 1);
    return true;
  },
  getAll: (namespace) => storage[namespace] || [],
};
