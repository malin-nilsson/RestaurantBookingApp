const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const regexPassword =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

const comparePwd = (password, hash) => {
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
  comparePwd,
  adminAuth,
};
