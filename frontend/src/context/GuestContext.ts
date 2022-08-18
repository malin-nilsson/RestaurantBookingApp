import { createContext } from 'react'
import { IGuest } from '../models/IGuest'

export interface IGuestContext {
  guests: IGuest[]
}

export const GuestContext = createContext<IGuestContext>({
  guests: [],
})
