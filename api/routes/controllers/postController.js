const deletePostController = (req, res) => {
  res.json({ message: `Post ${req.params.id} deleted by ${req.user.id}` });
};

module.exports = { deletePostController };
