import axios from 'axios'
import { IReservation } from '../models/IReservation'

export async function deleteBooking(
  booking: IReservation,
): Promise<IReservation[]> {
  const API = 'http://localhost:4000/bookings/' + booking._id
  return await axios.delete(API)
}
