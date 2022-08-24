import { createContext } from 'react'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export interface BookingInterface {
  bookings: IReservation[]
  updateBooking(r: IReservation): void
  deleteBooking(r: IReservation): void
}

export const defaultValue: BookingInterface = {
  bookings: [],
  updateBooking: (r: IReservation) => {},
  deleteBooking: (r: IReservation) => {},
}

export const BookingContext = createContext(defaultValue)
