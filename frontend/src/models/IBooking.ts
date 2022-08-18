import { IGuest } from "./IGuest";

export interface IBooking {
  id: string;
  date: string;
  time: string;
  guest: IGuest;
  amount: number;
}
