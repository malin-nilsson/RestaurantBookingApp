import { createContext } from 'react'
import { IBooking } from '../models/IBooking'
import { IGuest } from '../models/IGuest'

export interface BookingInterface {
  bookings: IBooking[]
  guests: IGuest[]
  addBooking(b: IBooking): void
  updateBooking(b: IBooking): void
  deleteBooking(b: IBooking): void
  deleteGuest(g: IGuest): void
}

export const defaultValue: BookingInterface = {
  bookings: [],
  guests: [],
  addBooking: (b: IBooking) => {},
  updateBooking: (b: IBooking) => {},
  deleteBooking: (b: IBooking) => {},
  deleteGuest: (g: IGuest) => {},
}

export const BookingContext = createContext(defaultValue)
