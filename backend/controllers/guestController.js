const Guests = require("../models/guestModel");
const Bookings = require("../models/bookingModel");

const getGuests = async (req, res) => {
  try {
    const guests = await Guests.find().lean();
    res.status(200).json(guests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBookingsByGuest = async (req, res) => {
  const guest = req.body;

  const requestedGuest = {
    id: guest._id,
    name: guest.name,
    email: guest.email,
    phone: guest.phone,
  };

  try {
    const guest = await Guests.findOne({ email: requestedGuest.email });

    if (guest) {
      const bookingsByGuest = await Bookings.find({
        guest: guest._id,
      }).populate("guest");
      res.status(200).send(bookingsByGuest);
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getGuests,
  getBookingsByGuest,
};
