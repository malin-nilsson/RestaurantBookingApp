import { createContext } from 'react'
import { IBooking } from '../models/IBooking'
import { IGuest } from '../models/IGuest'

export interface BookingInterface {
  bookings: IBooking[]
  addBooking(b: IBooking): void
  updateBooking(b: IBooking): void
  deleteBooking(b: IBooking): void
}

export const defaultValue: BookingInterface = {
  bookings: [],
  addBooking: (b: IBooking) => {},
  updateBooking: (b: IBooking) => {},
  deleteBooking: (b: IBooking) => {},
}

export const BookingContext = createContext(defaultValue)
