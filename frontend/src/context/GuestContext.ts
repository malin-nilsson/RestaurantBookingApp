import { createContext } from 'react'
import { IGuest } from '../models/IGuest'

export interface GuestInterface {
  guests: IGuest[]
  deleteGuest(g: IGuest): void
}

export const defaultValue: GuestInterface = {
  guests: [],
  deleteGuest: (g: IGuest) => {},
}

export const GuestContext = createContext(defaultValue)
