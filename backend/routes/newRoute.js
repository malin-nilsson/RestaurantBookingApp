const express = require("express");

//CONTROLLER FUNCTIONS
const {
  getNew,
  loginUser,
  signupUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getNew);

//LOGIN ROUTE
router.post("/login", loginUser);

//SIGNUP ROUTE
router.post("/signup", signupUser);

module.exports = router;
