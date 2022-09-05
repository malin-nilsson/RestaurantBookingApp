import { createContext } from 'react'
import { IGuest } from '../models/IGuest'

export interface GuestInterface {
  guests: IGuest[]
  addGuest(g: IGuest): void
  deleteGuest(g: IGuest): void
}

export const defaultValue: GuestInterface = {
  guests: [],
  addGuest: (g: IGuest) => {},
  deleteGuest: (g: IGuest) => {},
}

export const GuestContext = createContext(defaultValue)
