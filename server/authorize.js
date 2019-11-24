const jwt = require('jsonwebtoken');

function authorize(req, res, next) {
  const token = req.cookies['auth-token'];
  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Authentication is required.'
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      error: 'Unauthorized',
      message: 'Invalid Token'
    });
  }

}

module.exports = authorize;
