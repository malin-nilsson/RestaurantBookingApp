const express = require("express");

const {
  getAdminMain,
  getRegisterAdmin,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/", getAdminMain);

router.get("/register", getRegisterAdmin);

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

// router.get("/:id", adminMain);

// Sätt adminMain till /:id, skapa därefter / (dvs localhost:3000/admin som en login)
// Skapa också en admin/register sida

module.exports = router;
