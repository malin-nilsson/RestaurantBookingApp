import axios from 'axios'
import { IBooking } from '../models/IBooking'

export async function saveBooking(booking: IBooking): Promise<IBooking[]> {
  const API = 'http://localhost:4000/bookings'
  return await (await axios.post(API, booking)).data
}
