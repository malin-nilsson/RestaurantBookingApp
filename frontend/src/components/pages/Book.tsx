import { networkInterfaces } from "os";
import { stringify } from "querystring";
import { useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IGuest } from "../../models/IGuest";
import axios from "axios";
import { saveBooking } from "../../../services/saveBooking";

export const Book = () => {
  const [booking, setBooking] = useState<IBooking>({
    id: "",
    date: "",
    time: "",
    guest: { name: "", email: "", phone: 0 },
    amount: 0,
  });

  const [bookings, setBookings] = useState<IBooking[]>([]);

  // const confirmBooking = () => {
  //   axios.get<IBooking[]>("localhost:4000/bookings").then((response) => {
  //     setBookings(response.data);

  //     if (bookings) {
  //       return;
  //     } else {
  //       setBooking({ ...booking });
  //     }
  //   });
  // };

  return (
    <>
      <form onSubmit={() => saveBooking()}>
        <input type="date" min={Date.now()} name="bookingDate" />
        <select name="time" id="time">
          <option value="time1">18</option>
          <option value="time2">21</option>
        </select>
        <input type="text" name="firstname" />
        <input type="text" name="lastname" />
        <input type="number" />
        <input type="submit" value="Bekräfta" />
      </form>
    </>
  );
};
