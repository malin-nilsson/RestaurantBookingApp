const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");

const getAdmin = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

const saveAdmin = async (req, res) => {
  const { username, password, confirmPassword, role, secret } = req.body;

  try {
    const newAdmin = await AdminModel.create({
      username: username,
      password: utils.hashedPwd(password),
      role: role,
    });
    res.status(200).json(username);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAdmin, saveAdmin };
