const express = require("express");
const utils = require("../utils/utils.js");
const jwt = require("jsonwebtoken");

const AdminModel = require("../models/adminModel.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(200);
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  AdminModel.findOne({ username }, (err, admin) => {
    if (admin && utils.comparePassword(password, admin.password)) {
      const adminData = {
        adminId: admin._id,
        username,
        role: admin.role,
      };
      const accessToken = jwt.sign(adminData, process.env.SECRET);

      res.cookie("token", accessToken);
      res.redirect("/api/admin");
    } else {
      res.send("Failed to login!");
    }
  });
});
