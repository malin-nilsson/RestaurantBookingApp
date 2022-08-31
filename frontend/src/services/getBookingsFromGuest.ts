import axios from 'axios'
import { IBooking } from '../models/IBooking'
import { IGuest } from '../models/IGuest'

export async function getBookingsFromGuest(
  guest: IGuest,
): Promise<IBooking[] | []> {
  const API = 'http://localhost:4000/guests/search'

  return await (await axios.post(API, guest)).data
}
