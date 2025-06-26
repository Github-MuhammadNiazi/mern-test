db.follows.aggregate([
  { $match: { follower: ObjectId("u1") } },
  {
    $lookup: {
      from: "posts",
      localField: "following",
      foreignField: "author",
      as: "posts"
    }
  },
  { $unwind: "$posts" },
  {
    $lookup: {
      from: "users",
      localField: "posts.author",
      foreignField: "_id",
      as: "authorInfo"
    }
  },
  { $unwind: "$authorInfo" },
  {
    $project: {
      content: "$posts.content",
      created: "$posts.created",
      authorName: "$authorInfo.name"
    }
  },
  { $sort: { created: -1 } },
  { $limit: 10 }
])
