const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, jwtSecret, (err, user) => {
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};