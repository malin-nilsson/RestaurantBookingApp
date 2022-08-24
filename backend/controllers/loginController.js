const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");

const loginMain = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username }, (err, user) => {
    if (user && utils.comparePwd(password)) {
      const userData = {
        id: user._id,
        username: username,
        role: user.role,
      };
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);

      res.cookie("token", accessToken);
      res.redirect("/admin");
    } else {
      res.send("Login failed");
    }
  });
};

module.exports = { loginMain, loginAdmin };
