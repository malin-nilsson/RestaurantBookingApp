const express = require("express");

const { saveAdmin, getAdmin } = require("../controllers/registerController");

const router = express.Router();

router.get("/", getAdmin);
router.post("/", saveAdmin);

module.exports = router;

// router.post("/", async (req, res) => {
//   const { username, pwd, confirmPwd, type } = req.body;
//   AdminModel.findOne({ username }, async (err, admin) => {
//     if (admin) {
//       res.send("", {
//         error: "Username not available!",
//       });
//     } else if (pwd.length <= 4) {
//       res.send("", {
//         error: "Password must be at least 4 characters long",
//       });
//     } else if (pwd !== confirmPwd) {
//       res.send("", { error: "Passwords does not match!" });
//     } else {
//       const newAdmin = new AdminModel({
//         username,
//         password: utils.hashedPwd(pwd),
//         type,
//       });
//       await saveAdmin(newAdmin);
//     }
//   });
// });
