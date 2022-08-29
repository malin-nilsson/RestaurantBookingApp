require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookiesMiddleware = require("universal-cookie-express");

const bookingRoutes = require("./routes/bookingsRoute");
const guestRoutes = require("./routes/guestRoute");
const adminRoutes = require("./routes/adminRoute");
const { protect } = require("./middleware/authMiddleware");

// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookiesMiddleware()).use((req, res, next) => {
  console.log(req.path, req.method);

  req.universalCookies.get("test");

  const { token } = req.cookies;
  if (token && jwt.verify(token, process.env.SECRET)) {
    const tokenData = jwt.decode(token, process.env.SECRET);
    res.locals.loggedIn = true;
    res.locals.id = tokenData.id;
  } else {
    res.locals.loggedIn = false;
  }
  next();
});

// if (token && jwt.verify(token, process.env.SECRET)) {
//   const tokenData = jwt.decode(token, process.env.SECRET);
//   res.locals.loginInfo =
//     tokenData.username + " " + tokenData.userId + " " + tokenData.role;
//   res.locals.loginUser = tokenData.username;
//   res.locals.loginId = tokenData.userId;
//   res.locals.isLoggedIn = true;
// } else {
//   res.locals.loginInfo = "not logged in";
//   res.locals.isLoggedIn = false;
// }
//   next();
// });

// ROUTES
app.get("/", (req, res) => {
  res.send("200");
});

app.use("/bookings", bookingRoutes);
app.use("/guest", guestRoutes);
app.use("/admin", adminRoutes);

// CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // LISTEN FOR REQUESTS
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port http://localhost:4000/");
    });
  })
  .catch((error) => {
    console.log(error);
  });
