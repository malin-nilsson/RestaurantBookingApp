const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const hashedPwd = (password) => {
  const hash = bcrypt.hashSync(password, 8);
  return hash;
};

const comparePassword = (password, hash) => {
  const correct = bcrypt.compareSync(password, hash);
  return correct;
};

const adminAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.SECRET)) {
    const tokenData = jwt.decode(token, process.env.SECRET);
    if (tokenData.role !== "admin") {
      res.send("Unauthorized");
    } else {
      next();
    }
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  hashedPwd,
  comparePassword,
  adminAuth,
};
