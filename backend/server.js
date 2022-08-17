require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookingRoutes = require("./routes/bookings");
const guestRoutes = require("./routes/guest");
// EXPRESS APP
const app = express();

// MIDDLEWARE
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.get("/", (req, res) => {
  res.send("200");
});
app.use("/api/booking", bookingRoutes);
app.use("/api/guest", guestRoutes);

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
