const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController.js");

const { checkAdmin } = require("../middleware/authMiddleware");

// CHECK FOR JWT
router.post("/admin/start", checkAdmin);

// LOG IN ADMIN
router.post("/", loginAdmin);

// REGISTER ADMIN
router.post("/register", registerAdmin);

router.get("/register", checkAdmin);

module.exports = router;
