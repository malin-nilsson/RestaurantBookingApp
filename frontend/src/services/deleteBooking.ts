import axios from 'axios'
import { IBooking } from '../models/IBooking'

export async function delBooking(id: string): Promise<IBooking[]> {
  const API = 'https://localhost:4000/bookings/' + id

  return await axios.delete(API)
}
