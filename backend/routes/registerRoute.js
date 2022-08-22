const express = require("express");
const jwt = require("jsonwebtoken");

const utils = require("../utils/utils.js");

const AdminModel = require("../models/adminModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(200);
});

router.post("/", async (req, res) => {
  const { username, pwd, confirmPwd, type } = req.body;
  AdminModel.findOne({ username }, async (err, admin) => {
    if (admin) {
      res.render("", {
        error: "Username not available!",
      });
    } else if (pwd.length <= 4) {
      res.render("", {
        error: "Password must be at least 4 characters long",
      });
    } else if (pwd !== confirmPwd) {
      res.render("", { error: "Passwords does not match!" });
    } else {
      const newAdmin = new AdminModel({
        username,
        password: utils.hashedPwd(pwd),
        type,
      });
      await newAdmin.save();
    }
  });
});
