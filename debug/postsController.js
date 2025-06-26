async function getSortedPosts(req, res) {
    const posts = await Posts.find(); // Mongoose model
    posts.sort((a, b) => b.created - a.created);
    res.json(posts);
}

// Proposed code with improvements
// async function getSortedPosts(req, res) {
//   try {
//     const page = parseInt(req.query.page) || 0;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = page * limit;
//     const posts = await Posts.find().sort({ created: -1 }).skip(skip).limit(limit).lean();
//     res.json(posts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
