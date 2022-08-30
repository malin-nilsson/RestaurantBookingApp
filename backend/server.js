require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const bookingRoutes = require("./routes/bookingsRoute");
const guestRoutes = require("./routes/guestRoute");
const adminRoutes = require("./routes/adminRoute");
const registerRoutes = require("./routes/registerRoute");

const Reservations = require("./models/reservationModel");

// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.SECRET)) {
    const tokenData = jwt.decode(token, process.env.SECRET);
    res.locals.loginInfo =
      tokenData.username + " " + tokenData.userId + " " + tokenData.role;
    res.locals.loginUser = tokenData.username;
    res.locals.loginId = tokenData.userId;
    res.locals.isLoggedIn = true;
  } else {
    res.locals.loginInfo = "not logged in";
    res.locals.isLoggedIn = false;
  }
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("200");
});

app.use("/bookings", bookingRoutes);
app.use("/guest", guestRoutes);
app.use("/admin", adminRoutes);
app.use("/register", registerRoutes);

// app.post("/send_mail", async (req, res) => {
//   let { email } = req.body;
//   const transport = nodemailer.createTransport({
//     secure: false,
//     host: process.env.MAIL_HOST,
//     port: process.env.MAIL_PORT,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },

//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   await transport.sendMail({
//     from: process.env.MAIL_FROM,
//     to: email,
//     subject: "test email",
//     html: "Din reservation är bekräftad",
//   });
// });

// app.get("/booking_cancelation/:id", async (req, res) => {
//   const bookings = await Reservations.findOne({
//     guestEmail: "greger@hotmail.com",
//   });
//   res.send(bookings._id);
// });

app.get("/booking_cancelation/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Reservations.findById(id).deleteOne();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.redirect("http://localhost:3000");
});

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
