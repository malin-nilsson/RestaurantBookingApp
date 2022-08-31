import axios from 'axios'
import { IReservation } from '../models/IReservation'
import { IBooking } from '../models/IBooking'

export async function getBookings(): Promise<IBooking[]> {
  const API = 'http://localhost:4000/bookings'
  return await axios.get(API)
}
