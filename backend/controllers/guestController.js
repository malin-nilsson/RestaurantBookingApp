const Guest = require('../models/guestModel')
const mongoose = require('mongoose')

const saveGuest = async (req, res) => {
  const { name, email, phone } = req.body

  // Add doc to db
  try {
    const guest = await Guest.create({ name, email, phone })
    res.status(200).json(guest)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { saveGuest }
