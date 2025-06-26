// users
{
  _id: ObjectId,
  name: String,
  role: String, // 'user' or 'admin'
  joined: Date
}

// follows
{
  follower: ObjectId, // user _id
  following: ObjectId
}

// posts
{
  _id: ObjectId,
  author: ObjectId, // user _id
  content: String,
  created: Date
}
