import axios from 'axios'
import { IBookingRequest } from '../models/IBookingRequest'

export async function getAvailability(
  request: IBookingRequest,
): Promise<Boolean> {
  const API = 'http://localhost:4000/bookings/search'

  return await (await axios.post(API, request)).data
}
