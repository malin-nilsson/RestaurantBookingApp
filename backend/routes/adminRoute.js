const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getAdminMain,
  getRegisterAdmin,
  registerAdmin,
  loginAdmin,
  // getAdminStart,
} = require("../controllers/adminController.js");

router.get("/", getAdminMain);

router.post("/", loginAdmin);

router.get("/register", getRegisterAdmin);

router.post("/register", registerAdmin);

// router.get("/start", getAdminStart);

module.exports = router;
