const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'imf' && password === 'secret') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};