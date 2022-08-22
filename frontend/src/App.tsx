import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/pages/Home'
import Reservations from './components/pages/Reservations'
import Contact from './components/pages/Contact'
import Menu from './components/pages/Menu'
import NotFound from './components/pages/NotFound'
import Admin from './components/pages/Admin'
import { useEffect, useState } from 'react'
// Context
import {
  BookingContext,
  BookingInterface,
  defaultValue,
} from './context/BookingContext'
import axios from 'axios'
import { IReservation } from './models/IReservation'

function App() {
  const [bookings, setBookings] = useState<BookingInterface>(defaultValue)

  useEffect(() => {
    if (bookings.bookings.length !== 0) return

    axios
      .get<IReservation[]>('http://localhost:4000/bookings')
      .then((response) => {
        setBookings({ ...bookings, bookings: response.data })
      })
  }, [bookings])

  return (
    <BookingContext.Provider value={bookings}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BookingContext.Provider>
  )
}

export default App
