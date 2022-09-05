import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Reservations from './components/pages/Reservations'
import Contact from './components/pages/Contact'
import Menu from './components/pages/Menu'
import NotFound from './components/pages/NotFound'
import { useEffect, useState } from 'react'
// Context
import {
  BookingContext,
  BookingInterface,
  defaultValue,
} from './context/BookingContext'
import axios from 'axios'
import { IReservation } from './models/IReservation'
import Admin from './components/pages/Admin'
import GDPR from './components/pages/GDPR'
import LayoutWithNav from './components/LayoutWithNav'
import LayoutWithoutNav from './components/LayoutWithoutNav'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import { IBooking } from './models/IBooking'
import UserCancelReservation from './components/pages/UserCancelReservation'

function App() {
  const [bookings, setBookings] = useState<BookingInterface>(defaultValue)

  useEffect(() => {
    if (bookings.bookings.length !== 0) return
    // Get all bookings and save them in Booking context
    axios.get<IBooking[]>('http://localhost:4000/bookings').then((response) => {
      setBookings({ ...bookings, bookings: response.data })
    })
  }, [bookings.bookings.length])

  // Add new booking to context
  bookings.addBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings]
    newBookingsList.push(b)
    setBookings({ ...bookings, bookings: newBookingsList })
  }

  // Update Booking context
  bookings.updateBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings]

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === b._id) {
        newBookingsList.splice(i, 1, b)
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList })
  }

  // Delete from Booking context
  bookings.deleteBooking = (b: IBooking) => {
    const newBookingsList = [...bookings.bookings]

    for (let i = 0; i < newBookingsList.length; i++) {
      if (newBookingsList[i]._id === b._id) {
        newBookingsList.splice(i, 1)
      }
    }
    setBookings({ ...bookings, bookings: newBookingsList })
  }

  return (
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
            <Route path="/admin/register" element={<Register />} />
          </Route>
          <Route path="/" element={<LayoutWithoutNav />}>
            <Route path="/admin/start" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContext.Provider>
  )
}

export default App
