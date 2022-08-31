import axios from 'axios'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export async function deleteBooking(booking: IBooking): Promise<IBooking[]> {
  const API = 'http://localhost:4000/bookings/' + booking._id
  return await axios.delete(API)
}
