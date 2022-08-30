const Booking = require("../models/bookingModel");
const Reservations = require("../models/reservationModel");
const nodemailer = require("nodemailer");

// GET ALL BOOKINGS
const getBookings = async (req, res) => {
  const bookings = await Reservations.find();
  res.status(200).json(bookings);
};

// SAVE BOOKING
const saveBooking = async (req, res) => {
  const { date, time, amount, message, guestName, guestEmail, guestPhone } =
    req.body;

  // Add doc to db
  try {
    const newBooking = await Reservations.create({
      date: date,
      time: time,
      amount: amount,
      message: message,
      guestName: guestName,
      guestEmail: guestEmail,
      guestPhone: guestPhone,
    });
    res.status(200).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// EDIT BOOKING
const editBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Reservations.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        date: req.body.date,
        time: req.body.time,
        amount: req.body.amount,
        message: req.body.message,
        guestName: req.body.guestName,
        guestEmail: req.body.guestEmail,
        guestPhone: req.body.guestPhone,
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Reservations.findById(id).deleteOne();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// SEND CONFIRMATION MAIL //
const sendConfirmation = async (req, res) => {
  let { email } = req.body;
  const getId = await Reservations.findOne({ guestEmail: email });
  const id = getId.id;

  const transport = nodemailer.createTransport({
    secure: false,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Your reservation at La Mère has been confirmed",
    html:
      '<p>Click <a href="http://localhost:3000/booking_cancelation/' +
      id +
      '">here</a> to reset your password</p>',
  });
};

const userCancel = async (req, res) => {
  res.send(200);
};

module.exports = {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  sendConfirmation,
  userCancel,
};
