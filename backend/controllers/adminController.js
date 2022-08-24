const AdminModel = require("../models/adminModel");
const utils = require("../utils/utils");

const adminMain = async (req, res) => {
  const admins = await AdminModel.find();
  res.status(200).json(admins);
};

module.exports = { adminMain };
