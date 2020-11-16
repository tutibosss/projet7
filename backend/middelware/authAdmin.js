const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const header = JSON.parse(req.headers.authorization)
    const token = header.Token
    const decodedToken = jwt.verify(token, process.env.DB_token);
    const userId = decodedToken.userId;
    const admin = decodedToken.admin

    console.log(userId, admin)

    if (req.body.userId && req.body.userId !== userId && !admin) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};