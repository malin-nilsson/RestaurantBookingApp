const express = require("express");
const jwt = require("jsonwebtoken");

const utils = require("../utils/utils.js");

const AdminModel = require("../models/adminModel");
const ReservationModel = require("../models/reservationModel");

const router = express.Router();

// router.get("/:id", utils.adminAuth, async (req, res) => {
//   const admin = await AdminModel.findById();
//   const { token } = req.cookies;
//   if (token && jwt.verify(token, process.env.SECRET)) {
//     res.send(200, { admin });
//   } else {
//     res.send(401, "Unauthorized");
//   }
// });

router.get("/", (req, res) => {
  res.send([
    {
      username: "oskar",
      password: "oskar",
      role: "admin",
    },
  ]);
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

// router.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   AdminModel.findOne({ username }, (err, admin) => {
//     if (admin && utils.comparePassword(password, admin.password)) {
//       const adminData = { userId: admin._id, username, type: admin.type };
//       const accessToken = jwt.sign(userData, process.env.SECRET);
//       res.cookie("token", accessToken);

//       res.redirect("/");
//     } else {
//       res.render("", { error: "Failed to login!" });
//     }
//   });
// });

router.get("/bookings", utils.adminAuth, async (req, res) => {
  const bookings = await BookingModel.find().lean();

  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.SECRET)) {
    res.send(200, { bookings });
  } else {
    res.send(401, "Unauthorized");
  }
});

router.post("/api/log-out", (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/");
});

// router.get("/bookings/create", utils.adminAuth, async (req, res) => {
//   const admin = await AdminModel.findById();
//   const { token } = req.cookies;
//   if (token && jwt.verify(token, process.env.SECRET)) {
//     res.send(200, { admin });
//   } else {
//     res.send(401, "Unauthorized");
//   }
// });

router.get("/bookings/create", utils.adminAuth, async (req, res) => {
  const bookings = await BookingModel.find().lean();

  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.SECRET)) {
    res.send(200, { bookings });
  } else {
    res.send(401, "Unauthorized");
  }
});

module.exports = router;
