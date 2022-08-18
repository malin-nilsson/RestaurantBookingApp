import axios from "axios";
import { IBooking } from "../src/models/IBooking";
import { useContext, useEffect, useState } from "react";

export const BookingsList = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const API = "https://localhost:4000/bookings";

  useEffect(()=>{
    let booking: IBooking[] = 
  })
};
