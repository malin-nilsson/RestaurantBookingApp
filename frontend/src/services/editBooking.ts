import axios from 'axios'
import { IBooking } from '../models/IBooking'

export async function editBooking(id: string): Promise<IBooking[]> {
  const API = 'https://localhost:4000/bookings/' + id

  return await axios.put(API)
}
