import { createContext } from 'react'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export interface BookingInterface {
  bookings: IReservation[]
  updateBooking(b: IReservation): void
}

export const defaultValue: BookingInterface = {
  bookings: [],
  updateBooking: (b: IReservation) => {},
}

export const BookingContext = createContext(defaultValue)
