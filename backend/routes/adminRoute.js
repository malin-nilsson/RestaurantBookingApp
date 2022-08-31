const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  // getAdminMain,
  // getRegisterAdmin,
  getAdminStart,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController.js");

const { checkAdmin } = require("../middleware/authMiddleware");

// router.get("/", getAdminMain);

router.post("/admin/start", checkAdmin);

router.post("/", loginAdmin);

// router.get("/register", getRegisterAdmin);

router.post("/register", registerAdmin);

router.get("/start", getAdminStart);

module.exports = router;
