import axios from 'axios'
import { IBooking } from '../models/IBooking'

export async function getAvailability(request: IBooking) {
  // Get bookings from DB
  const API = 'http://localhost:4000/bookings'
  const result = await (await axios.get(API)).data

  // Get all existing reservations from requested day
  const requestedDate = result.filter(
    (booking: IBooking) => booking.date === request.date,
  )
  // If there are no bookings on requested date, confirm booking
  if (requestedDate.length < 1) {
    return true
  } else {
    /* If there are bookings on requested date,
    check if there are reservations at the same time */
    for (let i = 0; i < requestedDate.length; i++) {
      // List of bookings on the same date and same time
      const sameDayAndTime = requestedDate.filter(
        (booking: IBooking) => booking.time === request.time,
      )
      // Loop through the list of bookings with same date & time
      for (let j = 0; j < sameDayAndTime.length; j++) {
        // Get total amount of booked tables
        const numOfTablesBooked = sameDayAndTime.length
        // Get total amount of guests
        const numOfGuests = sameDayAndTime.length * sameDayAndTime[j].amount
        // If 15 tables are already booked, delcine booking request
        if (numOfTablesBooked > 15) {
          return false
        } // If there are tables available, confirm booking
        else {
          return true
        }
      }
    }
  }
}
