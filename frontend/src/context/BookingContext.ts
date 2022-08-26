import { createContext } from 'react'
import { IReservation } from '../models/IReservation'

export interface BookingInterface {
  bookings: IReservation[]
  addBooking(r: IReservation): void
  updateBooking(r: IReservation): void
  deleteBooking(r: IReservation): void
}

export const defaultValue: BookingInterface = {
  bookings: [],
  addBooking: (r: IReservation) => {},
  updateBooking: (r: IReservation) => {},
  deleteBooking: (r: IReservation) => {},
}

export const BookingContext = createContext(defaultValue)
