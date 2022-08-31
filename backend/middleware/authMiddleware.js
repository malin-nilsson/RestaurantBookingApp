const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AdminModel = require("../models/adminModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log(token);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // GET TOKEN FROM HEADER
      token = req.headers.authorization.split(" ")[1];

      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(token);

      // GET ADMIN FROM TOKEN
      req.admin = await AdminModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, missing token!");
  }
});

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const admin = await AdminModel.findById(decodedToken.id);
        if (admin) res.json({ status: true, admin: admin.email });
        else res.json({ status: false });
        next();
      }
    });
  } else {
    res.json({ status: false });
    next();
  }
};

module.exports = { protect, checkAdmin };
