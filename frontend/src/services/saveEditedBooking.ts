import axios from 'axios'
import { IBooking } from '../models/IBooking'

export async function saveEditedBooking(
  booking: IBooking,
): Promise<IBooking[]> {
  const API = 'http://localhost:4000/bookings/' + booking._id

  return await axios.post(API, booking)
}
