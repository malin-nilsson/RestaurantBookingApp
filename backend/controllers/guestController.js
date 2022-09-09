const Guests = require('../models/guestModel')

////////////////////
//GET ALL GUESTS //
///////////////////
const getGuests = async (req, res) => {
  try {
    const guests = await Guests.find().lean()
    res.status(200).json(guests)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

/////////////////
//DELETE GUEST //
/////////////////
const deleteGuest = async (req, res) => {
  const id = req.params.id

  try {
    await Guests.findById(id).deleteOne()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getGuests,
  deleteGuest,
}
