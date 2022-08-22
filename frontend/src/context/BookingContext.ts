import { createContext } from 'react'
import { IBooking } from '../models/IBooking'
import { IReservation } from '../models/IReservation'

export interface BookingInterface {
  bookings: IReservation[]
}

export const defaultValue: BookingInterface = {
  bookings: [],
}

export const BookingContext = createContext(defaultValue)
