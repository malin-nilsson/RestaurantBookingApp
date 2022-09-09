const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminModel");

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const admin = await AdminModel.findById(decodedToken.id);
        if (admin.role === "admin")
          res.json({ status: true, admin: admin.email, role: admin.role });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports = { checkAdmin };
