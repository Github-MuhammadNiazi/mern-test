const { connectDB } = require('../../db');
const { ObjectId } = require('mongodb');

async function findUser(id) {
  const db = await connectDB();
  // Try to convert id to ObjectId, fallback to string if invalid
  let query;
  try {
    query = { _id: new ObjectId(id) };
  } catch {
    query = { _id: id };
  }
  return db.collection('users').findOne(query);
}

module.exports = { findUser };
