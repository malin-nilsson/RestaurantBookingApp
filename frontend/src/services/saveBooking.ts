import axios from 'axios'
import { IReservation } from '../models/IReservation'

export async function saveBooking(
  reservation: IReservation,
): Promise<IReservation[]> {
  const API = 'http://localhost:4000/bookings'

  return await axios.post(API, reservation)
}
