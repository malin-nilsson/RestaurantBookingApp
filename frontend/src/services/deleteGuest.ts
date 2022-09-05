import axios from 'axios'
import { IGuest } from '../models/IGuest'

export async function deleteGuest(guest: IGuest): Promise<IGuest> {
  const API = 'http://localhost:4000/guests/delete/' + guest._id
  return await axios.delete(API)
}
