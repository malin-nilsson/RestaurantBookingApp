import axios from 'axios'
import { IGuest } from '../models/IGuest'

export async function saveGuest(guest: IGuest): Promise<IGuest[]> {
  const API = 'http://localhost:4000/guests'

  return await axios.post(API, guest)
}
