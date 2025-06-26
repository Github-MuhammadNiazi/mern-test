const { connectDB } = require('../../db');
const { ObjectId } = require('mongodb');

exports.feedController = async (req, res) => {
  try {
    const db = await connectDB();
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const follows = await db.collection('follows')
      .find({ follower: req.query.id })
      .toArray();
    const followingUserIds = follows.map(follow => follow.following);
    const posts = await db.collection('posts')
      .find({
        $or: [
          { author: req.query.id },
          { author: { $in: followingUserIds } }
        ]
      })
      .sort({ created: -1 })
      .skip(page * limit)
      .limit(limit)
      .toArray();
    res.json(posts);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
};
