import axios from "axios";
import { IBooking } from "../models/IBooking";

export async function delBooking(): Promise<IBooking[]> {
  const API = "https://localhost:4000/bookings";

  return (await axios.delete(API)).data;
}
