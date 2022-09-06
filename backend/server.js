require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const bookingRoutes = require("./routes/bookingsRoute");
const guestRoutes = require("./routes/guestRoute");
const adminRoutes = require("./routes/adminRoute");

const Reservations = require("./models/reservationModel");

// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("200");
});

app.use("/bookings", bookingRoutes);
app.use("/guests", guestRoutes);
app.use("/admin", adminRoutes);

// app.delete("/booking_cancelation/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await Reservations.findById(id).deleteOne();
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
//   // res.redirect("http://localhost:3000");
//   res.sendStatus(200);
// });

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
