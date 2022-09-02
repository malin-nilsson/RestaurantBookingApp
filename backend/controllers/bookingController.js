const Bookings = require("../models/bookingModel");
const Guest = require("../models/guestModel");
const nodemailer = require("nodemailer");
const { deleteOne } = require("../models/bookingModel");

//////////////////////
// GET ALL BOOKINGS //
//////////////////////
const getBookings = async (req, res) => {
  const bookings = await Bookings.find();
  res.status(200).json(bookings);
};

//////////////////
// SAVE BOOKING //
//////////////////
const saveBooking = async (req, res) => {
  const { date, time, amount, tables, message, guest } = req.body;

  // Save values from guest object in req.body
  const name = guest.name;
  const email = guest.email;
  const phone = guest.phone;

  try {
    // Check if guest already exists in db
    const guestExists = await Guest.findOne({ email });

    // If guest exists, save booking with guest ID
    if (guestExists) {
      const newBooking = new Bookings({
        date: date,
        time: time,
        guest: guestExists._id,
        amount: amount,
        tables: tables,
        message: message,
      });
      await newBooking.save();
      res.status(200).json(newBooking);
    } else {
      /* If guest doesn't exist, create one in db,
    then save booking */
      const newGuest = new Guest({
        name: name,
        email: email,
        phone: phone,
      });

      await newGuest.save();

      const newBooking = new Bookings({
        date: date,
        time: time,
        guest: newGuest._id,
        amount: amount,
        tables: tables,
        message: message,
      });
      await newBooking.save();
      res.status(200).json(newBooking);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//////////////////
// EDIT BOOKING //
//////////////////
const editBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Bookings.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        date: req.body.date,
        time: req.body.time,
        amount: req.body.amount,
        tables: req.body.tables,
        message: req.body.message,
      }
    );
    res.status(200).json;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
////////////////////
// DELETE BOOKING //
////////////////////
const deleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Bookings.findById(id).deleteOne();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//////////////////////
// GET AVAILABILITY //
//////////////////////
const searchAvailability = async (req, res) => {
  const { date, time, amount, tables } = req.body;

  const allBookings = await Bookings.find().lean();

  try {
    // Get all existing reservations from requested day
    const requestedDate = allBookings.filter(
      (booking) => booking.date === date
    );
    // If there are no bookings on requested date, confirm booking
    if (requestedDate.length < 1) {
      res.status(200).send(true);
    } else {
      /* If there are bookings on requested date,
    check if there are reservations at the same time */
      for (let i = 0; i < requestedDate.length; i++) {
        // List of bookings on the same date and same time
        const sameDayAndTime = requestedDate.filter(
          (booking) => booking.time === time
        );
        // If there are no bookings on requested time, confirm booking
        if (sameDayAndTime.length < 1) {
          res.status(200).send(true);
        } else {
          // Get list of bookings with same date & time
          for (let j = 0; j < sameDayAndTime.length; j++) {
            // Get total amount of booked tables on same date & time
            const bookedTables = sameDayAndTime.reduce(function (a, b) {
              return a + b.tables;
            }, 0);
            // If 15 tables are already booked, decline booking request
            if (bookedTables + tables > 15) {
              res.status(200).send(false);
            } // If there are tables available, confirm booking
            else {
              res.status(200).send(true);
            }
          }
        }
      }
    }
  } catch (error) {
    res.status(400);
  }
};

// SEND CONFIRMATION MAIL //
const sendConfirmation = async (req, res, next) => {
  let { email } = req.body;
  console.log(email);

  const getBooking = await Bookings.findOne({ email: email });
  console.log(getBooking);
  if (getBooking) {
    const id = getBooking.id;

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
        '<p>If you would like to cancel your reservation, you can do that <a href="http://localhost:3000/booking_cancelation/' +
        id +
        '">here</a></p>',
    });
  }
  next();
};

// CANCEL RESERVATION FROM USER //
const userCancel = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Bookings.findOne({ id: id }).deleteOne();
    // const booking = await Bookings.findOne({ guest: id });
    console.log(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.send("200");

  // try {
  //   await Bookings.findById(id).deleteOne();
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
  // res.sendStatus(200);
};

module.exports = {
  saveBooking,
  getBookings,
  editBooking,
  deleteBooking,
  searchAvailability,
  sendConfirmation,
  userCancel,
};
