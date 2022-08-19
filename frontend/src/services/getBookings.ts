import axios from "axios";

import { useContext, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";

export const BookingsList = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  const API = "https://localhost:4000/bookings";
};
