require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // Middleware to log request details
  const timestamp = new Date().toISOString();
  const method = req.method;
  const endpoint = req.originalUrl;
  const body = Object.keys(req.body).length ? JSON.stringify(req.body) : '{}';
  const params = Object.keys(req.params).length ? JSON.stringify(req.params) : '{}';
  const query = Object.keys(req.query).length ? JSON.stringify(req.query) : '{}';
  console.log(`${timestamp} ${method} ${endpoint} body=${body} params=${params} query=${query}`);
  next();
});

app.use('/login', authRoutes);
app.use('/posts', postsRoutes);

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
