const { generateToken } = require('../helper/authHelper');
const { findUser } = require('../helper/userHelper');

const loginController = (req, res) => {
  const { id } = req.body;
  const user = findUser(id);
  if (!user) return res.status(401).json({ error: 'Invalid user' });
  const token = generateToken(user);
  res.json({ token });
};

module.exports = { loginController };
