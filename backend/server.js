require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const bookingRoutes = require("./routes/bookingsRoute");
const guestRoutes = require("./routes/guestRoute");
const adminRoutes = require("./routes/adminRoute");
const { protect } = require("./middleware/authMiddleware");

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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
