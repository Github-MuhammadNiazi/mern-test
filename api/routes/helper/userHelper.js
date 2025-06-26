const { USERS } = require('../../constants');

function findUser(id) {
  return USERS.find(u => u.id === id);
}

module.exports = { findUser };
