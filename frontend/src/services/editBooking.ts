import axios from "axios";
import { IBooking } from "../models/IBooking";

export async function editBooking(): Promise<IBooking[]> {
  const API = "https://localhost:4000/bookings";

  return (await axios.put(API)).data;
}
