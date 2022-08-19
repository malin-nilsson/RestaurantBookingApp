import axios from "axios";
import { IBooking } from "../models/IBooking";

export async function saveBooking(): Promise<IBooking> {
  const API = "https://localhost:4000/bookings";
  return (await axios.post(API)).data;
}
