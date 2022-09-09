const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getManage,
  getRegister,
} = require("../controllers/adminController.js");

const { checkAdmin } = require("../middleware/authMiddleware");

// CHECK FOR JWT
router.post("/", checkAdmin);

// // GET ADMINS
// router.get("/start", getManage);

// LOG IN ADMIN
router.post("/login", loginAdmin);

// POST REGISTER ADMIN
router.post("/register", registerAdmin);

// GET REGISTER ADMIN
router.get("/register", getRegister);

// GET ALL ADMINS
router.get("/manage", getManage);

// DELETE A ADMIN
router.post("/manage");

module.exports = router;
