const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config");

const users = [
  {
    id: 1,
    username: "test",
    password: "password",
  },
];

const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  res.json({ token });
};

module.exports = {
  login,
};
