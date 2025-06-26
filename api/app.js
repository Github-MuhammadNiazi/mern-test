require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postRoutes');

const app = express();
app.use(express.json());

app.use('/login', authRoutes);
app.use('/posts', postsRoutes);

module.exports = app;

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
