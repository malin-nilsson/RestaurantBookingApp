import { createContext } from "react";
import { IBooking } from "../models/IBooking";

export interface IBookingContext {
  bookings: IBooking[];
  updateContext(updatedContext: IBookingContext): void;
}

export const BookingContext = createContext<IBookingContext>({
  bookings: [],
  updateContext: () => {},
});
