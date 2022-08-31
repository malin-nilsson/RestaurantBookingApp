import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Reservations from "./components/pages/Reservations";
import Contact from "./components/pages/Contact";
import Menu from "./components/pages/Menu";
import NotFound from "./components/pages/NotFound";
import { useEffect, useState } from "react";
// Context
import {
  BookingContext,
  BookingInterface,
  defaultValue,
} from "./context/BookingContext";
import axios from "axios";
import { IReservation } from "./models/IReservation";
import { CreateAdminReservation } from "./components/pages/AdminReservation";
import Admin from "./components/pages/Admin";
import UserCancelReservation from "./components/pages/UserCancelReservation";

function App() {
  const [bookings, setBookings] = useState<BookingInterface>(defaultValue);

  useEffect(() => {
    if (bookings.bookings.length !== 0) return;
    // Get all bookings and save them in Booking context
    axios
      .get<IReservation[]>("http://localhost:4000/bookings")
      .then((response) => {
        setBookings({ ...bookings, bookings: response.data });
      });
  }, [bookings]);

  // Update Booking context
  bookings.updateBooking = (r: IReservation) => {
    const newBookingsList = [...bookings.bookings];

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === r._id) {
        newBookingsList.splice(i, 1, r);
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList });
  };

  // Delete from Booking context
  bookings.deleteBooking = (r: IReservation) => {
    const newBookingsList = [...bookings.bookings];

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === r._id) {
        newBookingsList.splice(i, 1);
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList });
  };

  return (
    <BookingContext.Provider value={bookings}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/create" element={<CreateAdminReservation />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route
              path="/booking_cancelation/:id"
              element={<UserCancelReservation />}
            />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContext.Provider>
  );
}

export default App;
