import "./App.css";
import { useEffect, useState } from "react";
// REACT ROUTER //
import { BrowserRouter, Route, Routes } from "react-router-dom";
// COMPONENTS //
import Home from "./components/pages/Home";
import Reservations from "./components/pages/Reservations";
import Contact from "./components/pages/Contact";
import Menu from "./components/pages/Menu";
import NotFound from "./components/pages/NotFound";
import Admin from "./components/pages/Admin";
import GDPR from "./components/pages/GDPR";
import LayoutWithNav from "./components/LayoutWithNav";
import LayoutWithoutNav from "./components/LayoutWithoutNav";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserCancelReservation from "./components/pages/UserCancelReservation";
// CONTEXT //
import {
  BookingContext,
  BookingInterface,
  defaultValue,
} from "./context/BookingContext";
// AXIOS //
import axios from "axios";
// MODELS //
import { IBooking } from "./models/IBooking";
import { AdminContext, IAdminContext } from "./context/AdminContext";
import AdminManage from "./components/pages/AdminManage";

function App() {
  const [bookings, setBookings] = useState<BookingInterface>(defaultValue);
  const [adminData, setAdminData] = useState<IAdminContext>({
    admin: [],
    updateContext: updateContext,
  });

  function updateContext(updatedContext: IAdminContext): void {
    setAdminData({ ...updatedContext });
  }

  useEffect(() => {
    // Get all bookings and save them in Booking context
    axios.get<IBooking[]>("http://localhost:4000/bookings").then((response) => {
      setBookings({ ...bookings, bookings: response.data });
    });
  }, [bookings.bookings.length]);

  // Add new booking to context
  bookings.addBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings];
    newBookingsList.push(b);
    setBookings({ ...bookings, bookings: newBookingsList });
  };

  // Update Booking context
  bookings.updateBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings];

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === b._id) {
        newBookingsList.splice(i, 1, b);
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList });
  };

  // Delete from Booking context
  bookings.deleteBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings];

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === b._id) {
        newBookingsList.splice(i, 1);
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList });
  };

  return (
    <AdminContext.Provider value={adminData}>
      <BookingContext.Provider value={bookings}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutWithNav />}>
              <Route index element={<Home />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route
                path="/booking_cancelation/:id"
                element={<UserCancelReservation />}
              />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/admin" element={<Login />} />
            </Route>
            <Route path="/" element={<LayoutWithoutNav />}>
              <Route path="/admin/start" element={<Admin />} />
              <Route path="/admin/manage" element={<AdminManage />} />
              <Route path="/admin/register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookingContext.Provider>
    </AdminContext.Provider>
  );
}

export default App;
