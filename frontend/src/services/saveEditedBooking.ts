import axios from 'axios'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export async function saveEditedBooking(
  booking: IBooking,
): Promise<IReservation[]> {
  const API = 'http://localhost:4000/bookings/' + booking._id

  return await axios.post(API, booking)
}
