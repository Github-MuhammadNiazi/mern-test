const { generateToken } = require('../helper/authHelper');
const { findUser } = require('../helper/userHelper');

const loginController = async (req, res) => {
  const { id } = req.body;
  const user = await findUser(id);
  if (!user) return res.status(401).json({ error: 'Invalid user' });
  const token = generateToken(user);
  res.json({ token });
};

module.exports = { loginController };
