import { IGuest } from './IGuest'

export interface IBooking {
  _id?: string
  date: string
  time: string
  amount: number
  tables: number
  message?: string
  guest: IGuest
}
