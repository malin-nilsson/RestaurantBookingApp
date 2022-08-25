const express = require("express");

const {
  getAdminMain,
  getRegisterAdmin,
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController.js");

const router = express.Router();

router.get("/", getAdminMain);

router.post("/", loginAdmin);

router.get("/register", getRegisterAdmin);

router.post("/register", registerAdmin);

// /:id behöver läggas till, dvs. admin page där hen ser bokningarna

module.exports = router;
