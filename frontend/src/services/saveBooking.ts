import axios from 'axios'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export async function saveBooking(
  reservation: IReservation,
): Promise<IReservation[]> {
  console.log(reservation)
  const API = 'http://localhost:4000/bookings'

  return await axios.post(API, reservation)
}
