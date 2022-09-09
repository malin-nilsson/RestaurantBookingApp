const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getManage,
  getRegister,
  deleteAdmin,
  changeRole,
} = require("../controllers/adminController.js");

const { checkAdmin } = require("../middleware/authMiddleware");
const adminModel = require("../models/adminModel.js");

// DECODE JWT
router.post("/", checkAdmin);

// LOG IN ADMIN
router.post("/login", loginAdmin);

// POST REGISTER ADMIN
router.post("/register", registerAdmin);

// GET REGISTER ADMIN
router.get("/register", getRegister);

// GET ALL ADMINS
router.get("/manage", getManage);

// DELETE A ADMIN
router.delete("/manage", deleteAdmin);

// CHANGE ROLE
router.post("/manage", changeRole);

module.exports = router;
