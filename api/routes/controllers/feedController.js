// Simulated posts data since there was no requirement added in the assessment file
const posts = [
  { id: '1', content: 'Hello world!', author: 'u1', createdAt: new Date().toISOString() },
  { id: '2', content: 'Another post', author: 'u2', createdAt: new Date().toISOString() },
  { id: '3', content: 'Yet another post', author: 'u1', createdAt: new Date().toISOString() },
  { id: '4', content: 'Post from admin', author: 'u2', createdAt: new Date().toISOString() },
  { id: '5', content: 'User post', author: 'u1', createdAt: new Date().toISOString() },
  { id: '6', content: 'Admin post again', author: 'u2', createdAt: new Date().toISOString() },
  { id: '7', content: 'Final post for testing', author: 'u1', createdAt: new Date().toISOString() },
  { id: '8', content: 'Last post', author: 'u2', createdAt: new Date().toISOString() },
  { id: '9', content: 'Post number nine', author: 'u1', createdAt: new Date().toISOString() },
  { id: '10', content: 'Post number ten', author: 'u2', createdAt: new Date().toISOString() }
];

exports.feedController = (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const start = page * limit;
  const end = start + limit;
  const pagedPosts = posts.slice(start, end);
  res.json(pagedPosts);
};
