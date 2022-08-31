import axios from "axios";
import { IBooking } from "../models/IBooking";
import { IReservation } from "../models/IReservation";

export async function saveBooking(booking: IBooking): Promise<IBooking[]> {
  const API = "http://localhost:4000/bookings";

  return await axios.post(API, booking);
}
